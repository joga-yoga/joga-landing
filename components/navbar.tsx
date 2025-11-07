"use client";

import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { LocaleSwitch } from "@/components/locale-switch";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Locale } from "@/content";

type NavbarProps = {
  locale: Locale;
};

export function Navbar({ locale }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <Container className="flex items-center justify-between py-4">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 text-lg font-semibold tracking-tight text-foreground"
        >
          <span className="relative h-6 w-[7.5rem] text-foreground sm:h-8">
            <Image
              src="/icons/logo-joga.svg"
              alt="joga.yoga"
              width={120}
              height={32}
              className="h-full w-auto text-inherit"
              priority
            />
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <LocaleSwitch currentLocale={locale} />
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
