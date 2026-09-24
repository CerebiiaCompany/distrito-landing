import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CTAStrip, PageHero, PlaceholderNote, Section, Tag } from "@/components/site/primitives";
import { opportunities } from "@/data/ecosystem";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/oportunidades")({
  head: () => ({
    meta: [
      { title: "Oportunidades — Distrito Nortech" },
      {
        name: "description",
        content:
          "Convocatorias, eventos, empleo, inversión y programas abiertos para el ecosistema de Norte de Santander.",
      },
      { property: "og:title", content: "Oportunidades — Distrito Nortech" },
      { property: "og:description", content: "Todo lo que está abierto hoy en el ecosistema regional." },
    ],
  }),
  component: OportunidadesPage,
});

const TABS = ["Todas", "Convocatorias", "Eventos", "Empleo", "Inversión", "Formación", "Programas"] as const;

function OportunidadesPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Todas");
  const list = opportunities.filter((o) => tab === "Todas" || o.category === tab);

  return (
    <>
      <PageHero
        breadcrumb="Oportunidades"
        eyebrow="Hub de oportunidades"
        title="Todo lo que está abierto hoy en el ecosistema."
        description="Un solo lugar para encontrar convocatorias, eventos, empleo, inversión, formación y programas."
      />

      <Section>
        <div className="flex flex-wrap gap-2 border-b border-border pb-4">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "border px-4 py-2 text-sm transition-colors",
                tab === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary hover:text-primary",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {list.map((o) => (
            <article key={o.id} className="hover-lift flex flex-col border border-border bg-card p-6 hover:border-primary/60">
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-wider text-primary uppercase">{o.category}</span>
                <Tag>{o.status}</Tag>
              </div>
              <h2 className="mt-3 font-display text-lg font-semibold">{o.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{o.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {o.audience.map((a) => (
                  <Tag key={a}>{a}</Tag>
                ))}
              </div>
              <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
                {o.organization} · {o.location} · Cierre {o.deadline}
              </p>
            </article>
          ))}
        </div>
        {list.length === 0 ? (
          <p className="mt-10 text-sm text-muted-foreground">
            No hay oportunidades publicadas en esta categoría por ahora.
          </p>
        ) : null}
        <PlaceholderNote />
      </Section>

      <CTAStrip
        title="¿Tienes una oportunidad para el ecosistema?"
        primary={{ label: "Publicar oportunidad", to: "/haz-parte" }}
        secondary={{ label: "Ver convocatorias", to: "/convocatorias" }}
      />
    </>
  );
}
