import { process } from "@/lib/data";

export default function Process() {
  return (
    <section
      id="process"
      className="mx-auto w-full max-w-4xl scroll-mt-8 px-6 py-24 sm:px-8 sm:py-32"
    >
      <h2 className="text-sm font-medium uppercase tracking-widest text-mute">
        Process
      </h2>

      <ol className="mt-10 border-t border-line">
        {process.map((step) => (
          <li
            key={step.key}
            className="grid gap-3 border-b border-line py-10 sm:grid-cols-[7rem_1fr] sm:gap-8"
          >
            <span className="font-mono text-sm text-clay">{step.key}</span>
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                {step.title}
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-mute">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
