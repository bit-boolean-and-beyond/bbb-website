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

import NavButtons from "./components/NavButtons";
import HomeSection from "./pages/Home";
import AboutSection from "./pages/About";
import ServicesSection from "./pages/Services";

const SECTION_COUNT = 3;

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
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>(
    Array(SECTION_COUNT).fill(null)
  );
  const [active, setActive] = useState(0);

  // set active section based on which has the most visibility in viewport
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const setActiveState = () => {
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

    root.addEventListener("scroll", setActiveState);
    window.addEventListener("resize", setActiveState);

    // Initial calculation
    setActiveState();

    // Cleanup
    return () => {
      root.removeEventListener("scroll", setActiveState);
      window.removeEventListener("resize", setActiveState);
    };
  }, []);

  // snap to start or end based on scroll direction
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

    root.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => {
      root.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // scroll to section by index
  const scrollTo = (index: number) => {
    const el = sectionRefs.current[index];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Render the main content
  return (
    <main
      ref={containerRef} // Attach the ref to the scrollable container
      className="relative h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth text-slate-100" // Tailwind classes for styling
      aria-label="Scrollable sections container"
    >

      <NavButtons active={active} scrollTo={scrollTo} sectionCount={SECTION_COUNT} />

      <HomeSection
        isActive={active === 0}
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
      />
      <AboutSection
        isActive={active === 1}
        ref={(el) => {
          sectionRefs.current[1] = el;
        }}
      />
      <ServicesSection
        isActive={active === 2}
        ref={(el) => {
          sectionRefs.current[2] = el;
        }}
      />
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
