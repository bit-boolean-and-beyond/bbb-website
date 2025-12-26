export default function NavButtons({
    active,
    scrollTo,
    sectionCount,
}: {
    active: number;
    scrollTo: (index: number) => void;
    sectionCount: number;
}) {
    return (
        <nav className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 md:flex">
            {Array.from({ length: sectionCount }).map((_, i) => {
                const isActive = active === i;
                return (
                    <button
                        key={i}
                        onClick={() => scrollTo(i)}
                        aria-label={`Go to section ${i + 1}`}
                        aria-current={isActive ? "step" : undefined}
                        className={`h-3 w-3 rounded-full border border-cyan-300/60 transition-all duration-300 ease-out ${
                            isActive
                                ? "scale-125 bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.85)]"
                                : "bg-white/20 hover:bg-cyan-200/40"
                        }`}
                    />
                );
            })}
        </nav>
    );
}