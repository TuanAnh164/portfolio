"use client";

import { useTransition } from "react";
import { locales, type Locale } from "@/lib/i18n";

function persistLocale(target: Locale) {
  document.cookie = `portfolio_lang=${target}; path=/; max-age=31536000; SameSite=Lax`;
  try {
    localStorage.setItem("portfolio-lang", target);
  } catch {}
}

export function LangSwitch({ lang }: { lang: Locale }) {
  const [isPending, startTransition] = useTransition();

  const handleSwitch = (target: Locale) => {
    if (target === lang || isPending) return;

    persistLocale(target);

    // Reload in place without changing URL
    startTransition(() => {
      window.location.reload();
    });
  };

  return (
    <div
      className="flex rounded-md border border-line p-0.5 font-mono text-xs"
      role="group"
      aria-label="Language"
    >
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => handleSwitch(l)}
          aria-current={l === lang ? "true" : undefined}
          disabled={isPending}
          className={`cursor-pointer rounded px-2 py-1 uppercase transition-all duration-200 active:scale-95 disabled:opacity-70 ${
            l === lang
              ? "bg-accent font-semibold text-bg shadow-xs"
              : "text-muted hover:bg-surface-2 hover:text-text"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
