import { Link, createFileRoute } from "@tanstack/react-router";
import { CTAStrip, PageHero, PlaceholderNote, Section, SectionHeading, Tag } from "@/components/site/primitives";
import { companies } from "@/data/ecosystem";
import { SECTORS } from "@/data/taxonomy";

export const Route = createFileRoute("/empresas")({
  head: () => ({
    meta: [
      { title: "Empresas — Distrito Nortech" },
      {
        name: "description",
        content:
          "Empresas de Norte de Santander que innovan, adoptan tecnología y conectan con talento y emprendimiento regional.",
      },
      { property: "og:title", content: "Empresas — Distrito Nortech" },
      { property: "og:description", content: "Tejido empresarial e innovación en Norte de Santander." },
    ],
  }),
  component: EmpresasPage,
});

function EmpresasPage() {
  return (
    <>
      <PageHero
        breadcrumb="Empresas"
        eyebrow="Tejido empresarial"
        title="Empresas que innovan y crecen con tecnología."
        description="La innovación empresarial es el puente entre el conocimiento y la competitividad de la región."
      />

      <Section>
        <SectionHeading eyebrow="Sectores" title="Sectores del tejido empresarial regional" />
        <div className="mt-8 flex flex-wrap gap-2">
          {SECTORS.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Directorio" title="Empresas del ecosistema" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((o) => (
            <Link
              key={o.id}
              to="/ecosistema/$slug"
              params={{ slug: o.slug }}
              className="hover-lift border border-border bg-card p-6 hover:-translate-y-0.5 hover:border-primary/60"
            >
              <span className="text-[11px] tracking-wider text-primary uppercase">{o.type}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{o.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{o.description}</p>
              <p className="mt-5 text-xs text-muted-foreground">{o.city}</p>
            </Link>
          ))}
        </div>
        <PlaceholderNote />
      </Section>

      <CTAStrip
        title="Conecta tu empresa con el ecosistema de innovación."
        description="Encuentra talento, proveedores tecnológicos, aliados académicos y retos abiertos."
        primary={{ label: "Hacer parte", to: "/haz-parte" }}
        secondary={{ label: "Ver retos regionales", to: "/retos" }}
      />
    </>
  );
}
