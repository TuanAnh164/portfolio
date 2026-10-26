import { profile } from "@/content/profile";
import { getDictionary } from "@/content/ui";
import { getGithubStats } from "@/lib/github";
import type { Locale } from "@/lib/i18n";
import { GithubIcon } from "./icons";
import { Section } from "./section";

const levelClass = ["bg-line/70", "bg-accent/25", "bg-accent/50", "bg-accent/75", "bg-accent"];

export async function GithubActivity({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const stats = await getGithubStats(profile.githubUser);

  return (
    <Section id="github" index="05" title={t.sections.github} note={t.github.note}>
      {!stats ? (
        <p className="rounded-xl border border-line bg-surface p-6 text-muted">{t.github.unavailable}</p>
      ) : (
        <div className="rounded-xl border border-line bg-surface p-6">
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { k: stats.total, v: t.github.contributions },
              { k: stats.activeDays, v: t.github.activeDays },
              { k: stats.longestStreak, v: t.github.streak },
              { k: stats.publicRepos ?? "—", v: t.github.repos },
            ].map((s) => (
              <div key={s.v}>
                <dd className="font-mono text-3xl font-semibold text-accent">{s.k}</dd>
                <dt className="mt-1 text-sm text-muted">{s.v}</dt>
              </div>
            ))}
          </dl>

          <div className="mt-8 overflow-x-auto pb-2">
            <div
              className="grid w-max grid-flow-col grid-rows-7 gap-[3px]"
              role="img"
              aria-label={`${stats.total} ${t.github.contributions}`}
            >
              {/* pad so the first column starts on Sunday */}
              {Array.from({ length: stats.firstWeekday }).map((_, i) => (
                <span key={`pad-${i}`} className="size-[11px]" />
              ))}
              {stats.days.map((d) => (
                <span
                  key={d.date}
                  title={`${d.date}: ${d.count}`}
                  className={`size-[11px] rounded-[2px] ${levelClass[d.level]}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm hover:text-accent"
            >
              <GithubIcon width={16} height={16} /> {t.github.viewProfile} · @{profile.githubUser}
            </a>
            <div className="flex items-center gap-1.5 font-mono text-xs text-muted" aria-hidden>
              {t.github.less}
              {levelClass.map((c) => (
                <span key={c} className={`size-[11px] rounded-[2px] ${c}`} />
              ))}
              {t.github.more}
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
