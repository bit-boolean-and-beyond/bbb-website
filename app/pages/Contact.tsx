import { forwardRef } from "react";

type ContactSectionProps = {
  isActive: boolean;
};

type ContactChannel = {
  label: string;
  value: string;
  href?: string;
};

const contactChannels: ReadonlyArray<ContactChannel> = [
  {
    label: "Email",
    value: "consultations@bitbooleanandbeyond.com",
    href: "mailto:consultations@bitbooleanandbeyond.com",
  },
  {
    label: "Phone",
    value: "Please request via email",
    href: "#",
  },
  {
    label: "Availability",
    value: "Remote-first, available for on-site engagements as needed",
  },
] as const;

const quickNotes = [
  "Typically respond within one business day.",
  "Happy to sign NDAs prior to deeper discovery calls.",
  "We tailor proposals to your timeline, budget, and team size.",
] as const;

const ContactSection = forwardRef<HTMLDivElement, ContactSectionProps>(
  ({ isActive }, ref) => {
    const transitionTiming = "duration-[3000ms] ease-[cubic-bezier(0.22,1,0.36,1)]";
    const motionState = isActive
      ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
      : "opacity-0 translate-y-8 scale-[0.96] pointer-events-none";

    return (
      <section
        id="contact-section"
        ref={ref}
        aria-hidden={!isActive}
        className={`relative min-h-screen snap-start px-6 py-24 transition-all ${transitionTiming} ${motionState}`}
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 rounded-[32px] border border-white/10 bg-white/5 p-10 text-left shadow-[0_30px_80px_rgba(2,6,23,0.65)] backdrop-blur">
          <header className="space-y-4 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-200/80">Let's Build Together</p>
            <h1 className="text-4xl font-semibold text-white md:text-5xl">Contact</h1>
            <p className="text-base text-white/80 md:text-lg">
              Ready for a conversation? Reach out with a quick brief, rough requirements, or even just an idea. We will reply with next
              steps, scheduling, and a lightweight scope.
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-2">
            <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-white/5">
              <h2 className="text-2xl font-semibold text-white">Reach Us</h2>
              <div className="mt-4 space-y-4">
                {contactChannels.map((channel) => (
                  <div key={channel.label}>
                    <p className="text-sm uppercase tracking-wide text-white/60">{channel.label}</p>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className="text-lg text-cyan-200 transition-colors duration-200 hover:text-white"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <p className="text-lg text-white">{channel.value}</p>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="mt-6 inline-flex items-center justify-center rounded-full border border-cyan-200/60 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-cyan-100 transition-colors duration-200 hover:border-white hover:text-white"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.location.href = "mailto:hello@bitbooleanandbeyond.com";
                  }
                }}
              >
                Email Us
              </button>
            </section>

            <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6">
              <h2 className="text-2xl font-semibold text-white">Quick Notes</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-white/70">
                {quickNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-white/70">
                Need structured documentation or a deeper estimate? Let us know during the initial call and we will include it in the proposal.
              </p>
            </section>
          </div>
        </div>
      </section>
    );
  }
);

export default ContactSection;
