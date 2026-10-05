"use client";

import { useEffect } from "react";
import { profile, social } from "@/lib/data";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5">
      <div className="w-full max-w-md rounded-lift border border-line bg-card p-8 text-center shadow-card">
        <p className="text-xs uppercase tracking-wider text-clay">
          Something broke
        </p>
        <h1 className="mt-3 font-display text-2xl font-semibold text-ink">
          This page failed to load
        </h1>
        <p className="mt-3 text-sm text-mute">
          An unexpected error occurred. Try again, or reach out and I&apos;ll
          fix it.
        </p>
        {error.digest && (
          <p className="mt-3 font-mono text-xs text-mute">
            Reference: {error.digest}
          </p>
        )}
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-card bg-clay px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-claydeep"
          >
            Try again
          </button>
          <a
            href={`mailto:${profile.email}`}
            className="text-sm text-clay hover:text-claydeep hover:underline"
          >
            {profile.email}
          </a>
          <a
            href={social.find((s) => s.label === "X")?.href}
            className="text-sm text-clay hover:text-claydeep hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Reach me on X
          </a>
        </div>
      </div>
    </main>
  );
}
