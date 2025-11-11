import {
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { useEffect, useRef, useState } from "react";
import "./app.css";
import type { Route } from "./+types/root";

import DarkModeToggle from "./components/DarkModeToggle";
import { lazy, Suspense } from "react";
const HomeSection = lazy(() => import("./pages/Home"));
const AboutSection = lazy(() => import("./pages/About"));
const ServicesSection = lazy(() => import("./pages/Services"));

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  // Ref to the scrollable container (the <main> element)
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Ref to store DOM nodes for each section
  const sectionRefs = useRef<HTMLDivElement[]>([]);

  // State to track the currently active section
  const [active, setActive] = useState(0);

  // State to track the current theme (light or dark)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Retrieve the saved theme from localStorage or default to light mode
    return localStorage.getItem("isDarkMode") === "true";
  });

  // useEffect to apply the theme on initial load
  useEffect(() => {
    document.documentElement.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  // useEffect to set up an IntersectionObserver for tracking which section is visible
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const calculateViewportOccupancy = () => {
      const viewportHeight = window.innerHeight;
      let maxOccupancy = 0;
      let activeSection = 0;

      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
          const occupancy = Math.max(0, visibleHeight) / viewportHeight;

          if (occupancy > maxOccupancy) {
            maxOccupancy = occupancy;
            activeSection = index;
          }
        }
      });

      setActive(activeSection);
    };

    // Attach event listeners for scroll and resize
    root.addEventListener("scroll", calculateViewportOccupancy);
    window.addEventListener("resize", calculateViewportOccupancy);

    // Initial calculation
    calculateViewportOccupancy();

    // Cleanup event listeners on unmount
    return () => {
      root.removeEventListener("scroll", calculateViewportOccupancy);
      window.removeEventListener("resize", calculateViewportOccupancy);
    };
  }, []);

  // Add dynamic snapping behavior based on scroll direction
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = root.scrollTop;
      const scrollDirection = scrollTop > lastScrollTop ? "down" : "up";
      lastScrollTop = scrollTop;

      sectionRefs.current.forEach((section, index) => {
        if (section) {
          section.style.scrollSnapAlign = scrollDirection === "down" ? "start" : "end";
        }
      });
    };

    // Attach scroll event listener
    root.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => {
      root.removeEventListener("scroll", handleScroll);
    };
  }, []);


  // Function to scroll to a specific section by index
  const scrollTo = (index: number) => {
    const el = sectionRefs.current[index];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Render the main content
  return (
    <main
      ref={containerRef} // Attach the ref to the scrollable container
      className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth" // Tailwind classes for styling
      aria-label="Scrollable sections container"
    >
      {/* Dark mode toggle button */}
      <DarkModeToggle isDarkMode={isDarkMode} onThemeChange={setIsDarkMode} />

      {/* Navigation buttons on the right side */}
      <nav className="fixed right-4 top-1/2 z-50 transform -translate-y-1/2 flex flex-col gap-3">
        {["Home", "About Us", "Services"].map((_, i) => (
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

      {/* Render each section lazily with a loading screen */}
      {/* <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <h1>Loading...</h1>
          </div>
        }
      > */}
        <HomeSection ref={(el) => { if (el) sectionRefs.current[0] = el; }} isDark={isDarkMode} />
        <AboutSection ref={(el) => { if (el) sectionRefs.current[1] = el; }} isDark={isDarkMode} />
        <ServicesSection ref={(el) => { if (el) sectionRefs.current[2] = el; }} isDark={isDarkMode} />
      {/* </Suspense> */}
    </main>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
