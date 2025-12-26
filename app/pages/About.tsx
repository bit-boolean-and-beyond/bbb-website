import { forwardRef } from "react";
import drewImage from "../assets/drew.jpeg";
import tiffImage from "../assets/tiff.jpg";

type AboutSectionProps = {
  isActive: boolean;
};

const AboutSection = forwardRef<HTMLDivElement, AboutSectionProps>(
  ({ isActive }, ref) => {
    const transitionTiming = "duration-[3000ms] ease-[cubic-bezier(0.22,1,0.36,1)]";
    const motionState = isActive
      ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
      : "opacity-0 translate-y-8 scale-[0.96] pointer-events-none";

    return (
      <section
        id="about-section"
        ref={ref}
        aria-hidden={!isActive}
        className={`relative min-h-screen snap-start px-6 py-24 transition-all ${transitionTiming} ${motionState}`}
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 rounded-[32px] border border-white/10 bg-white/5 p-10 text-center shadow-[0_30px_80px_rgba(2,6,23,0.65)] backdrop-blur">
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold text-white md:text-5xl">About</h1>
            <p className="text-lg leading-relaxed text-white/80 md:text-xl">
              At Bit Boolean and Beyond, we are dedicated to driving measurable value
              for businesses by delivering bespoke solutions tailored to your unique
              challenges. Our mission is to empower startups and small businesses to
              thrive in competitive markets by leveraging cutting-edge technology and
              innovative strategies.
            </p>
            <p className="text-lg leading-relaxed text-white/80 md:text-xl">
              <strong>What We Do:</strong> We provide end-to-end full-stack solutions
              that bring your vision to life. From creating intuitive front-end user
              experiences to building scalable and secure back-end systems, we design
              and implement the complete technology ecosystem your business needs to
              succeed.
            </p>
          </div>

          <div className="grid gap-8 text-left md:grid-cols-2">
            <article className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-inner shadow-white/5">
              <img
                src={drewImage}
                alt="Drew Riffle"
                loading="lazy"
                className="h-32 w-32 rounded-full border border-white/20 object-cover"
              />
              <h3 className="text-xl font-semibold text-white">Drew Riffle</h3>
              <p className="text-sm text-white/70">
                Drew is a lifelong software engineer and tech enthusiast who has
                collaborated with startups, government agencies, and large
                enterprises. With expertise spanning software development, cloud
                infrastructure, and data engineering, Drew is a versatile problem
                solver dedicated to delivering impactful solutions.
              </p>
            </article>

            <article className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-inner shadow-white/5">
              <img
                src={tiffImage}
                alt="Tiffany Messer"
                loading="lazy"
                className="h-32 w-32 rounded-full border border-white/20 object-cover"
              />
              <h3 className="text-xl font-semibold text-white">Tiffany Messer</h3>
              <p className="text-sm text-white/70">
                Tiffany is a seasoned software engineer with a passion for building
                scalable systems and empowering businesses through technology. Her
                expertise in project management and technical consulting ensures that
                every solution is aligned with your business goals.
              </p>
            </article>
          </div>
        </div>
      </section>
    );
  }
);

export default AboutSection;