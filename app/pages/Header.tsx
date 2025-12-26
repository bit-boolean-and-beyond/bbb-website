const navLinks = [
  { href: "#about-section", label: "About" },
  { href: "#services-section", label: "Services" },
  { href: "#contact-section", label: "Contact" },
] as const;

const Header = () => {
  return (
    <header className="fixed left-1/2 top-6 z-40 w-full max-w-6xl -translate-x-1/2 px-4">
      <div className="flex items-center justify-between rounded-full border border-white/15 bg-white/5 px-6 py-3 shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-md">
        <div className="text-lg font-semibold uppercase tracking-[0.3em] text-white">
          <a href="#home-section">BBB</a>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
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
        <div className="md:hidden">
          <button
            type="button"
            aria-label="Open navigation menu"
            className="rounded-full border border-white/20 p-2 text-white/70 transition-colors duration-200 hover:text-white"
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
    </header>
  );
};

export default Header;
