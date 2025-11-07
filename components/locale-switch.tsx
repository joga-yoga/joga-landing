"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SUPPORTED_LOCALES, type Locale } from "@/content";
import { cn } from "@/lib/utils";

type LocaleSwitchProps = {
  currentLocale: Locale;
};

export function LocaleSwitch({ currentLocale }: LocaleSwitchProps) {
  const pathname = usePathname();

  const baseSegments = pathname?.split("/") ?? [];

  return (
    <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wide">
      {SUPPORTED_LOCALES.map((locale) => {
        const segments = [...baseSegments];
        if (segments.length > 1) {
          segments[1] = locale;
        } else {
          segments.push(locale);
        }
        const href = segments.join("/") || `/${locale}`;

        return (
          <Link
            key={locale}
            href={href}
            className={cn(
              "transition-colors hover:text-foreground",
              locale === currentLocale ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
