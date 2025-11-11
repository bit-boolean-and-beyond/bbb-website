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
    // Get the scrollable container
    const root = containerRef.current;
    console.log("Container Ref:", root); // Debugging log for containerRef
    if (!root) return;

    // Create an IntersectionObserver to monitor visibility of sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check if the section is intersecting (visible)
          if (entry.isIntersecting) {
            // Find the index of the visible section and update the active state
            const idx = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
            console.log("Observed entry:", entry.target, "Index:", idx); // Debugging log for observed entries
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { root, threshold: 0.6 } // Options: use the container as the root and 60% visibility threshold
    );

    // Observe each section element
    sectionRefs.current.forEach((el, index) => {
      console.log(`Observing section ${index}:`, el); // Debugging log for each section
      if (el) observer.observe(el);
    });

    // Cleanup: disconnect the observer when the component unmounts
    return () => observer.disconnect();
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
