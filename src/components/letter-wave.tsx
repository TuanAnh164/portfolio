interface LetterWaveProps {
  text: string;
  className?: string;
  delayStep?: number;
  baseDelay?: number;
}

/**
 * Animated wave text effect inspired by quannguyen89.vercel.app.
 * Splits text into words and characters, staggering the wave animation on each letter.
 */
export function LetterWave({
  text,
  className = "",
  delayStep = 0.08,
  baseDelay = 0,
}: LetterWaveProps) {
  const words = text.split(" ");

  return (
    <span className={`inline-flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 ${className}`} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span className="inline-flex flex-wrap items-center gap-x-2.5 sm:gap-x-3" aria-hidden="true">
        {words.map((word, wordIdx) => {
          const wordOffset = words.slice(0, wordIdx).join(" ").length + (wordIdx > 0 ? 1 : 0);
          return (
            <span key={wordIdx} className="inline-block whitespace-nowrap">
              {word.split("").map((char, charIdx) => {
                const delay = baseDelay + (wordOffset + charIdx) * delayStep;
                return (
                  <span
                    key={charIdx}
                    className="animate-letter-wave inline-block"
                    style={{ animationDelay: `${delay.toFixed(2)}s` }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </span>
  );
}
