import React, { forwardRef } from "react";

const ServicesSection = forwardRef<HTMLDivElement, { isDark: boolean }>(({ isDark }, ref) => (
  <section
    id="services-section"
    ref={ref}
    className={`h-screen snap-start flex items-center justify-center text-4xl font-semibold ${
      isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`}
  >
    <div className="text-center px-6">
      <h1 className="text-5xl md:text-6xl mb-4">Services</h1>
      <p className="max-w-xl mx-auto opacity-90">
        Explore our services here. Use the side nav or scroll to snap between sections.
      </p>
    </div>
  </section>
));

export default ServicesSection;