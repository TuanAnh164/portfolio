import { skillLevel, skills } from "@/content/profile";
import { getDictionary } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { ScrollReveal } from "./scroll-reveal";
import { Section } from "./section";

export function Skills({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  return (
    <Section id="skills" index="02" title={t.sections.skills} note={t.sections.skillsNote}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, idx) => (
          <ScrollReveal key={group.title.en} delayMs={idx * 60}>
            <div className="card-hover h-full rounded-xl border border-line bg-surface p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold transition-colors group-hover:text-accent">
                  {group.title[lang]}
                </h3>
                <span className="font-mono text-xs text-accent">{skillLevel[lang]}</span>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="cursor-default rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs text-text/90 transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
