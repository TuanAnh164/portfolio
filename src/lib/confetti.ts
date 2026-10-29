import confetti from "canvas-confetti";

/**
 * Fires a festive confetti burst customized with the site's accent colors.
 * Inspired by quannguyen89.vercel.app portfolio celebration effect.
 */
export function fireConfetti(options?: confetti.Options) {
  if (typeof window === "undefined") return;

  try {
    confetti({
      particleCount: 55,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#4ade80", "#38bdf8", "#0ea5e9", "#22c55e", "#fbbf24"],
      disableForReducedMotion: true,
      ...options,
    });
  } catch {
    // Canvas confetti fails gracefully if canvas isn't supported or restricted
  }
}

/**
 * Fires a double cannon blast from left and right corners.
 */
export function fireCelebration() {
  if (typeof window === "undefined") return;

  try {
    const end = Date.now() + 600;
    const colors = ["#4ade80", "#38bdf8", "#22c55e", "#3b82f6"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors,
        disableForReducedMotion: true,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch {
    // Silently continue
  }
}

