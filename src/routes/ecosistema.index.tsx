import { createFileRoute, Link } from "@tanstack/react-router";
import { NodeNetwork } from "@/components/NodeNetwork";
import { CTAStrip, PageHero, Section, SectionHeading, Tag } from "@/components/site/primitives";
import { organizations } from "@/data/ecosystem";
import { ORGANIZATION_TYPES } from "@/data/taxonomy";

export const Route = createFileRoute("/ecosistema/")({
  head: () => ({
    meta: [
      { title: "Ecosistema — Distrito Nortech" },
      {
        name: "description",
        content:
          "El mapa de actores del ecosistema de innovación de Norte de Santander: startups, empresas, academia, inversión, comunidades e instituciones.",
      },
      { property: "og:title", content: "Ecosistema — Distrito Nortech" },
      {
        property: "og:description",
        content: "Startups, empresas, academia, inversión, comunidades e instituciones de Norte de Santander.",
      },
    ],
  }),
  component: EcosistemaPage,
});

function EcosistemaPage() {
  return (
    <>
      <PageHero
        breadcrumb="Ecosistema"
        eyebrow="Todo está conectado"
        title="Un ecosistema es una red, no una lista."
        description="Distrito Nortech articula a quienes generan conocimiento, empresa, tecnología y oportunidades en Norte de Santander."
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="text-foreground">
            <NodeNetwork />
          </div>
          <div>
            <SectionHeading
              eyebrow="Actores"
              title="Cada nodo cumple un rol dentro del ecosistema."
              description="Explora por tipo de actor y encuentra con quién conectar según lo que estés buscando."
            />
            <div className="mt-8 flex flex-wrap gap-2">
              {ORGANIZATION_TYPES.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <Link
              to="/directorio"
       className="mt-8 inline-block btn-cta px-6 py-3 text-sm font-medium "
            >
              Explorar el directorio
            </Link>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Actores destacados" title="Perfiles del ecosistema" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {organizations.slice(0, 6).map((o) => (
            <Link
              key={o.id}
              to="/ecosistema/$slug"
              params={{ slug: o.slug }}
              className="hover-lift border border-border bg-card p-6 hover:-translate-y-0.5 hover:border-primary/60"
            >
              <span className="text-[11px] tracking-wider text-primary uppercase">{o.type}</span>
              <h3 className="mt-2 font-display text-lg font-semibold">{o.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{o.description}</p>
              <p className="mt-4 text-xs text-muted-foreground">{o.city}</p>
            </Link>
          ))}
        </div>
      </Section>

      <CTAStrip
        title="¿Tu organización todavía no está en el mapa?"
        primary={{ label: "Hacer parte", to: "/haz-parte" }}
        secondary={{ label: "Ver el mapa", to: "/mapa" }}
      />
    </>
  );
}
