import Image from "next/image";
import { projects } from "@/content/profile";
import { getDictionary } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { ExternalIcon } from "./icons";
import { Section, Tag } from "./section";

export function Projects({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  return (
    <Section id="projects" index="03" title={t.sections.projects} note={t.sections.projectsNote}>
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((p, i) => (
          <article
            key={p.name}
            className={`group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-accent/40 ${
              i === 0 || (i === projects.length - 1 && projects.length % 2 === 0) ? "lg:col-span-2" : ""
            }`}
          >
            {(p.image || p.logo) && (
              <div
                className={`relative shrink-0 overflow-hidden border-b border-line bg-surface-2 ${
                  i === 0 ? "aspect-video sm:aspect-2/1" : "aspect-video"
                }`}
              >
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={`${p.name} screenshot`}
                    fill
                    sizes={i === 0 ? "(min-width: 1152px) 1152px, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
                    className="object-cover object-top-left transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,rgb(255_255_255/0.06),transparent_70%)]">
                    <Image
                      src={p.logo!}
                      alt={`${p.name} logo`}
                      width={128}
                      height={128}
                      className="size-32 rounded-3xl object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-1 flex-col p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-bold">{p.name}</h3>
                <span className="font-mono text-xs text-muted">{p.period}</span>
              </div>
              <p className="mt-1 font-mono text-sm text-accent">{p.role[lang]}</p>
              <p className="mt-4 leading-relaxed text-muted">{p.summary[lang]}</p>

              <ul className="mt-4 space-y-2 text-sm">
                {p.highlights.map((h) => (
                  <li key={h.en} className="flex gap-2">
                    <span className="mt-0.5 font-mono text-accent">▹</span>
                    <span className="text-text/90">{h[lang]}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-sm text-text transition-colors hover:text-accent"
                  >
                    {l.label} <ExternalIcon width={14} height={14} />
                  </a>
                ))}
                {p.meta && <span className="ml-auto font-mono text-xs text-muted">{p.meta[lang]}</span>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
