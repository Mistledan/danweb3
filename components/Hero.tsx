import { profile } from "@/lib/data";
import ParticleHero from "./ParticleHero";

export default function Hero() {
  return (
    <header className="relative isolate min-h-[100svh] overflow-hidden">
      {/* The particle field sits behind everything and owns the hero. */}
      <div className="absolute inset-0 -z-10">
        <ParticleHero name={profile.name} className="h-full w-full" />
      </div>

      <div className="mx-auto flex min-h-[100svh] w-full max-w-4xl flex-col justify-between px-6 py-6 sm:px-8 sm:py-8">
        <nav className="flex items-center justify-between gap-4 text-sm">
          <span className="text-mute">{profile.role}</span>
          <a
            href="https://github.com/Mistledan"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded text-mute underline decoration-line underline-offset-4 transition-colors hover:text-ink"
          >
            GitHub
          </a>
        </nav>

        <div className="flex flex-1 flex-col items-center justify-center pt-16">
          {/* The canvas draws the name, so the real heading stays in the DOM for
              crawlers, screen readers and no-WebGL visitors. */}
          <h1 className="sr-only">
            {profile.name} — {profile.role}
          </h1>
        </div>

        <div className="flex flex-col items-start gap-6 sm:items-center sm:text-center">
          <p className="max-w-xl text-balance text-2xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
            {profile.headline}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-claydeep"
          >
            Book a call
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </header>
  );
}
