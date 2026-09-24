import { Link, createFileRoute } from "@tanstack/react-router";
import { CTAStrip, PageHero, PlaceholderNote, Section, SectionHeading, Tag } from "@/components/site/primitives";
import { academia } from "@/data/ecosystem";

export const Route = createFileRoute("/universidades")({
  head: () => ({
    meta: [
      { title: "Universidades y academia — Distrito Nortech" },
      {
        name: "description",
        content:
          "Universidades, grupos de investigación y centros de I+D+i de Norte de Santander conectados con el ecosistema de innovación.",
      },
      { property: "og:title", content: "Universidades y academia — Distrito Nortech" },
      { property: "og:description", content: "Academia, investigación y transferencia de conocimiento en la región." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: UniversidadesPage,
});

const CAPABILITIES = [
  { title: "Formación", text: "Programas técnicos, profesionales y de posgrado que forman el talento de la región." },
  { title: "Investigación", text: "Grupos y semilleros que producen conocimiento aplicable al territorio." },
  { title: "Transferencia", text: "Puentes entre laboratorio y empresa: prototipos, licencias y spin-offs." },
];

function UniversidadesPage() {
  return (
    <>
      <PageHero
        breadcrumb="Universidades"
        eyebrow="Academia"
        title="El conocimiento que sostiene al ecosistema."
        description="Universidades y centros de investigación que forman talento, generan conocimiento y lo llevan al territorio."
      />

      <Section>
        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <div key={c.title} className="bg-card p-8">
              <span className="font-display text-sm text-primary">0{i + 1}</span>
              <h2 className="mt-4 font-display text-xl font-semibold">{c.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Directorio" title="Instituciones de educación superior e investigación" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {academia.map((o) => (
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
                {o.sectors.map((s) => (
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
        title="¿Tu universidad o grupo de investigación hace parte?"
        primary={{ label: "Registrar institución", to: "/haz-parte" }}
        secondary={{ label: "Ver retos regionales", to: "/retos" }}
      />
    </>
  );
}
