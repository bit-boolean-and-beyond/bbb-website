export default function NavButtons({ active, scrollTo, sectionCount }: { active: number; scrollTo: (index: number) => void; sectionCount: number }) {
    return (
        <nav className="fixed right-4 top-1/2 z-50 transform -translate-y-1/2 flex flex-col gap-3">
            {Array.from({ length: sectionCount }).map((_, i) => (
                <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to section ${i + 1}`}
                className={`w-3 h-3 rounded-full ring-2 ring-white transition-transform ${
                    active === i ? "scale-125 bg-white" : "bg-white/40"
                }`}
                />
            ))}
        </nav>
    );
}