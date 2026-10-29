const DEFAULT_KEYWORDS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "MongoDB",
  "React Native",
  "Express",
  "NestJS",
  "RESTful API",
  "Redux Toolkit",
  "Dart & Flutter",
  "Git & GitHub",
  "Clean Code",
];

interface MarqueeStripProps {
  items?: string[];
  className?: string;
}

/**
 * Continuous horizontal marquee strip inspired by:
 * - trantuananhdev.vercel.app (tech keywords with ◆ separators)
 * - quannguyen89.vercel.app (seamless infinite loop & gradient fade edges)
 */
export function MarqueeStrip({ items = DEFAULT_KEYWORDS, className = "" }: MarqueeStripProps) {
  // Duplicate array for seamless infinite looping
  const duplicated = [...items, ...items];

  return (
    <div
      className={`group relative overflow-hidden border-y border-line/70 bg-surface/60 py-3 backdrop-blur-sm select-none sm:py-3.5 ${className}`}
      aria-label="Technology stack ticker"
    >
      {/* Left gradient fade mask */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent sm:w-24" />

      {/* Right gradient fade mask */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent sm:w-24" />

      {/* Running track */}
      <div className="animate-marquee flex items-center gap-6 sm:gap-8">
        {duplicated.map((item, idx) => (
          <span key={`${item}-${idx}`} className="flex shrink-0 items-center gap-6 sm:gap-8">
            <span className="font-mono text-xs font-semibold tracking-wider text-text/80 uppercase transition-colors group-hover:text-text sm:text-sm">
              {item}
            </span>
            <span className="text-accent/70 select-none text-xs" aria-hidden="true">
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

