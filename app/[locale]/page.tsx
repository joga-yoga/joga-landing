import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/content";
import { SUPPORTED_LOCALES, getContent } from "@/content";

const HERO_IMAGE = "/images/hero-flower.svg";
const RETREATS_IMAGE = "/images/retreats.svg";
const EVENTS_IMAGE = "/images/events.svg";

type PageParams = Promise<{
  locale: string;
}>;

type LandingPageProps = {
  params: PageParams;
};

function resolveLocale(rawLocale: string): Locale {
  return SUPPORTED_LOCALES.includes(rawLocale as Locale) ? (rawLocale as Locale) : "en";
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const content = getContent(locale);

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-20 sm:pt-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              joga.yoga
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {content.hero.title}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {content.hero.text}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild href="mailto:hello@joga.yoga">
                <Link href="mailto:hello@joga.yoga">{content.hero.cta}</Link>
              </Button>
              <Button asChild href={`/${locale}#projects`} variant="ghost">
                <Link href={`/${locale}#projects`}>wyjazdy.yoga & wydarzenia.yoga</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative h-64 w-64 sm:h-72 sm:w-72">
              <Image
                src={HERO_IMAGE}
                alt="Soft floral illustration"
                fill
                sizes="(min-width: 1024px) 288px, 256px"
                className="drop-shadow-xl"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      <section id="projects" className="bg-muted/40 py-16 sm:py-24">
        <Container className="space-y-10">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {locale === "pl" ? "Nasze platformy" : "Our platforms"}
            </h2>
            <p className="text-base text-muted-foreground sm:text-lg">
              {locale === "pl"
                ? "Dwie specjalistyczne przestrzenie pomagają organizatorom i praktykom spotkać się w zaufanym, polskim środowisku."
                : "Two dedicated spaces help organizers and practitioners meet in a trusted, native Polish environment."}
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="group flex h-full flex-col justify-between rounded-3xl border border-border/60 bg-surface p-8 shadow-soft transition-shadow hover:shadow-soft-strong">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">
                    {content.wyjazdy.title}
                  </h3>
                  <Image
                    src={RETREATS_IMAGE}
                    alt="Retreat icon"
                    width={64}
                    height={64}
                    className="text-muted-foreground"
                  />
                </div>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {content.wyjazdy.lead}
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {content.wyjazdy.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-accent/80" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild href={content.wyjazdy.link} className="mt-8 w-full">
                <Link href={content.wyjazdy.link} target="_blank" rel="noreferrer">
                  {content.wyjazdy.cta}
                </Link>
              </Button>
            </article>
            <article className="group flex h-full flex-col justify-between rounded-3xl border border-border/60 bg-surface p-8 shadow-soft transition-shadow hover:shadow-soft-strong">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">
                    {content.wydarzenia.title}
                  </h3>
                  <Image
                    src={EVENTS_IMAGE}
                    alt="Events icon"
                    width={64}
                    height={64}
                    className="text-muted-foreground"
                  />
                </div>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {content.wydarzenia.lead}
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {content.wydarzenia.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-accent/80" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild href={content.wydarzenia.link} className="mt-8 w-full">
                <Link href={content.wydarzenia.link} target="_blank" rel="noreferrer">
                  {content.wydarzenia.cta}
                </Link>
              </Button>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}


export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}
