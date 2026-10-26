import Image from "next/image";
import { profile, skills } from "@/content/profile";
import { getDictionary } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { ArrowIcon, DownloadIcon, PinIcon } from "./icons";

export function Hero({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const stack = ["React", "Next.js", "Node.js", "MongoDB", "React Native"];

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:pt-24">
      <div className="reveal">
        <div className="flex items-center gap-4">
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={72}
            height={72}
            priority
            className="size-[72px] rounded-full border-2 border-accent/50 object-cover object-[50%_20%]"
          />
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
            <span className="size-1.5 rounded-full bg-accent" />
            {t.hero.available}
          </span>
        </div>

        <p className="mt-8 font-mono text-sm text-muted">{t.hero.greeting}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
        <p className="mt-3 font-mono text-lg text-accent sm:text-xl">
          {profile.role[lang]} <span className="text-muted">·</span>{" "}
          <span className="text-accent-2">{profile.stackLine}</span>
        </p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.tagline[lang]}</p>

        <p className="mt-4 flex items-center gap-1.5 text-sm text-muted">
          <PinIcon width={15} height={15} /> {profile.location[lang]}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
          >
            {t.hero.viewProjects} <ArrowIcon width={16} height={16} />
          </a>
          <a
            href={profile.cv}
            download
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent/50"
          >
            <DownloadIcon width={16} height={16} /> {t.hero.downloadCv}
          </a>
          <a
            href="#terminal"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            &gt;_ {t.hero.openTerminal}
          </a>
        </div>
      </div>

      {/* Code card */}
      <div className="reveal overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/40 [animation-delay:150ms]">
        <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-3">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-muted">developer.ts</span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 sm:text-sm">
          <code>
            <span className="text-accent-2">const</span> <span className="text-warn">developer</span> = {"{"}
            {"\n"}  name: <span className="text-accent">&quot;{profile.name}&quot;</span>,
            {"\n"}  role: <span className="text-accent">&quot;{profile.role[lang]}&quot;</span>,
            {"\n"}  based: <span className="text-accent">&quot;{profile.location[lang]}&quot;</span>,
            {"\n"}  stack: [
            {stack.map((s, i) => (
              <span key={s}>
                {i % 3 === 0 ? "\n    " : " "}
                <span className="text-accent">&quot;{s}&quot;</span>
                {i < stack.length - 1 ? "," : ""}
              </span>
            ))}
            {"\n"}  ],
            {"\n"}  skillGroups: <span className="text-warn">{skills.length}</span>,
            {"\n"}  learning: <span className="text-accent">&quot;AI SDK &amp; LLM&quot;</span>,
            {"\n"}  coffee: <span className="text-accent-2">true</span>,
            {"\n"}
            {"}"};
          </code>
        </pre>
      </div>
    </section>
  );
}
