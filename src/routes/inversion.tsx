import { Link, createFileRoute } from "@tanstack/react-router";
import { CTAStrip, PageHero, PlaceholderNote, Section, SectionHeading, Tag } from "@/components/site/primitives";
import { opportunities, organizations } from "@/data/ecosystem";

export const Route = createFileRoute("/inversion")({
  head: () => ({
    meta: [
      { title: "Inversión — Distrito Nortech" },
      {
        name: "description",
        content:
          "Inversionistas, fondos y oportunidades de inversión conectados con startups y empresas de Norte de Santander.",
      },
      { property: "og:title", content: "Inversión — Distrito Nortech" },
      { property: "og:description", content: "Capital y oportunidades para el ecosistema regional." },
    ],
  }),
  component: InversionPage,
});

function InversionPage() {
  const investors = organizations.filter((o) => o.type === "Inversionista");
  const deals = opportunities.filter((o) => o.category === "Inversión");

  return (
    <>
      <PageHero
        breadcrumb="Inversión"
        eyebrow="Capital"
        title="Capital que impulsa proyectos con impacto regional."
        description="Conectamos empresas y startups del nororiente con inversionistas, fondos y mecanismos de financiación."
      />

      <Section>
        <SectionHeading eyebrow="Inversionistas" title="Actores de inversión del ecosistema" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {investors.map((o) => (
            <Link
              key={o.id}
              to="/ecosistema/$slug"
              params={{ slug: o.slug }}
              className="hover-lift border border-border bg-card p-6 hover:-translate-y-0.5 hover:border-primary/60"
            >
              <span className="text-[11px] tracking-wider text-primary uppercase">{o.type}</span>
              <h3 className="mt-2 font-display text-lg font-semibold">{o.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{o.description}</p>
            </Link>
          ))}
        </div>
        <PlaceholderNote />
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Oportunidades" title="Convocatorias de inversión" />
        <div className="mt-8 divide-y divide-border border-y border-border">
          {deals.map((d) => (
            <div key={d.id} className="flex flex-wrap items-center justify-between gap-4 py-5">
              <div>
                <p className="font-medium">{d.title}</p>
                <p className="text-xs text-muted-foreground">
                  {d.organization} · Cierre {d.deadline}
                </p>
              </div>
              <Tag>{d.status}</Tag>
            </div>
          ))}
        </div>
      </Section>

      <CTAStrip
        title="¿Inviertes en tecnología y empresas de la región?"
        primary={{ label: "Sumarme como inversionista", to: "/haz-parte" }}
        secondary={{ label: "Ver startups", to: "/startups" }}
      />
    </>
  );
}
