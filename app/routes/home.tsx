// Importing the `Route` type for type-checking and React hooks for functionality
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import type { Route } from "./+types/home";
import React, { useEffect, useRef, useState } from "react";

// Meta function to define metadata for the page (e.g., title and description)
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Single Page Snap App" },
    { name: "description", content: "Five-section scroll-snapping SPA" },
  ];
}

// Main component for the Home page
export default function Home() {
  // Ref to the scrollable container (the <main> element)
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Ref to store DOM nodes for each section
  const sectionRefs = useRef<HTMLDivElement[]>([]);

  // State to track the currently active section
  const [active, setActive] = useState(0);

  // State to track the current theme (light or dark)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Retrieve the saved theme from localStorage or default to false (light mode)
    const savedTheme = localStorage.getItem("isDarkMode");
    return savedTheme === "true";
  });

  // useEffect to set up an IntersectionObserver for tracking which section is visible
  useEffect(() => {
    // Get the scrollable container
    const root = containerRef.current;
    if (!root) return;

    // Create an IntersectionObserver to monitor visibility of sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check if the section is intersecting (visible)
          if (entry.isIntersecting) {
            // Find the index of the visible section and update the active state
            const idx = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { root, threshold: 0.6 } // Options: use the container as the root and 60% visibility threshold
    );

    // Observe each section element
    sectionRefs.current.forEach((el) => el && observer.observe(el));

    // Cleanup: disconnect the observer when the component unmounts
    return () => observer.disconnect();
  }, []);

  // Function to scroll to a specific section by index
  const scrollTo = (index: number) => {
    const el = sectionRefs.current[index];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Function to toggle the theme
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Save the new theme to localStorage
      localStorage.setItem("isDarkMode", newMode.toString());
      return newMode;
    });
  };

  useEffect(() => {
    // Apply the saved theme on initial load
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Render the main content
  return (
    <main
      ref={containerRef} // Attach the ref to the scrollable container
      className={`h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth ${isDarkMode ? "dark" : "light"}`} // Tailwind classes for styling
      aria-label="Scrollable sections container"
    >
      {/* Dark mode toggle button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-gray-800 text-white rounded shadow-md hover:bg-gray-700"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ?
          <><FontAwesomeIcon icon={faSun} /><br /><p>Light Mode</p></> : 
          <><FontAwesomeIcon icon={faMoon} /><br /><p>Dark Mode</p></>
        }
      </button>

      {/* Navigation buttons on the right side */}
      <nav className="fixed right-4 top-1/2 z-50 transform -translate-y-1/2 flex flex-col gap-3">
        {["Home", "About Us", "Services", "Contact Us", "Blog"].map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)} // Scroll to the corresponding section when clicked
            aria-label={`Go to section ${i + 1}`}
            className={`w-3 h-3 rounded-full ring-2 ring-white transition-transform ${
              active === i ? "scale-125 bg-white" : "bg-white/40"
            }`} // Highlight the active section
          />
        ))}
      </nav>

      {/* Render each section individually */}
      <section
        ref={(el) => {
          if (el) sectionRefs.current[0] = el; // Store the DOM node in sectionRefs
        }}
        className={`h-screen snap-start flex items-center justify-center text-4xl font-semibold ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
      >
        <div className="text-center px-6">
          <h1 className="text-5xl md:text-6xl mb-4">Home</h1>
          <p className="max-w-xl mx-auto opacity-90">
            Welcome to the Home section. Use the side nav or scroll to snap between sections.
          </p>
        </div>
      </section>

      <section
        ref={(el) => {
          if (el) sectionRefs.current[1] = el;
        }}
        className={`h-screen snap-start flex items-center justify-center text-4xl font-semibold ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
      >
        <div className="text-center px-6">
          <h1 className="text-5xl md:text-6xl mb-4">About Us</h1>
          <p className="max-w-xl mx-auto opacity-90">
            Learn more about us in this section. Use the side nav or scroll to snap between sections.
          </p>
        </div>
      </section>

      <section
        ref={(el) => {
          if (el) sectionRefs.current[2] = el;
        }}
        className={`h-screen snap-start flex items-center justify-center text-4xl font-semibold ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
      >
        <div className="text-center px-6">
          <h1 className="text-5xl md:text-6xl mb-4">Services</h1>
          <p className="max-w-xl mx-auto opacity-90">
            Explore our services here. Use the side nav or scroll to snap between sections.
          </p>
        </div>
      </section>

      <section
        ref={(el) => {
          if (el) sectionRefs.current[3] = el;
        }}
        className={`h-screen snap-start flex items-center justify-center text-4xl font-semibold ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
      >
        <div className="text-center px-6">
          <h1 className="text-5xl md:text-6xl mb-4">Contact Us</h1>
          <p className="max-w-xl mx-auto opacity-90">
            Get in touch with us in this section. Use the side nav or scroll to snap between sections.
          </p>
        </div>
      </section>

      <section
        ref={(el) => {
          if (el) sectionRefs.current[4] = el;
        }}
        className={`h-screen snap-start flex items-center justify-center text-4xl font-semibold ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
      >
        <div className="text-center px-6">
          <h1 className="text-5xl md:text-6xl mb-4">Blog</h1>
          <p className="max-w-xl mx-auto opacity-90">
            Check out our blog posts here. Use the side nav or scroll to snap between sections.
          </p>
        </div>
      </section>
    </main>
  );
}