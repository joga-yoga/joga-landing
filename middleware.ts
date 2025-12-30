import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["pl", "en"] as const;
const DEFAULT_LOCALE = "en";
const COOKIE_NAME = "joga_locale";

function getLocaleFromAcceptLanguage(headerValue: string | null): "pl" | "en" {
  if (!headerValue) return DEFAULT_LOCALE;
  // Very simple parse: if any language tag starts with "pl", pick "pl"
  const lower = headerValue.toLowerCase();
  return lower.includes("pl") ? "pl" : "en";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignore Next.js internals and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // If URL already contains locale prefix, do nothing
  const hasLocalePrefix = LOCALES.some((loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`));
  if (hasLocalePrefix) {
    return NextResponse.next();
  }

  // Only auto-redirect on the root or on paths without locale
  // (Here we redirect for any path without locale prefix.)
  const cookieLocale = req.cookies.get(COOKIE_NAME)?.value;
  const localeFromCookie = (cookieLocale === "pl" || cookieLocale === "en") ? cookieLocale : null;

  const locale =
    localeFromCookie ?? getLocaleFromAcceptLanguage(req.headers.get("accept-language"));

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const res = NextResponse.redirect(url);

  // Persist decision (especially important if chosen from Accept-Language)
  res.cookies.set(COOKIE_NAME, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });

  return res;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
