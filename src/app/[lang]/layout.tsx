import type { Metadata } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageIntro } from "@/components/page-intro";
import { profile } from "@/content/profile";
import { hasLocale, locales } from "@/lib/i18n";
import "../globals.css";

const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-vn",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  variable: "--font-jb",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ??
        (process.env.VERCEL_PROJECT_PRODUCTION_URL
          ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
          : "http://localhost:3000"),
    ),
    title: {
      default: `${profile.name} — ${profile.role[lang]}`,
      template: `%s · ${profile.name}`,
    },
    description: profile.tagline[lang],
    openGraph: {
      title: `${profile.name} — ${profile.role[lang]}`,
      description: profile.tagline[lang],
      images: [profile.avatar],
      locale: lang === "vi" ? "vi_VN" : "en_US",
      type: "website",
    },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t==='light'||(!t&&window.matchMedia('(prefers-color-scheme: light)').matches)){document.documentElement.classList.add('light');}else{document.documentElement.classList.add('dark');}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-dvh bg-grid relative selection:bg-accent/25 selection:text-text">
        {/* Ambient atmospheric light orbs for depth behind the grid */}
        <div
          className="pointer-events-none fixed top-0 left-1/2 -z-10 h-[500px] w-[1000px] -translate-x-1/2 rounded-full blur-[140px] opacity-75 transition-opacity duration-500 bg-gradient-to-b from-sky-400/25 via-blue-500/15 to-transparent dark:from-emerald-500/10 dark:via-cyan-500/5 dark:to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none fixed bottom-0 right-10 -z-10 h-[420px] w-[600px] rounded-full blur-[130px] opacity-60 transition-opacity duration-500 bg-gradient-to-tr from-indigo-400/20 via-sky-300/10 to-transparent dark:from-cyan-500/5 dark:to-transparent"
          aria-hidden="true"
        />

        <PageIntro name={profile.name} handle={profile.handle} />
        <Header lang={lang} />
        <main>{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
