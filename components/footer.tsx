import Link from "next/link";

import { Container } from "@/components/ui/container";
import type { Locale } from "@/content";
import { getContent } from "@/content";

type FooterProps = {
  locale: Locale;
  content: ReturnType<typeof getContent>;
};

const FOOTER_COPY: Record<Locale, { privacy: string; contact: string }> = {
  en: {
    privacy: "Privacy",
    contact: "Contact",
  },
  pl: {
    privacy: "Prywatność",
    contact: "Kontakt",
  },
};

export function Footer({ locale, content }: FooterProps) {
  const copy = FOOTER_COPY[locale];

  return (
    <footer className="border-t border-border/70 py-10 text-sm text-muted-foreground">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <span>{content.footer.smallprint}</span>
        <div className="flex items-center gap-4">
          <Link
            href="mailto:hello@joga.yoga" target="_blank"
            className="transition-colors hover:text-foreground"
          >
            {copy.contact}
          </Link>
          <Link href={`/${locale}`} className="transition-colors hover:text-foreground">
            {copy.privacy}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
