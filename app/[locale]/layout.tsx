import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import { SUPPORTED_LOCALES, getContent } from "@/content";

import "../globals.css";

type Locale = (typeof SUPPORTED_LOCALES)[number];

type LayoutParams = Promise<{
  locale: string;
}>;

type LocaleLayoutProps = {
  children: ReactNode;
  params: LayoutParams;
};

const metadataMap: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "joga.yoga — a calm gateway for Polish yoga listings",
    description:
      "Discover wyjazdy.yoga and wydarzenia.yoga — native-language platforms that connect international yoga organizers with the Polish community.",
  },
  pl: {
    title: "joga.yoga — spokojna brama do polskich ogłoszeń jogowych",
    description:
      "Poznaj wyjazdy.yoga i wydarzenia.yoga — natywne platformy, które łączą organizatorów z całego świata z polską społecznością jogi.",
  },
};

function resolveLocale(rawLocale: string): Locale {
  return SUPPORTED_LOCALES.includes(rawLocale as Locale) ? (rawLocale as Locale) : "en";
}

export async function generateMetadata({ params }: { params: LayoutParams }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const { title, description } = metadataMap[locale];
  const url = `https://joga.yoga/${locale}`;

  return {
    title,
    description,
    metadataBase: new URL("https://joga.yoga"),
    alternates: {
      canonical: url,
      languages: {
        en: "https://joga.yoga/en",
        pl: "https://joga.yoga/pl",
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: "joga.yoga",
      locale: locale === "pl" ? "pl_PL" : "en_US",
      title,
      description,
      images: [
        {
          url: "/social/og-default.webp",
          width: 1200,
          height: 630,
          alt: "joga.yoga open graph image",
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const content = getContent(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn("bg-surface text-foreground antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} content={content} />
        </ThemeProvider>
      </body>
    </html>
  );
}
