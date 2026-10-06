import { profile, social } from "@/lib/data";

export default function Footer() {
  const github = social.find((account) => account.label === "GitHub");

  return (
    <footer className="mx-auto w-full max-w-4xl px-6 pb-12 sm:px-8">
      <div className="flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-mute">
          &copy; {new Date().getFullYear()} {profile.name}
        </p>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-6">
          {github && (
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-mute underline decoration-line underline-offset-4 transition-colors hover:text-ink"
            >
              GitHub
            </a>
          )}
          {social
            .filter((account) => account.label !== "GitHub")
            .map((account) => (
              <a
                key={account.label}
                href={account.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-mute underline decoration-line underline-offset-4 transition-colors hover:text-ink"
              >
                {account.label}
              </a>
            ))}
        </nav>
      </div>
    </footer>
  );
}
