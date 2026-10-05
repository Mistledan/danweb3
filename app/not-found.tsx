import Link from "next/link";
import { profile } from "@/lib/data";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5">
      <div className="w-full max-w-md rounded-lift border border-line bg-card p-8 text-center shadow-card">
        <p className="font-mono text-5xl font-semibold text-clay">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-ink">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-mute">
          That link doesn&apos;t exist. It may have moved, or never existed at
          all.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-card bg-clay px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-claydeep"
        >
          Back to home
        </Link>
        <p className="mt-6 text-xs text-mute">
          {profile.name} — {profile.role}
        </p>
      </div>
    </main>
  );
}
