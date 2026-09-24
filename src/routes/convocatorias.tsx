import { createFileRoute } from "@tanstack/react-router";
import { CTAStrip, PageHero, PlaceholderNote, Section, SectionHeading, Tag } from "@/components/site/primitives";
import { opportunities } from "@/data/ecosystem";

export const Route = createFileRoute("/convocatorias")({
  head: () => ({
    meta: [
      { title: "Convocatorias — Distrito Nortech" },
      {
        name: "description",
        content:
          "Convocatorias abiertas de financiación, aceleración y programas para startups, empresas y talento de Norte de Santander.",
      },
      { property: "og:title", content: "Convocatorias — Distrito Nortech" },
      { property: "og:description", content: "Convocatorias abiertas para el ecosistema regional." },
    ],
  }),
  component: ConvocatoriasPage,
});

function ConvocatoriasPage() {
  const list = opportunities.filter((o) => o.category === "Convocatorias" || o.category === "Programas");

  return (
    <>
      <PageHero
        breadcrumb="Convocatorias"
        eyebrow="Convocatorias"
        title="Recursos y programas abiertos para el ecosistema."
        description="Consulta requisitos, público objetivo y fechas de cierre de cada convocatoria."
      />

      <Section>
        <SectionHeading eyebrow="Abiertas" title="Convocatorias vigentes" />
        <div className="mt-10 divide-y divide-border border-y border-border">
          {list.map((o) => (
            <article key={o.id} className="grid gap-4 py-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <span className="text-[11px] tracking-wider text-primary uppercase">{o.organization}</span>
                <h2 className="mt-1 font-display text-xl font-semibold">{o.title}</h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{o.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {o.audience.map((a) => (
                    <Tag key={a}>{a}</Tag>
                  ))}
                </div>
              </div>
              <div className="text-left md:text-right">
                <Tag>{o.status}</Tag>
                <p className="mt-2 text-xs text-muted-foreground">Cierre {o.deadline}</p>
              </div>
            </article>
          ))}
        </div>
        <PlaceholderNote />
      </Section>

      <CTAStrip
        title="¿Tu entidad abre una convocatoria?"
        primary={{ label: "Publicar convocatoria", to: "/haz-parte" }}
        secondary={{ label: "Ver todas las oportunidades", to: "/oportunidades" }}
      />
    </>
  );
}
