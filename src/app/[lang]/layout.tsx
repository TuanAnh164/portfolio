import type { Metadata } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
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
    alternates: { languages: { vi: "/vi", en: "/en" } },
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
    <html lang={lang} className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh bg-grid">
        <Header lang={lang} />
        <main>{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
