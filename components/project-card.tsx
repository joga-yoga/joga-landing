import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export type ProjectCardProps = {
  title: string;
  lead: string;
  bullets: string[];
  cta: string;
  href: string;
  imageSrc: string;
  logoSvgSrc: string;
};

const COVER_DIMENSIONS = { width: 1280, height: 720 };
const LOGO_DIMENSIONS = { width: 96, height: 96 };

export function ProjectCard({ title, lead, bullets, cta, href, imageSrc, logoSvgSrc }: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-neutral-200 bg-surface p-8 shadow-soft transition-shadow hover:shadow-soft-strong">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Image
            src={logoSvgSrc}
            alt={`${title} logo`}
            width={LOGO_DIMENSIONS.width}
            height={LOGO_DIMENSIONS.height}
            className="h-26 w-26 text-foreground/80"
            priority={false}
          />
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src={imageSrc}
            alt={`${title} cover image`}
            width={COVER_DIMENSIONS.width}
            height={COVER_DIMENSIONS.height}
            sizes="(max-width: 1024px) 100vw, 640px"
            className="h-auto w-full rounded-2xl object-cover"
          />
        </div>
        <p className="text-base leading-relaxed text-muted-foreground">{lead}</p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                {/* Bullet dot from font */}
                <span
                  className="mt-1 text-lg leading-none text-accent"
                  aria-hidden="true"
                >
                  ·
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
      </div>
      <Button asChild className="w-full">
        <Link href={href} target="_blank" rel="noreferrer">
          {cta}
        </Link>
      </Button>
    </article>
  );
}
