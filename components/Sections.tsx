"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { about, marquee, profile, projects, services, skills, social } from "@/lib/data";

const wrap = "mx-auto w-full max-w-6xl px-6";
const h2 = "font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl";
const ease = [0.22, 1, 0.36, 1] as const;

// Brand glyphs as inline SVG so the page pulls in no icon dependency.
const glyphs: Record<string, React.ReactNode> = {
  X: (
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  ),
  Instagram: (
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  ),
  GitHub: (
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  ),
};

function SocialRow({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "size-9" : "size-11";
  const icon = size === "sm" ? "size-4" : "size-[18px]";

  return (
    <ul className="flex flex-wrap items-center gap-3">
      {social.map((s) => (
        <li key={s.label}>
          <motion.a
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${s.label} (${s.handle})`}
            title={`${s.label} — ${s.handle}`}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className={`${box} flex items-center justify-center rounded-full border border-line bg-card text-mute shadow-card transition-colors hover:border-clay hover:text-clay`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
              className={icon}
            >
              {glyphs[s.label]}
            </svg>
          </motion.a>
        </li>
      ))}
    </ul>
  );
}

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

/** Fades and lifts its children into view once, when scrolled near the viewport. */
function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Pulls its inner element toward the cursor, then springs back. */
function Magnetic({ children, strength = 0.28 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Card that leans toward the cursor, the way the Figma reference tilts its surfaces. */
function Tilt({
  children,
  className = "",
  max = 8,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), {
    stiffness: 180,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), {
    stiffness: 180,
    damping: 20,
  });

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Tracks which section is on screen so the nav can highlight it. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-clay"
    />
  );
}

export function Nav() {
  const active = useActiveSection(links.map((l) => l.href.slice(1)));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur-md">
      <nav className={`${wrap} flex h-16 items-center justify-between`} aria-label="Main">
        <a href="#top" className="font-display text-lg font-semibold text-ink">
          {profile.name.split(" ")[0]}
        </a>
        <ul className="flex gap-5 text-sm text-mute sm:gap-8">
          {links.map((l) => (
            <li key={l.href} className="relative">
              <a
                href={l.href}
                aria-current={active === l.href.slice(1) ? "true" : undefined}
                className={
                  active === l.href.slice(1)
                    ? "text-ink transition-colors"
                    : "transition-colors hover:text-clay"
                }
              >
                {l.label}
                {active === l.href.slice(1) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-clay"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

// The one orchestrated moment: the hero text arrives in sequence, then the underline draws.
const stack = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function Hero() {
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 600], [0, -70]);
  const textY = useTransform(scrollY, [0, 600], [0, 40]);
  const fade = useTransform(scrollY, [0, 420], [1, 0]);

  return (
    <MotionConfig reducedMotion="user">
      <section id="top" className={`${wrap} relative pb-24 pt-16 sm:pb-32 sm:pt-24`}>
        <motion.div
          aria-hidden
          style={{ opacity: fade }}
          className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-clay/15 blur-3xl"
          animate={{ scale: [1, 1.15, 1], x: [0, 24, 0], y: [0, -18, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="grid items-center gap-14 md:grid-cols-[1.15fr_1fr]">
          <motion.div variants={stack} initial="hidden" animate="show" style={{ y: textY }}>
            <motion.p variants={rise} className="text-mute">
              {profile.role}. Available for remote work.
            </motion.p>
            <motion.h1
              variants={rise}
              className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-6xl"
            >
              {profile.headline}
            </motion.h1>
            <motion.div
              variants={{
                hidden: { scaleX: 0 },
                show: { scaleX: 1, transition: { duration: 0.9, ease } },
              }}
              style={{ originX: 0 }}
              className="mt-8 h-1 w-24 rounded-full bg-clay"
            />
            <motion.p
              variants={rise}
              className="mt-8 max-w-xl text-lg leading-relaxed text-mute"
            >
              {profile.intro}
            </motion.p>
            <motion.div variants={rise} className="mt-10 flex flex-wrap gap-4">
              <Magnetic>
                <a
                  href="#projects"
                  className="inline-block rounded-full bg-ink px-6 py-3 font-medium text-paper transition-colors hover:bg-clay"
                >
                  See my projects
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-block rounded-full border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-clay hover:text-clay"
                >
                  Get in touch
                </a>
              </Magnetic>
            </motion.div>
            <motion.div variants={rise} className="mt-12">
              <SocialRow />
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: photoY }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.25 }}
          >
            <Tilt max={10} className="relative mx-auto max-w-sm">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="overflow-hidden rounded-lift border border-line bg-card shadow-lift">
                  <Image
                    src={profile.photo}
                    alt={`${profile.name}, ${profile.role}`}
                    width={1024}
                    height={1024}
                    priority
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
              <motion.div
                aria-hidden
                className="absolute -bottom-5 -left-5 -z-10 h-32 w-32 rounded-full bg-clay/25 blur-2xl"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </Tilt>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}

export function Marquee() {
  const strip = [...marquee, ...marquee];

  return (
    <section
      aria-hidden
      className="overflow-hidden border-y border-line bg-surface py-5"
    >
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {strip.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="font-display text-sm uppercase tracking-[0.2em] text-mute"
          >
            {t}
          </span>
        ))}
      </motion.div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="border-t border-line py-24">
      <div className={`${wrap} grid gap-10 md:grid-cols-[1fr_2fr]`}>
        <Reveal>
          <h2 className={h2}>About me</h2>
        </Reveal>
        <div className="max-w-2xl">
          {about.map((p, i) => (
            <Reveal key={p} delay={i * 0.1}>
              <p className="mb-5 text-lg leading-relaxed text-mute">{p}</p>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <ul className="mt-10 flex flex-wrap gap-2">
              {services.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-mute"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="border-t border-line bg-surface py-24">
      <div className={wrap}>
        <Reveal>
          <h2 className={h2}>Skills</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {skills.map((s, i) => (
            <Reveal key={s.group} delay={i * 0.12}>
              <Tilt max={6} className="h-full">
                <div className="h-full rounded-card border border-line bg-card p-6 shadow-card">
                  <h3 className="font-display text-xl font-semibold text-clay">
                    {s.group}
                  </h3>
                  <ul className="mt-4 space-y-2 text-mute">
                    {s.items.map((item) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.4, ease }}
                        className="transition-colors hover:text-ink"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="border-t border-line py-24">
      <div className={wrap}>
        <Reveal>
          <h2 className={h2}>Projects</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, idx) => (
            <Reveal key={p.title} delay={idx * 0.1} className="h-full">
              <Tilt max={7} className="h-full">
                <article className="flex h-full flex-col rounded-card border border-line bg-card p-6 shadow-card transition-shadow hover:shadow-lift">
                  <motion.div
                    aria-hidden
                    className="mb-5 h-1 w-10 rounded-full bg-clay"
                    initial={{ width: 0 }}
                    whileInView={{ width: 40 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease, delay: 0.15 }}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {p.title}
                    </h3>
                    {p.status === "in-progress" && (
                      <span className="shrink-0 rounded-full border border-line bg-surface px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-mute">
                        In progress
                      </span>
                    )}
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-mute">
                    {p.description}
                  </p>
                  <div className="mt-5 flex gap-5 text-sm">
                    {p.live && (
                      <a
                        className="text-clay hover:text-claydeep hover:underline"
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit site
                      </a>
                    )}
                    {p.code && (
                      <a
                        className="text-clay hover:text-claydeep hover:underline"
                        href={p.code}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View code
                      </a>
                    )}
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <motion.li
                        key={t}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-mute"
                      >
                        {t}
                      </motion.li>
                    ))}
                  </ul>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line bg-surface py-24">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-clay/10 blur-3xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className={`${wrap} relative`}>
        <Reveal>
          <h2 className={h2}>Let&apos;s work together</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-lg text-lg text-mute">
            Have a project or a role in mind? Send me a message and I&apos;ll reply
            within two days.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="inline-block rounded-full bg-clay px-6 py-3 font-medium text-paper transition-colors hover:bg-claydeep"
              >
                Email me
              </a>
            </Magnetic>
            <Magnetic>
              <button
                onClick={copy}
                className="rounded-full border border-line bg-card px-6 py-3 font-medium text-ink transition-colors hover:border-clay"
                aria-live="polite"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "done" : "idle"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="block"
                  >
                    {copied ? "Copied" : "Copy email address"}
                  </motion.span>
                </AnimatePresence>
              </button>
            </Magnetic>
          </div>
          <div className="mt-10">
            <SocialRow size="sm" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-espresso py-10 text-sm text-paper/70">
      <div
        className={`${wrap} flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between`}
      >
        <p>
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <p>{profile.role}</p>
        <SocialRow size="sm" />
      </div>
    </footer>
  );
}