import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/content";
import { SUPPORTED_LOCALES, getContent } from "@/content";

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
      <Hero
        badge="joga.yoga"
        title={content.hero.title}
        description={content.hero.text}
        primaryCta={{ label: content.hero.cta, href: "mailto:hello@joga.yoga" }}
        secondaryCta={{
          label: locale === "pl" ? "Poznaj nasze projekty" : "Explore our projects",
          href: `/${locale}#projects`,
        }}
      />

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
            <ProjectCard
              title={content.wyjazdy.title}
              lead={content.wyjazdy.lead}
              bullets={content.wyjazdy.bullets}
              cta={content.wyjazdy.cta}
              href={content.wyjazdy.link}
              imageSrc="/images/wyjazdy-cover.webp"
              logoSvgSrc="/icons/logo-wyjazdy.svg"
            />
            <ProjectCard
              title={content.wydarzenia.title}
              lead={content.wydarzenia.lead}
              bullets={content.wydarzenia.bullets}
              cta={content.wydarzenia.cta}
              href={content.wydarzenia.link}
              imageSrc="/images/wydarzenia-cover.webp"
              logoSvgSrc="/icons/logo-wydarzenia.svg"
            />
          </div>
        </Container>
      </section>
    </>
  );
}


export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}
