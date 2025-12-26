import { forwardRef } from "react";

type ServicesSectionProps = {
  isActive: boolean;
};

const ServicesSection = forwardRef<HTMLDivElement, ServicesSectionProps>(
  ({ isActive }, ref) => {
    const motionState = isActive
      ? "opacity-100 translate-y-0 scale-100"
      : "opacity-30 translate-y-6 scale-[0.99]";

    return (
      <section
        id="services-section"
        ref={ref}
        className={`relative min-h-screen snap-start px-6 py-24 transition-all duration-700 ease-out ${motionState}`}
      >
        <div className="mx-auto flex h-full w-full max-w-4xl flex-col items-center justify-center gap-8 rounded-[32px] border border-white/10 bg-white/5 p-10 text-center shadow-[0_30px_80px_rgba(2,6,23,0.65)] backdrop-blur">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold text-white md:text-5xl">Services</h1>
            <p className="text-base text-white/80 md:text-lg">
              Explore our services here. Use the side nav or scroll to snap between sections.
            </p>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" aria-hidden="true" />
        </div>
      </section>
    );
  }
);

export default ServicesSection;