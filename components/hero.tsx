"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const HERO_IMAGES = {
  light: {
    src: "/images/hero-light.webp",
    alt: "Light theme hero illustration",
  },
  dark: {
    src: "/images/hero-dark.webp",
    alt: "Dark theme hero illustration",
  },
};

const HERO_IMAGE_DIMENSIONS = {
  width: 1440,
  height: 900,
};

export type HeroProps = {
  badge: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function Hero({ badge, title, description, primaryCta, secondaryCta }: HeroProps) {
  const { resolvedTheme } = useTheme();
  const heroImage = resolvedTheme === "dark" ? HERO_IMAGES.dark : HERO_IMAGES.light;

  return (
    <section className="relative overflow-hidden pb-16 pt-20 sm:pt-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {badge}
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{title}</h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild href={primaryCta.href}>
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
            {secondaryCta ? (
              <Button asChild href={secondaryCta.href} variant="ghost">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            ) : null}
          </div>
        </div>
        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-[32rem] overflow-hidden rounded-2xl shadow-soft">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              width={HERO_IMAGE_DIMENSIONS.width}
              height={HERO_IMAGE_DIMENSIONS.height}
              sizes="(max-width: 768px) 100vw, 1440px"
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
