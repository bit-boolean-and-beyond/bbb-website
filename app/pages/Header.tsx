import { useEffect, useState } from "react";

const navLinks = [
  { href: "#home-section", label: "Home" },
  { href: "#about-section", label: "About" },
  { href: "#services-section", label: "Services" },
  { href: "#contact-section", label: "Contact" },
] as const;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleNavClick = () => setIsMenuOpen(false);

  return (
    <header className="fixed left-1/2 top-6 z-40 w-full max-w-6xl -translate-x-1/2 px-4">
      <div className="flex items-center justify-between gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-md">
        <div className="flex-1 min-w-0 text-center text-sm font-semibold uppercase tracking-[0.2em] leading-tight text-white md:text-lg md:text-left md:tracking-[0.3em]">
          <a href="#home-section" className="block">
            Bit Boolean and Beyond Consulting
          </a>
        </div>
        <nav className="hidden flex-shrink-0 items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm uppercase tracking-wide text-white/70 transition-colors duration-200 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex-shrink-0 md:hidden">
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
            className="rounded-full border border-white/20 p-2 text-white/70 transition-colors duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h12M4 18h10" />
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="absolute right-8 top-[calc(100%+0.75rem)] w-60 md:hidden">
          <nav className="flex flex-col gap-2 rounded-3xl border border-white/15 bg-white/10 p-4 text-white shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={handleNavClick}
                className="rounded-2xl px-3 py-2 text-sm uppercase tracking-wide text-white/70 transition-colors duration-200 hover:bg-white/15 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
