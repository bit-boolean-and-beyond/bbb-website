import React, { forwardRef, useState } from "react";
import Header from "./Header";

const HomeSection = forwardRef<HTMLDivElement, {}>(({}, ref) => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const handleTouch = (index: number) => {
    setFlippedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  /**
   * TODO
   * ***** PICK A FONT FROM GOOGLE FONTS THAT IS BESPOKE. SOMETHING BOLD AND ELEGANT
   * ***** REMOVE THE FLIPPABLE CARDS IT SHOULD BE A DIV WIHT AN ICON AND INFO SECTION. SEE FIGMA FOR INSPO
   * *****
   */

  return (
    <section
      id="home-section"
      ref={ref}
      className={`min-h-screen snap-start flex items-center justify-center text-4xl font-semibold`}
    >
      <div className="text-center px-6">
        <div>
          <Header />
          <h3 className="md:text-3xl mb-6">
            Bespoke tech solutions for your business
          </h3>
        </div>
        <p className="text-xl p-4">
          We help everyone from early stage startups to enterprises to cost
          effectively streamline their software delivery and cloud operations.
        </p>{" "}
        {/* Clickable tiles that flip over with more info on the back */}
        {/* // TODO: Find an icon for every one of the offerings
        // TODO: No need for flippable card. Have it in a div w/ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
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
          ].map((card, index) => (
            <div
              key={index}
              className="relative w-full h-64 group [perspective:1000px]"
              onTouchStart={() => handleTouch(index)}
            >
              <div
                className={`relative w-full h-full rounded-lg shadow-lg transition-transform duration-500 [transform-style:preserve-3d] ${
                  flippedCards.includes(index)
                    ? "[transform:rotateY(180deg)]"
                    : ""
                } group-hover:[transform:rotateY(180deg)]`}
              >
                {/* Front side */}
                <section className="absolute flex h-full w-full flex-col justify-center gap-y-5 matte-black px-2 py-10 text-black backface-hidden rounded-lg">
                  <h2 className="text-2xl font-bold">{card.title}</h2>
                </section>
                {/* Back side */}
                <section className="absolute flex h-full w-full rotate-y-180 flex-col justify-center gap-y-5 matte-black px-2 py-10 text-black text-lg backface-hidden rounded-lg">
                  <p className="text-center">{card.description}</p>
                </section>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default HomeSection;
