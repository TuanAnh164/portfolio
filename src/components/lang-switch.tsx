"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

export function LangSwitch({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(vi|en)(?=\/|$)/, "");

  return (
    <div className="flex rounded-md border border-line p-0.5 font-mono text-xs" role="group" aria-label="Language">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          aria-current={l === lang ? "true" : undefined}
          className={`rounded px-2 py-1 uppercase transition-colors ${
            l === lang ? "bg-accent text-bg" : "text-muted hover:text-text"
          }`}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
