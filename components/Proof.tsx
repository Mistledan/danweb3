import { projects } from "@/lib/data";

export default function Proof() {
  return (
    <section
      id="proof"
      className="mx-auto w-full max-w-4xl scroll-mt-8 px-6 py-24 sm:px-8 sm:py-32"
    >
      <h2 className="text-sm font-medium uppercase tracking-widest text-mute">
        Proof
      </h2>

      <ul className="mt-10 border-t border-line">
        {projects.map((project) => (
          <li key={project.name} className="border-b border-line py-10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {project.name}
                </h3>
                <div className="flex items-center gap-5 text-sm">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-clay underline decoration-line underline-offset-4 transition-colors hover:text-claydeep"
                    >
                      Live site
                      <span className="sr-only"> for {project.name}</span>
                    </a>
                  )}
                  {project.code && (
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-mute underline decoration-line underline-offset-4 transition-colors hover:text-ink"
                    >
                      Source
                      <span className="sr-only"> for {project.name}</span>
                    </a>
                  )}
                </div>
              </div>

              <dl className="grid gap-6 sm:grid-cols-[7rem_1fr] sm:gap-8">
                <dt className="text-sm uppercase tracking-widest text-mute">
                  What it does
                </dt>
                <dd className="text-base leading-relaxed text-ink">
                  {project.whatItDoes}
                </dd>

                <dt className="text-sm uppercase tracking-widest text-mute">
                  Problem
                </dt>
                <dd className="text-base leading-relaxed text-ink">
                  {project.problem}
                </dd>
              </dl>

              <ul className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line px-3 py-1 text-xs text-mute"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
