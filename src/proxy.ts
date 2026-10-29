import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";

function preferredLocale(request: NextRequest): Locale {
  // 1. Check cookie 'portfolio_lang'
  const cookieLocale = request.cookies.get("portfolio_lang")?.value;
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale as Locale;
  }

  // 2. Fall back to accept-language header
  const header = request.headers.get("accept-language") ?? "";
  const first = header.split(",")[0]?.trim().toLowerCase() ?? "";
  if (first.startsWith("en")) return "en";
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. If someone visits /vi or /en in the URL bar, redirect to clean URL & save cookie
  const match = pathname.match(/^\/(vi|en)(\/.*)?$/);
  if (match) {
    const lang = match[1] as Locale;
    const cleanPath = match[2] || "/";
    const redirectUrl = new URL(cleanPath, request.url);
    redirectUrl.search = request.nextUrl.search;
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set("portfolio_lang", lang, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });
    return response;
  }

  // 2. Clean URL (e.g. /, /blog, /uses) -> rewrite internally to /[lang] without changing browser URL
  const lang = preferredLocale(request);
  const rewriteUrl = new URL(`/${lang}${pathname}`, request.url);
  rewriteUrl.search = request.nextUrl.search;
  const response = NextResponse.rewrite(rewriteUrl);

  // Ensure cookie is stored for persistence
  if (!request.cookies.has("portfolio_lang")) {
    response.cookies.set("portfolio_lang", lang, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (images, cv, icons).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
