import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { learning, uses } from "@/content/profile";
import { getDictionary } from "@/content/ui";
import { hasLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/uses">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return { title: t.uses.title, description: t.uses.intro };
}

export default async function UsesPage({ params }: PageProps<"/[lang]/uses">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <p className="font-mono text-sm text-accent">
        <span className="text-muted">{"//"}</span> uses
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">{t.uses.title}</h1>
      <p className="mt-3 text-muted">{t.uses.intro}</p>

      <h2 className="mt-14 font-mono text-sm uppercase tracking-widest text-muted">{t.uses.learning}</h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-3">
        {learning.map((item) => (
          <li key={item.name} className="rounded-xl border border-accent/30 bg-accent/5 p-5">
            <p className="font-semibold text-accent">{item.name}</p>
            <p className="mt-2 text-sm text-muted">{item.note[lang]}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-14 font-mono text-sm uppercase tracking-widest text-muted">{t.uses.tools}</h2>
      <div className="mt-5 space-y-8">
        {uses.map((group) => (
          <section key={group.title.en}>
            <h3 className="text-lg font-semibold">{group.title[lang]}</h3>
            <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-surface">
              {group.items.map((item) => (
                <li key={item.name} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="shrink-0 font-mono text-sm sm:w-56">{item.name}</span>
                  <span className="text-sm text-muted">{item.note[lang]}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
