"use client";

import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { LocaleSwitch } from "@/components/locale-switch";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Locale } from "@/content";

const NAV_COPY: Record<Locale, { ourProjects: string; contact: string }> = {
  en: {
    ourProjects: "Our projects",
    contact: "Contact",
  },
  pl: {
    ourProjects: "Nasze projekty",
    contact: "Kontakt",
  },
};

type NavbarProps = {
  locale: Locale;
};

export function Navbar({ locale }: NavbarProps) {
  const copy = NAV_COPY[locale];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <Container className="flex items-center justify-between py-4">
        <Link href={`/${locale}`} className="text-lg font-semibold tracking-tight text-foreground">
          joga.yoga
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href={`/${locale}#projects`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {copy.ourProjects}
          </Link>
          <Link
            href="mailto:hello@joga.yoga"
            className="text-muted-foreground transition-colors hover:text-foreground sm:hidden"
          >
            {copy.contact}
          </Link>
          <Button
            asChild
            href="mailto:hello@joga.yoga"
            variant="ghost"
            className="hidden text-sm font-medium sm:inline-flex"
          >
            <Link href="mailto:hello@joga.yoga">{copy.contact}</Link>
          </Button>
          <LocaleSwitch currentLocale={locale} />
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
