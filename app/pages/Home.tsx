import { forwardRef } from "react";
import Header from "./Header";

type HomeSectionProps = {
  isActive: boolean;
};

const offerings = [
  {
    title: "Cloud Infrastructure",
    description:
      "Get help designing the most cost effective and performant infrastructure for your needs",
  },
  {
    title: "Full Stack Web Application and API Development",
    description:
      "Get your ideas off the ground with full stack expertise from requirements gathering across design, implementation and deployment",
  },
  {
    title: "Project Management & Consulting",
    description:
      "Plan and manage all the tech and talent at your disposal",
  },
  {
    title: "Web Design",
    description:
      "Get the word out about your business with a cost effective website",
  },
  {
    title: "Cost and Performance Optimization",
    description:
      "Just because it’s working doesn’t mean it can’t be done faster or more efficiently!",
  },
  {
    title: "Data Engineering and ETL Services",
    description:
      "Manage the data at your disposal and use it to get the best insights",
  },
] as const;

const HomeSection = forwardRef<HTMLDivElement, HomeSectionProps>(({ isActive }, ref) => {
  const motionState = isActive
    ? "opacity-100 translate-y-0 scale-100"
    : "opacity-30 translate-y-6 scale-[0.99]";

  return (
    <section
      id="home-section"
      ref={ref}
      className={`relative min-h-screen snap-start px-6 py-24 transition-all duration-700 ease-out ${motionState}`}
    >
      <Header />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center gap-10 pt-32 text-center">
        <div className="space-y-6">
          <h3 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent">
              Bespoke tech solutions for your business
            </span>
          </h3>
          <p className="text-lg text-white/80 md:text-xl">
            We help everyone from early stage startups to enterprises to cost
            effectively streamline their software delivery and cloud operations.
          </p>
        </div>

        <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offerings.map((card) => (
            <article
              key={card.title}
              className="group relative flex h-full flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-[0_20px_60px_rgba(2,6,23,0.55)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-white/10"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/80 to-emerald-400/70 shadow-[0_0_20px_rgba(34,197,94,0.45)]"
              />
              <h2 className="text-xl font-semibold text-white">{card.title}</h2>
              <p className="text-sm text-white/70">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

export default HomeSection;
