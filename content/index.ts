import { en } from "./en";
import { pl } from "./pl";

export const SUPPORTED_LOCALES = ["en", "pl"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = SUPPORTED_LOCALES[0];

export function resolveLocale(rawLocale: string): Locale {
  return SUPPORTED_LOCALES.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : DEFAULT_LOCALE;
}

const CONTENT_MAP: Record<Locale, typeof en> = {
  en,
  pl,
};

export function getContent(locale: Locale) {
  return CONTENT_MAP[locale];
}
