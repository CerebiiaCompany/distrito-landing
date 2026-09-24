import { Link, createFileRoute } from "@tanstack/react-router";
import { CTAStrip, PageHero, PlaceholderNote, Section, SectionHeading, Tag } from "@/components/site/primitives";
import { institutions } from "@/data/ecosystem";

export const Route = createFileRoute("/instituciones")({
  head: () => ({
    meta: [
      { title: "Instituciones y gremios — Distrito Nortech" },
      {
        name: "description",
        content:
          "Entidades públicas, gremios, cámaras y comunidades que impulsan la innovación y el emprendimiento en Norte de Santander.",
      },
      { property: "og:title", content: "Instituciones y gremios — Distrito Nortech" },
      { property: "og:description", content: "Sector público, gremios y comunidades del ecosistema regional." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InstitucionesPage,
});

const ROLES = [
  { title: "Política pública", text: "Instrumentos, incentivos y marcos que habilitan la innovación regional." },
  { title: "Articulación", text: "Espacios donde empresa, academia y comunidad se encuentran." },
  { title: "Financiación", text: "Convocatorias y recursos públicos para proyectos con impacto territorial." },
];

function InstitucionesPage() {
  return (
    <>
      <PageHero
        breadcrumb="Instituciones"
        eyebrow="Sector público y gremios"
        title="Las reglas y los recursos que habilitan el ecosistema."
        description="Entidades, gremios y comunidades que crean las condiciones para que la innovación ocurra."
      />

      <Section>
        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {ROLES.map((r, i) => (
            <div key={r.title} className="bg-card p-8">
              <span className="font-display text-sm text-primary">0{i + 1}</span>
              <h2 className="mt-4 font-display text-xl font-semibold">{r.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Directorio" title="Instituciones, gremios y comunidades" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {institutions.map((o) => (
            <Link
              key={o.id}
              to="/ecosistema/$slug"
              params={{ slug: o.slug }}
              className="hover-lift border border-border bg-card p-6 hover:-translate-y-0.5 hover:border-primary/60"
            >
              <span className="text-[11px] tracking-wider text-primary uppercase">{o.type}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{o.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{o.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {o.services.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
              <p className="mt-5 text-xs text-muted-foreground">{o.city}</p>
            </Link>
          ))}
        </div>
        <PlaceholderNote />
      </Section>

      <CTAStrip
        title="¿Representas una entidad o gremio?"
        primary={{ label: "Sumar la entidad", to: "/haz-parte" }}
        secondary={{ label: "Publicar un reto", to: "/retos" }}
      />
    </>
  );
}
