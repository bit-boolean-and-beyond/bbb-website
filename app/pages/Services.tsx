import { forwardRef } from "react";

type ServicesSectionProps = {
  isActive: boolean;
};

const consultation = {
  title: "Free Initial Consultation & Estimates",
  summary:
    "Start with a no-commitment session where we assess goals, constraints, and timelines before drafting a tailored engagement plan.",
  bullets: [
    "Detailed written recommendations available as an add-on deliverable when you need deeper documentation.",
  ],
} as const;

const packages = {
  title: "Cost Examples / Flat-Fee, Out-of-the-Box Solutions",
  summary:
    "Predictable project footprints designed to get you up and running quickly while leaving room for future customization.",
  tiers: [
    {
      name: "Static Website (up to 5 sections) — starting at $750",
      bullets: [
        "Client can make content changes with our guidance or via lightweight training.",
        "Build with React or a static site generator (Hugo, Jekyll, 11ty) when engineer-led updates are expected.",
        "Build with a CMS (Wagtail or Joomla) when self-service editing is a priority.",
        "Includes domain registration and infrastructure provisioning.",
        "Monitoring and alerting setup sold separately.",
      ],
    },
    {
      name: "Business Web App (frontend + backend) — starting at $2,000",
      bullets: [
        "Infrastructure and domain registration included.",
        "Engineer required to make updates (full handoff documentation provided).",
        "Monitoring and alerting sold separately.",
      ],
    },
    {
      name: "Website Modernization / Migration — starting at $1,000",
      bullets: [
        "Migrate from legacy CMS platforms to modern frameworks.",
        "Styling refresh and UX polish.",
        "Performance improvements across core web vitals.",
        "Security hardening and best-practice reviews.",
        "Deploy to modern infrastructure with automated HTTPS.",
      ],
    },
  ],
} as const;

const capabilitySections = [
  {
    title: "Cloud Infrastructure",
    description:
      "Architect, launch, and operate cloud estates that balance speed, reliability, and spend.",
    bullets: [
      "Design and deploy fast, scalable, secure cloud architectures.",
      "Automate developer workflows with CI/CD pipelines.",
      "Implement monitoring and alerting to respond quickly and automatically.",
      "Optimize performance and cost across workloads.",
      "Prevent breaches with industry-standard security controls.",
      "Migrate to, from, or between cloud providers, including hybrid and multi-cloud setups.",
      "Manage infrastructure via infrastructure-as-code for centralized governance.",
    ],
  },
  {
    title: "Full Stack Web Application & API Development",
    description:
      "Ship production-ready applications backed by strong engineering practices.",
    bullets: [
      "Custom backend API design and implementation.",
      "Object modeling and database architecture.",
      "Automated testing coverage (unit, component, integration).",
      "Refactor legacy codebases into modern frameworks and patterns.",
      "CI/CD integration to keep deployments safe and repeatable.",
    ],
  },
  {
    title: "Data Engineering & ETL Solutions",
    description:
      "Turn raw data into trustworthy, actionable insights.",
    bullets: [
      "Scalable ETL pipelines tailored to your volume and velocity.",
      "Schema design plus metadata management for full data provenance.",
      "Normalization, transformation, and integration workflows.",
      "Database optimization for analytics and transactional workloads.",
    ],
  },
] as const;

const ServicesSection = forwardRef<HTMLDivElement, ServicesSectionProps>(
  ({ isActive }, ref) => {
    const transitionTiming = "duration-[3000ms] ease-[cubic-bezier(0.22,1,0.36,1)]";
    const motionState = isActive
      ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
      : "opacity-0 translate-y-8 scale-[0.96] pointer-events-none";

    return (
      <section
        id="services-section"
        ref={ref}
        aria-hidden={!isActive}
        className={`relative min-h-screen snap-start px-6 py-24 transition-all ${transitionTiming} ${motionState}`}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 rounded-[32px] border border-white/10 bg-white/5 p-10 text-left shadow-[0_30px_80px_rgba(2,6,23,0.65)] backdrop-blur">
          <header className="space-y-4 text-center">
            <h1 className="text-4xl font-semibold text-white md:text-5xl">Services</h1>
            <p className="text-base text-white/80 md:text-lg">
              Choose the engagement style that fits your roadmap—jumpstart packages, strategic guidance, or deep technical execution.
            </p>
          </header>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-white/5">
            <h2 className="text-2xl font-semibold text-white">{consultation.title}</h2>
            <p className="mt-2 text-white/80">{consultation.summary}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-white/70">
              {consultation.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-white/5">
            <h2 className="text-2xl font-semibold text-white">{packages.title}</h2>
            <p className="mt-2 text-white/80">{packages.summary}</p>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {packages.tiers.map((tier) => (
                <article
                  key={tier.name}
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_15px_40px_rgba(2,6,23,0.45)]"
                >
                  <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/70">
                    {tier.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <div className="grid gap-6 md:grid-cols-2">
            {capabilitySections.map((capability) => (
              <section
                key={capability.title}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6"
              >
                <h2 className="text-2xl font-semibold text-white">{capability.title}</h2>
                <p className="mt-2 text-sm text-white/80">{capability.description}</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/70">
                  {capability.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

export default ServicesSection;