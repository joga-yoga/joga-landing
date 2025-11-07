import { en } from "./en";
import { pl } from "./pl";

export const SUPPORTED_LOCALES = ["en", "pl"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

const CONTENT_MAP: Record<Locale, typeof en> = {
  en,
  pl,
};

export function getContent(locale: Locale) {
  return CONTENT_MAP[locale];
}
