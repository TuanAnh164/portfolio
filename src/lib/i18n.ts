export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** A string available in every supported locale. */
export type L = Record<Locale, string>;

export const otherLocale = (lang: Locale): Locale => (lang === "vi" ? "en" : "vi");
