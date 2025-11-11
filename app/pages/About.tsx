import React, { forwardRef } from "react";

const AboutSection = forwardRef<HTMLDivElement, { isDark: boolean }>(({ isDark }, ref) => (
  <section
    id="about-section"
    ref={ref}
    className={`min-h-screen snap-start flex flex-col items-center justify-center text-4xl font-semibold ${
      isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`}
  >
    <div className="w-full text-center px-6">
      <h1 className="text-5xl md:text-6xl mb-4">About Us</h1>
      <p className="w-full text-lg md:text-xl mx-auto opacity-90">
        Bit Boolean and Beyond Consulting was formed in 2025 in the DC area by software engineering power couple Andrew Riffle and Tiffany Messer. Our mission is to provide affordable business and technical consulting services to small and mid sized businesses. With over 20 years of combined experience, we are dedicated to solving your technical problems so you can focus on what your business does best.
      </p>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-8">
      <div className="text-center text-sm md:text-base">
        <img src="/app/assets/drew.jpeg" alt="Drew Riffle photo" className="mx-auto mb-2" />
        <p>Drew is a lifelong software engineer and tech tinkerer who has worked with numerous startups, government agencies and big corporations.  He is a jack of all trades with deep experience in software development, cloud infrastructure and data engineering.</p>
      </div>
      <div className="text-center">
        <img src="/app/assets/tiffany.jpeg" alt="Tiffany Messer photo" className="mx-auto mb-2" />
        <p>Photo 2 Description</p>
      </div>
    </div>
  </section>
));

export default AboutSection;