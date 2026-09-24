import { createFileRoute } from "@tanstack/react-router";
import { CTAStrip, PageHero, PlaceholderNote, Section, SectionHeading, Tag } from "@/components/site/primitives";
import { challenges } from "@/data/ecosystem";

export const Route = createFileRoute("/retos")({
  head: () => ({
    meta: [
      { title: "Retos regionales — Distrito Nortech" },
      {
        name: "description",
        content:
          "Retos abiertos de Norte de Santander: problemas reales del territorio y de las empresas que buscan soluciones del ecosistema.",
      },
      { property: "og:title", content: "Retos regionales — Distrito Nortech" },
      { property: "og:description", content: "Problemas reales de la región abiertos a soluciones del ecosistema." },
    ],
  }),
  component: RetosPage,
});

function RetosPage() {
  return (
    <>
      <PageHero
        breadcrumb="Retos regionales"
        eyebrow="Innovación abierta"
        title="Los grandes retos necesitan nuevas soluciones."
        description="Cada reto describe un problema real, su contexto, los datos disponibles y el objetivo esperado."
      />

      <Section>
        <div className="space-y-6">
          {challenges.map((c) => (
            <article key={c.id} className="hover-lift border border-border bg-card p-7 hover:border-primary/60">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] tracking-wider text-primary uppercase">{c.area}</span>
                <Tag>{c.status}</Tag>
              </div>
              <h2 className="mt-3 font-display text-2xl font-semibold">{c.title}</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {[
                  { label: "Problema", value: c.problem },
                  { label: "Contexto", value: c.context },
                  { label: "Datos disponibles", value: c.data },
                  { label: "Objetivo", value: c.objective },
                ].map((b) => (
                  <div key={b.label}>
                    <p className="eyebrow text-foreground/60">{b.label}</p>
                    <p className="mt-1.5 text-sm text-muted-foreground">{b.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5 text-xs text-muted-foreground">
                <span>
                  {c.owner} · Cierre {c.deadline}
                </span>
                <span>{c.solutionsReceived} soluciones recibidas</span>
              </div>
            </article>
          ))}
        </div>
        <PlaceholderNote />
      </Section>

      <CTAStrip
        title="¿Tu organización tiene un reto que resolver?"
        description="Publícalo y conecta con startups, grupos de investigación y talento del ecosistema."
        primary={{ label: "Proponer un reto", to: "/haz-parte" }}
        secondary={{ label: "Ver innovación", to: "/innovacion" }}
      />
    </>
  );
}
