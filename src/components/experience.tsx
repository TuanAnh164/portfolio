import { education, experience, type TimelineItem } from "@/content/profile";
import { getDictionary } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { ScrollReveal } from "./scroll-reveal";
import { Section } from "./section";

function Timeline({ items, lang }: { items: TimelineItem[]; lang: Locale }) {
  return (
    <ol className="relative space-y-8 border-l border-line pl-6">
      {items.map((item, idx) => (
        <ScrollReveal key={item.org} delayMs={idx * 70}>
          <li className="group relative">
            <span className="absolute -left-[31px] top-1.5 size-3 rounded-full border-2 border-accent bg-bg transition-all duration-300 group-hover:scale-125 group-hover:bg-accent group-hover:shadow-[0_0_12px_color-mix(in_srgb,var(--accent)_60%,transparent)]" />
            <p className="font-mono text-xs text-muted">
              {typeof item.period === "string" ? item.period : item.period[lang]}
            </p>
            <h4 className="mt-1 text-lg font-semibold transition-colors group-hover:text-accent">
              {item.org}
            </h4>
            <p className="font-mono text-sm text-accent">{item.title[lang]}</p>
            {item.points.length > 0 && (
              <ul className="mt-3 space-y-2 text-muted">
                {item.points.map((pt) => (
                  <li key={pt.en} className="flex gap-2">
                    <span className="font-mono text-accent">▹</span>
                    <span>{pt[lang]}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ScrollReveal>
      ))}
    </ol>
  );
}

export function Experience({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  return (
    <Section id="experience" index="04" title={t.sections.experience}>
      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <h3 className="mb-6 font-mono text-sm uppercase tracking-widest text-muted">{t.sections.work}</h3>
          <Timeline items={experience} lang={lang} />
        </div>
        <div>
          <h3 className="mb-6 font-mono text-sm uppercase tracking-widest text-muted">{t.sections.education}</h3>
          <Timeline items={education} lang={lang} />
        </div>
      </div>
    </Section>
  );
}
