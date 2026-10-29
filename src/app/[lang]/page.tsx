import { notFound } from "next/navigation";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { GithubActivity } from "@/components/github-activity";
import { Hero } from "@/components/hero";
import { MarqueeStrip } from "@/components/marquee-strip";
import { Projects } from "@/components/projects";
import { Section } from "@/components/section";
import { Skills } from "@/components/skills";
import { Terminal } from "@/components/terminal";
import { getDictionary } from "@/content/ui";
import { hasLocale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <Hero lang={lang} />
      <MarqueeStrip />
      <About lang={lang} />
      <Skills lang={lang} />
      <Projects lang={lang} />
      <Experience lang={lang} />
      <GithubActivity lang={lang} />
      <Section id="terminal" index="06" title={t.sections.terminal} note={t.sections.terminalNote}>
        <Terminal lang={lang} />
      </Section>
      <Contact lang={lang} />
    </>
  );
}
