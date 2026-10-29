"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  rootMargin?: string;
  threshold?: number;
}

/**
 * Scroll reveal component providing the `whileInView` entrance animation
 * seen in both trantuananhdev.vercel.app and quannguyen89.vercel.app.
 * Directly activates CSS class on intersection for zero React re-render overhead.
 */
export function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
  rootMargin = "-40px",
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delayMs > 0) {
              setTimeout(() => {
                entry.target.classList.add("is-visible");
              }, delayMs);
            } else {
              entry.target.classList.add("is-visible");
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [delayMs, rootMargin, threshold]);

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${className}`}
      style={{
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}
