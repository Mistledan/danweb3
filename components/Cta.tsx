import { bookingLink, profile } from "@/lib/data";

export default function Cta() {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-4xl scroll-mt-8 px-6 py-24 sm:px-8 sm:py-32"
    >
      <div className="border-t border-line pt-16">
        <p className="text-sm font-medium uppercase tracking-widest text-mute">
          Next step
        </p>
        <h2 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          Book a call.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-mute">
          Thirty minutes, no pitch. Send over what you are building and I will
          tell you what it takes, what it costs and whether I am the right person
          for it.
        </p>
        <a
          href={bookingLink}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-base font-medium text-paper transition-colors hover:bg-claydeep"
        >
          Book a call
          <span aria-hidden="true">&rarr;</span>
        </a>
        <p className="mt-6 text-sm text-mute">
          Prefer email?{" "}
          <a
            href={`mailto:${profile.email}`}
            className="text-ink underline decoration-line underline-offset-4 transition-colors hover:text-claydeep"
          >
            {profile.email}
          </a>
        </p>
      </div>
    </section>
  );
}
