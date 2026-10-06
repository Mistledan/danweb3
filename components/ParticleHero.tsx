"use client";

/**
 * Renders the visitor's name as a 3D particle field.
 *
 * How it works:
 *   1. The name is drawn to an offscreen 2D canvas and the ink pixels sampled.
 *   2. Those pixels become target positions for a Three.js Points cloud.
 *   3. A custom shader lerps each particle from a scattered start position to
 *      its target on the GPU, so the CPU does no per-particle work per frame.
 *
 * Scroll parallax is read inside the render loop (scrollY / hero height) rather
 * than via a scroll listener or an animation library, so the scrub costs a
 * multiplication per frame and nothing else.
 *
 * Mobile: the particle budget and device pixel ratio are both capped, rendering
 * pauses when the hero scrolls out of view or the tab is hidden, and
 * prefers-reduced-motion renders the finished name once with no animation loop.
 */

import { useEffect, useRef, useState } from "react";

const DESKTOP_BREAKPOINT = 768;

// Ink coverage is what actually decides the particle count, so these are tuned
// against the sample count rather than a fixed number.
const PARTICLE_BUDGET = { desktop: 7000, mobile: 1400 } as const;
const DPR_CAP = { desktop: 2, mobile: 1.5 } as const;

const vertexShader = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  uniform float uScroll;
  uniform float uPixelRatio;

  attribute vec3 aStart;
  attribute vec3 aTarget;
  attribute float aSeed;

  varying float vAlpha;

  void main() {
    // Per-particle stagger so the name assembles left to right rather than
    // snapping into place all at once.
    float local = clamp((uProgress - aSeed * 0.3) / 0.7, 0.0, 1.0);
    float eased = 1.0 - pow(1.0 - local, 3.0);

    vec3 pos = mix(aStart, aTarget, eased);

    // Drift only while unsettled, so the finished name stays crisp.
    float unrest = 1.0 - eased;
    pos.x += sin(uTime * 0.7 + aSeed * 6.2831) * 0.07 * unrest;
    pos.y += cos(uTime * 0.6 + aSeed * 6.2831) * 0.07 * unrest;
    pos.z += sin(uTime * 0.4 + aSeed * 3.1415) * 0.10 * unrest;

    // Scroll-driven depth: particles further back travel further.
    pos.z += uScroll * (0.8 + aSeed * 2.2);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uPixelRatio * (2.0 / -mv.z) * (14.0 + aSeed * 10.0);
    vAlpha = 0.25 + eased * 0.75;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    vec2 d = gl_PointCoord - vec2(0.5);
    float dist = length(d);
    if (dist > 0.5) discard;
    float mask = smoothstep(0.5, 0.05, dist);
    gl_FragColor = vec4(uColor, mask * vAlpha);
  }
`;

type Sample = {
  points: Float32Array;
  width: number;
  height: number;
};

/** Draws the name offscreen and returns normalised ink coordinates. */
function sampleText(
  text: string,
  fontFamily: string,
  maxParticles: number,
): Sample | null {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  const fontSize = 160;
  const font = `700 ${fontSize}px ${fontFamily}`;
  ctx.font = font;

  const metrics = ctx.measureText(text);
  // Generous vertical padding so descenders and accents are never clipped.
  const w = Math.ceil(metrics.width) + 80;
  const h = Math.ceil(fontSize * 1.6);
  canvas.width = w;
  canvas.height = h;

  // Reassigning width/height resets the context, so the font must be set again.
  ctx.font = font;
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, w / 2, h / 2);

  let pixels: Uint8ClampedArray;
  try {
    pixels = ctx.getImageData(0, 0, w, h).data;
  } catch {
    return null;
  }

  const hits: number[] = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (pixels[(y * w + x) * 4 + 3] > 140) {
        hits.push(x, y);
      }
    }
  }

  const inkCount = hits.length / 2;
  if (inkCount === 0) return null;

  // Thin the samples evenly so the shape survives at any budget.
  const stride = Math.max(1, Math.floor(inkCount / maxParticles));
  const count = Math.floor(inkCount / stride);
  const points = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    points[i * 2] = hits[(i * stride) * 2];
    points[i * 2 + 1] = hits[(i * stride) * 2 + 1];
  }

  return { points, width: w, height: h };
}

export default function ParticleHero({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const revealedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    // Bound to non-null locals: narrowing on `container` does not survive into
    // the nested async init() below.
    const host = container;
    const surface = canvas;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let renderer: import("three").WebGLRenderer | null = null;
    let disposed = false;
    let raf = 0;
    let cleanupFns: Array<() => void> = [];

    async function init() {
      const THREE = await import("three");

      if (disposed) return;

      const isMobile = window.innerWidth < DESKTOP_BREAKPOINT;
      const budget = isMobile
        ? PARTICLE_BUDGET.mobile
        : PARTICLE_BUDGET.desktop;
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        isMobile ? DPR_CAP.mobile : DPR_CAP.desktop,
      );

      // WebGL support check before we build anything expensive.
      const probe = document.createElement("canvas");
      const hasWebGL =
        probe.getContext("webgl2") !== null ||
        probe.getContext("webgl") !== null;
      if (!hasWebGL) {
        return;
      }

      // Wait for the webfont, otherwise the sample is taken with a fallback
      // face and the name comes out in the wrong shape.
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      if (disposed) return;

      const fontFamily = getComputedStyle(document.body).fontFamily;
      const sample = sampleText(name, fontFamily, budget);
      if (!sample) {
        return;
      }

      const count = sample.points.length / 2;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        55,
        1,
        0.1,
        100,
      );
      camera.position.z = 9;

      renderer = new THREE.WebGLRenderer({
        canvas: surface,
        antialias: !isMobile,
        alpha: true,
        powerPreference: isMobile ? "default" : "high-performance",
      });
      renderer.setPixelRatio(dpr);

      const group = new THREE.Group();
      scene.add(group);

      // Normalise the sampled shape into world space, centred on the origin.
      const halfW = sample.width / 2;
      const halfH = sample.height / 2;
      const worldW = 7.6;

      const aTarget = new Float32Array(count * 3);
      const aStart = new Float32Array(count * 3);
      const aSeed = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const px = sample.points[i * 2] - halfW;
        const py = -(sample.points[i * 2 + 1] - halfH);
        const scale = worldW / sample.width;

        aTarget[i * 3] = px * scale;
        aTarget[i * 3 + 1] = py * scale;
        aTarget[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

        // Scattered start, biased away from the centre so the name resolves.
        const angle = Math.random() * Math.PI * 2;
        const radius = 6 + Math.random() * 9;
        aStart[i * 3] = Math.cos(angle) * radius;
        aStart[i * 3 + 1] = Math.sin(angle) * radius * 0.55;
        aStart[i * 3 + 2] = (Math.random() - 0.5) * 12;

        aSeed[i] = Math.random();
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(aTarget, 3));
      geometry.setAttribute("aTarget", new THREE.BufferAttribute(aTarget, 3));
      geometry.setAttribute("aStart", new THREE.BufferAttribute(aStart, 3));
      geometry.setAttribute("aSeed", new THREE.BufferAttribute(aSeed, 1));

      const uniforms = {
        uProgress: { value: reducedMotion ? 1 : 0 },
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uPixelRatio: { value: dpr },
        uColor: { value: new THREE.Color("#241812") },
      };

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });

      const points = new THREE.Points(geometry, material);
      group.add(points);

            // When there is no animation loop the canvas must be repainted by hand,
      // otherwise a resize wipes it and nothing ever draws again.
      let staticMode = false;
      let heroHeight = 1;

      function resize() {
        if (!renderer) return;
        const rect = host.getBoundingClientRect();
        const width = Math.max(rect.width, 1);
        const height = Math.max(rect.height, 1);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        // Fit the name to the viewport without re-sampling on every resize.
        const fit = Math.min(width / 900, height / 460);
        group.scale.setScalar(Math.max(fit, 0.35));
        heroHeight = height;
        if (staticMode) renderer.render(scene, camera);
      }

      resize();
      window.addEventListener("resize", resize);
      cleanupFns.push(() => window.removeEventListener("resize", resize));

      // Progress of the hero scrolling out of view, matched to the behaviour
      // GSAP ScrollTrigger's "start: top top / end: bottom top" produced:
      // 0 while the hero sits at the top, 1 once it has fully scrolled past.
      // Reading scrollY inside the existing render loop needs no listeners and
      // forces no layout — ScrollTrigger's ticker did the same work at higher
      // cost.
      const scrollProgress = () =>
        Math.min(Math.max(window.scrollY / heroHeight, 0), 1);

      if (reducedMotion) {
        // No loop: paint once, then only repaint on resize or scroll.
        staticMode = true;
        resize();
        revealedRef.current = true;
        setRevealed(true);
        const paintScroll = () => {
          const p = scrollProgress();
          uniforms.uScroll.value = p * -1.4;
          group.rotation.y = p * 0.12;
          renderer!.render(scene, camera);
        };
        window.addEventListener("scroll", paintScroll, { passive: true });
        cleanupFns.push(() =>
          window.removeEventListener("scroll", paintScroll),
        );
        return;
      }

      const clock = new THREE.Clock();
      const FORM_MS = 2600;
      let formStart: number | null = null;

      function frame(ts: number) {
        raf = requestAnimationFrame(frame);
        if (!renderer || !visible || document.hidden) return;

        // Form the name on load. power3.out is 1 - (1 - x)^3.
        if (formStart === null) formStart = ts;
        const t = Math.min((ts - formStart) / FORM_MS, 1);
        uniforms.uProgress.value = 1 - Math.pow(1 - t, 3);

        uniforms.uTime.value = clock.getElapsedTime();

        // Real 3D parallax driven by the hero's own scroll position.
        const p = scrollProgress();
        uniforms.uScroll.value = p * -1.4;
        group.rotation.y = p * 0.42;
        group.rotation.x = p * 0.16;
        group.position.y = p * 0.9;
        camera.position.z = 9 - p * 1.2;

        renderer.render(scene, camera);

        // Hand over from the text fallback once the name is readable.
        if (!revealedRef.current && uniforms.uProgress.value > 0.3) {
          revealedRef.current = true;
          setRevealed(true);
        }
      }
      let visible = true;
      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { threshold: 0 },
      );
      io.observe(host);
      cleanupFns.push(() => io.disconnect());

      raf = requestAnimationFrame(frame);
      cleanupFns.push(() => cancelAnimationFrame(raf));

      const onVisibility = () => {
        if (!document.hidden) clock.getDelta();
      };
      document.addEventListener("visibilitychange", onVisibility);
      cleanupFns.push(() =>
        document.removeEventListener("visibilitychange", onVisibility),
      );
    }

    init().catch(() => {
      // Any failure in the WebGL path leaves the plain-text hero in place.
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cleanupFns.forEach((fn) => fn());
      renderer?.dispose();
    };
  }, [name]);

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`}>
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />

      {/* Real text, painted immediately. It fades out once the particles have
          formed the name, and stays put forever if WebGL is unavailable, so the
          hero is never empty and never depends on WebGL to be readable. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-out ${
          revealed ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="px-4 text-center font-display text-[13.5vw] font-bold leading-[0.95] tracking-tight text-ink sm:text-[10.5vw]">
          {name}
        </p>
      </div>
    </div>
  );
}
