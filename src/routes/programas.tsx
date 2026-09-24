import { createFileRoute } from "@tanstack/react-router";
import { CTAStrip, PageHero, PlaceholderNote, Section, SectionHeading, Tag } from "@/components/site/primitives";
import { opportunities } from "@/data/ecosystem";

export const Route = createFileRoute("/programas")({
  head: () => ({
    meta: [
      { title: "Programas de acompañamiento — Distrito Nortech" },
      {
        name: "description",
        content:
          "Incubación, aceleración y rutas de formación para startups, empresas y talento de Norte de Santander.",
      },
      { property: "og:title", content: "Programas de acompañamiento — Distrito Nortech" },
      { property: "og:description", content: "Rutas de incubación, aceleración y formación del ecosistema regional." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgramasPage,
});

const ROUTES = [
  { title: "Ideación", text: "Validación de problema, cliente y propuesta de valor." },
  { title: "Incubación", text: "Del prototipo al primer producto en el mercado." },
  { title: "Aceleración", text: "Crecimiento, métricas, inversión y expansión." },
  { title: "Formación continua", text: "Habilidades técnicas y de gestión para el talento regional." },
];

function ProgramasPage() {
  const programs = opportunities.filter((o) => o.category === "Programas" || o.category === "Formación");

  return (
    <>
      <PageHero
        breadcrumb="Programas"
        eyebrow="Acompañamiento"
        title="Rutas para crecer con acompañamiento real."
        description="Programas de incubación, aceleración y formación ofrecidos por los actores del ecosistema."
      />

      <Section>
        <SectionHeading eyebrow="Ruta" title="Del primer paso a la escala" />
        <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {ROUTES.map((r, i) => (
            <div key={r.title} className="bg-card p-6">
              <span className="font-display text-sm text-primary">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Disponibles" title="Programas y formación" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {programs.map((p) => (
            <article key={p.id} className="hover-lift border border-border bg-card p-6 hover:border-primary/60">
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-wider text-primary uppercase">{p.category}</span>
                <Tag>{p.status}</Tag>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              <p className="mt-5 text-xs text-muted-foreground">
                {p.organization} · {p.location} · Cierra {p.deadline}
              </p>
            </article>
          ))}
        </div>
        <PlaceholderNote />
      </Section>

      <CTAStrip
        title="¿Tu organización ofrece un programa?"
        primary={{ label: "Publicar programa", to: "/haz-parte" }}
        secondary={{ label: "Ver todas las oportunidades", to: "/oportunidades" }}
      />
    </>
  );
}
