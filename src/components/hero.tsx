import Image from "next/image";
import { profile, skills } from "@/content/profile";
import { getDictionary } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { CvButton } from "./cv-button";
import { ArrowIcon, PinIcon } from "./icons";
import { LetterWave } from "./letter-wave";

export function Hero({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const stack = ["React", "Next.js", "Node.js", "MongoDB", "React Native"];

  return (
    <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:pt-24">
      {/* Ambient background glow blob (inspired by trantuananhdev.vercel.app) */}
      <div className="pointer-events-none absolute -top-12 left-1/3 -z-10 h-72 w-72 -translate-x-1/2 rounded-full ambient-glow opacity-30 blur-3xl sm:h-[420px] sm:w-[420px]" />

      <div className="reveal animate-hero-fade-up">
        <div className="flex items-center gap-4">
          <div className="group relative">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={72}
              height={72}
              priority
              className="size-[72px] rounded-full border-2 border-accent/50 object-cover object-[50%_20%] transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        <p className="mt-8 font-mono text-sm text-muted">{t.hero.greeting}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-6xl">
          <LetterWave text={profile.name} />
        </h1>
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
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20 active:scale-95"
          >
            {t.hero.viewProjects} <ArrowIcon width={16} height={16} />
          </a>
          <CvButton href={profile.cv} label={t.hero.downloadCv} />
          <a
            href="#terminal"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-mono text-sm text-muted transition-all duration-200 hover:text-accent active:scale-95"
          >
            &gt;_ {t.hero.openTerminal}
          </a>
        </div>
      </div>

      {/* Code card with card hover lift & glow */}
      <div className="card-hover reveal animate-hero-card-enter overflow-hidden rounded-xl border border-line bg-surface shadow-xl shadow-slate-900/5 dark:shadow-2xl dark:shadow-black/40">
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

      {/* Floating bounce scroll down indicator (from trantuananhdev.vercel.app) */}
      <div className="col-span-full mt-4 hidden justify-center lg:flex">
        <a
          href="#about"
          aria-label="Scroll to content"
          className="group flex flex-col items-center gap-1.5 font-mono text-xs text-muted/60 transition-colors hover:text-accent"
        >
          <span className="text-[10px] tracking-widest uppercase opacity-70 group-hover:opacity-100">Scroll</span>
          <div className="animate-bounce-subtle">
            <ArrowIcon width={16} height={16} className="rotate-90 text-muted/70 transition-colors group-hover:text-accent" />
          </div>
        </a>
      </div>
    </section>
  );
}
