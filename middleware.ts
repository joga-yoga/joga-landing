import { NextRequest, NextResponse } from "next/server";

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./content";

const COOKIE_NAME = "joga_locale";
type Locale = (typeof SUPPORTED_LOCALES)[number];

function isSupportedLocale(value: string | undefined | null): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

function getLocaleFromAcceptLanguage(headerValue: string | null): Locale {
  if (!headerValue) return DEFAULT_LOCALE;
  return headerValue.toLowerCase().includes("pl") ? "pl" : "en";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const hasLocalePrefix = SUPPORTED_LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocalePrefix) {
    return NextResponse.next();
  }

  const cookieLocale = req.cookies.get(COOKIE_NAME)?.value;
  const locale = isSupportedLocale(cookieLocale)
    ? cookieLocale
    : getLocaleFromAcceptLanguage(req.headers.get("accept-language"));

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const res = NextResponse.redirect(url);
  res.cookies.set(COOKIE_NAME, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return res;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
