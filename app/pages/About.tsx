import React, { forwardRef } from "react";

const AboutSection = forwardRef<HTMLDivElement>((_, ref) => (
  <div id="about-section" ref={ref} className="w-full bg-gray-50 py-16 px-6">
    <div className="max-w-7xl mx-auto text-center">
      {/* Section Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
        About
      </h1>
      {/* Description */}
      <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
        At Bit Boolean and Beyond, we are dedicated to driving measurable value
        for businesses by delivering bespoke solutions tailored to your unique
        challenges. Our mission is to empower startups and small businesses to
        thrive in competitive markets by leveraging cutting-edge technology and
        innovative strategies.
      </p>
      <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mt-4">
        <strong>What We Do:</strong> We provide end-to-end full-stack solutions
        that bring your vision to life. From creating intuitive front-end user
        experiences to building scalable and secure back-end systems, we design
        and implement the complete technology ecosystem your business needs to
        succeed.
      </p>
    </div>

    {/* Team Section */}
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* Team Member 1 */}
      <div className="flex flex-col items-center text-center">
        <img
          src="/app/assets/drew.jpeg"
          alt="Drew Riffle"
          className="w-40 h-40 rounded-full shadow-lg mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-800">Drew Riffle</h3>
        <p className="text-gray-600 mt-2">
          Drew is a lifelong software engineer and tech enthusiast who has
          collaborated with startups, government agencies, and large
          enterprises. With expertise spanning software development, cloud
          infrastructure, and data engineering, Drew is a versatile problem
          solver dedicated to delivering impactful solutions.
        </p>
      </div>

      {/* Team Member 2 */}
      <div className="flex flex-col items-center text-center">
        <img
          src="/app/assets/tiff.jpg"
          alt="Tiffany Messer"
          className="w-40 h-40 rounded-full shadow-lg mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-800">Tiffany Messer</h3>
        <p className="text-gray-600 mt-2">
          Tiffany is a seasoned software engineer with a passion for building
          scalable systems and empowering businesses through technology. Her
          expertise in project management and technical consulting ensures that
          every solution is aligned with your business goals.
        </p>
      </div>
    </div>
  </div>
));

export default AboutSection;