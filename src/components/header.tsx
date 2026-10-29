import Link from "next/link";
import { profile } from "@/content/profile";
import { getDictionary } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { DownloadIcon, MenuIcon } from "./icons";
import { LangSwitch } from "./lang-switch";
import { ThemeSwitch } from "./theme-switch";

export function Header({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const links = [
    { href: `/${lang}#about`, label: t.nav.about },
    { href: `/${lang}#skills`, label: t.nav.skills },
    { href: `/${lang}#projects`, label: t.nav.projects },
    { href: `/${lang}#experience`, label: t.nav.experience },
    { href: `/${lang}#terminal`, label: t.nav.terminal },
    { href: `/${lang}/blog`, label: t.nav.blog },
    { href: `/${lang}/uses`, label: t.nav.uses },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md animate-header-enter">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={`/${lang}`} className="font-mono text-sm font-semibold tracking-tight">
          <span className="text-accent">~/</span>
          {profile.handle}
          <span className="blink text-accent">_</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 font-mono text-[13px] text-muted transition-colors hover:bg-surface-2 hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <LangSwitch lang={lang} />
          <a
            href={profile.cv}
            download
            className="hidden items-center gap-1.5 rounded-md border border-accent/40 px-3 py-1.5 font-mono text-xs text-accent transition-colors hover:bg-accent/10 sm:inline-flex"
          >
            <DownloadIcon width={14} height={14} />
            CV
          </a>

          <details className="group relative lg:hidden">
            <summary className="flex cursor-pointer list-none items-center rounded-md border border-line p-1.5 text-muted hover:text-text [&::-webkit-details-marker]:hidden">
              <MenuIcon />
              <span className="sr-only">Menu</span>
            </summary>
            <nav
              className="absolute right-0 mt-2 flex w-48 flex-col rounded-lg border border-line bg-surface p-2 shadow-xl"
              aria-label="Mobile"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 font-mono text-sm text-muted hover:bg-surface-2 hover:text-text"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={profile.cv}
                download
                className="mt-1 flex items-center gap-2 rounded-md border-t border-line px-3 py-2 font-mono text-sm text-accent"
              >
                <DownloadIcon width={14} height={14} /> CV
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
