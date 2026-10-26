import { profile } from "@/content/profile";
import { getDictionary } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { Section } from "./section";

export function About({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const facts = [
    { k: "4", v: lang === "vi" ? "tháng thực tập tại FPT Software" : "months interning at FPT Software" },
    { k: "FE + BE", v: lang === "vi" ? "web & mobile" : "web & mobile" },
  ];

  return (
    <Section id="about" index="01" title={t.sections.about}>
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-muted">
          {profile.about.map((p, i) => (
            <p key={i} className={i === 0 ? "text-text" : undefined}>
              {p[lang]}
            </p>
          ))}
        </div>
        <dl className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {facts.map((f) => (
            <div key={f.v} className="rounded-xl border border-line bg-surface p-5">
              <dt className="sr-only">{f.v}</dt>
              <dd className="font-mono text-2xl font-semibold text-accent">{f.k}</dd>
              <dd className="mt-1 text-sm text-muted">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
