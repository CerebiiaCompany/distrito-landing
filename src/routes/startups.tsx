import { Link, createFileRoute } from "@tanstack/react-router";
import { CTAStrip, PageHero, PlaceholderNote, Section, SectionHeading, Tag } from "@/components/site/primitives";
import { startups } from "@/data/ecosystem";
import { STAGES } from "@/data/taxonomy";

export const Route = createFileRoute("/startups")({
  head: () => ({
    meta: [
      { title: "Startups — Distrito Nortech" },
      {
        name: "description",
        content:
          "Startups que están construyendo desde Norte de Santander: etapa, sector, tecnología y cómo conectar con ellas.",
      },
      { property: "og:title", content: "Startups — Distrito Nortech" },
      { property: "og:description", content: "Emprendimientos tecnológicos de Norte de Santander." },
    ],
  }),
  component: StartupsPage,
});

function StartupsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Startups"
        eyebrow="Emprendimiento"
        title="Startups que están construyendo desde el nororiente."
        description="Ideas que se convierten en producto, producto que se convierte en empresa y empresa que transforma el territorio."
      />

      <Section>
        <SectionHeading eyebrow="Etapas" title="El camino de una startup" description="Cada etapa necesita apoyos distintos: validación, tracción, escalamiento e inversión." />
        <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {STAGES.map((s, i) => (
            <div key={s} className="bg-card p-5">
              <span className="font-display text-sm text-primary">0{i + 1}</span>
              <p className="mt-3 font-medium">{s}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Directorio de startups" title="Startups del ecosistema" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {startups.map((o) => (
            <Link
              key={o.id}
              to="/ecosistema/$slug"
              params={{ slug: o.slug }}
              className="hover-lift flex flex-col border border-border bg-card p-6 hover:-translate-y-0.5 hover:border-primary/60"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-wider text-primary uppercase">{o.type}</span>
                {o.stage ? <Tag>{o.stage}</Tag> : null}
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold">{o.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{o.description}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
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
        title="¿Tienes una startup en Norte de Santander?"
        description="Regístrala en el ecosistema para ganar visibilidad, conectar con aliados y acceder a oportunidades."
        primary={{ label: "Registrar mi startup", to: "/haz-parte" }}
        secondary={{ label: "Ver oportunidades", to: "/oportunidades" }}
      />
    </>
  );
}
