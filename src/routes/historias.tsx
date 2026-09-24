import { createFileRoute } from "@tanstack/react-router";
import { CTAStrip, PageHero, PlaceholderNote, Section, SectionHeading, Tag } from "@/components/site/primitives";
import { stories } from "@/data/ecosystem";

export const Route = createFileRoute("/historias")({
  head: () => ({
    meta: [
      { title: "Historias y casos de éxito — Distrito Nortech" },
      {
        name: "description",
        content:
          "Historias reales del ecosistema de Norte de Santander: aprendizajes, casos de éxito y trayectorias de quienes construyen región.",
      },
      { property: "og:title", content: "Historias y casos de éxito — Distrito Nortech" },
      { property: "og:description", content: "Aprendizajes y trayectorias del ecosistema regional." },
    ],
  }),
  component: HistoriasPage,
});

function HistoriasPage() {
  const [lead, ...rest] = stories;
  if (!lead) return null;

  return (
    <>
      <PageHero
        breadcrumb="Historias"
        eyebrow="Editorial"
        title="Historias que inspiran a la región."
        description="Detrás de cada empresa, proyecto o comunidad hay personas tomando decisiones difíciles. Estas son sus historias."
      />

      <Section>
        <article className="grid gap-8 border-y border-border py-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Tag>{lead.category}</Tag>
            <h2 className="mt-4 font-display text-3xl leading-tight font-semibold md:text-4xl">{lead.title}</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">{lead.excerpt}</p>
          </div>
          <div className="flex items-end text-xs text-muted-foreground md:justify-end">
            {lead.author} · {lead.date} · {lead.readingTime}
          </div>
        </article>

        <SectionHeading eyebrow="Más historias" title="Todas las historias" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((s) => (
            <article key={s.id} className="hover-lift flex flex-col border border-border bg-card p-6 hover:-translate-y-0.5 hover:border-primary/60">
              <Tag>{s.category}</Tag>
              <h3 className="mt-4 font-display text-xl leading-snug font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.excerpt}</p>
              <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
                {s.author} · {s.date} · {s.readingTime}
              </p>
            </article>
          ))}
        </div>
        <PlaceholderNote />
      </Section>

      <CTAStrip
        title="¿Tienes una historia para contar?"
        primary={{ label: "Proponer historia", to: "/contacto" }}
        secondary={{ label: "Escuchar el podcast", to: "/podcast" }}
      />
    </>
  );
}
