import { EyeOff, Infinity, LayoutGrid, ListChecks, Sparkles } from "lucide-react";

import type { Locale } from "@/content";

const DECISION_SUPPORT_COPY: Record<Locale, {
  title: string;
  lead: string;
  note: string;
  items: Array<{
    title: string;
    description: string;
  }>;
}> = {
  pl: {
    title: "Publikacja bez ciężkich formularzy",
    lead:
      "AI pomaga wypełnić ogłoszenie, a ujednolicony format ułatwia porównanie ofert. Minimum wysiłku po stronie organizatora — maksimum czytelności po stronie użytkownika.",
    note: "Bez umów i bez ryzyka — ogłoszenie można wyłączyć w dowolnym momencie.",
    items: [
      {
        title: "AI wypełnia szkic ogłoszenia",
        description: "Bez siedzenia godzinami nad polami — wystarczy doprecyzować najważniejsze informacje.",
      },
      {
        title: "Tylko potrzebny zakres danych",
        description: "Optymalny zestaw informacji o wyjeździe lub warsztacie — bez przeładowania i bez braków.",
      },
      {
        title: "Jedna struktura = łatwiejszy wybór",
        description: "Stały układ ogłoszeń ułatwia czytanie, porównywanie i szukanie — dziś i w przyszłości.",
      },
      {
        title: "Pełna kontrola widoczności",
        description: "W każdej chwili można ogłoszenie ukryć lub usunąć. Bez tłumaczeń i bez zobowiązań.",
      },
      {
        title: "Bez prowizji. Bez limitów.",
        description: "Publikacje są bezpłatne i bez ograniczeń liczby ogłoszeń.",
      },
    ],
  },
  en: {
    title: "Publish without heavy forms",
    lead:
      "AI helps prefill your listing, and a consistent format makes offers easier to compare. Less work for organizers — more clarity for users.",
    note: "No lock-in — you can disable a listing whenever you want.",
    items: [
      {
        title: "AI prefills your listing draft",
        description: "No hours spent on complex fields — just review and adjust what matters.",
      },
      {
        title: "Only the data people actually need",
        description: "An optimal set of details for retreats and workshops — not too much, not too little.",
      },
      {
        title: "One structure = faster decisions",
        description: "A consistent layout makes listings easier to read, compare, and search — over time.",
      },
      {
        title: "Full visibility control",
        description: "Hide or delete your listing anytime. No explanations, no lock-in.",
      },
      {
        title: "No commission. No limits.",
        description: "Publishing is free, with no cap on the number of listings.",
      },
    ],
  },
};

const ICONS = [Sparkles, ListChecks, LayoutGrid, EyeOff, Infinity];

export function DecisionSupport({ locale }: { locale: Locale }) {
  const copy = DECISION_SUPPORT_COPY[locale];

  return (
    <div className="mt-12 rounded-3xl border bg-background/80 p-8 shadow-soft sm:mt-16 sm:p-10">
      <div className="space-y-4 sm:space-y-5">
        <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {copy.title}
        </h3>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{copy.lead}</p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {copy.items.map((item, index) => {
          const Icon = ICONS[index];
          const cardClasses = [
            "rounded-2xl border bg-background p-6 shadow-sm",
            index === copy.items.length - 1 ? "lg:col-span-2 xl:col-span-1" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <article key={item.title} className={cardClasses}>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-foreground/80">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-8 text-sm text-muted-foreground">{copy.note}</p>
    </div>
  );
}
