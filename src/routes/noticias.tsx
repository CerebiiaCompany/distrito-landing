import { createFileRoute } from "@tanstack/react-router";
import { CTAStrip, PageHero, PlaceholderNote, Section, SectionHeading, Tag } from "@/components/site/primitives";
import { news } from "@/data/ecosystem";

export const Route = createFileRoute("/noticias")({
  head: () => ({
    meta: [
      { title: "Noticias del ecosistema — Distrito Nortech" },
      {
        name: "description",
        content:
          "Actualidad del ecosistema de ciencia, tecnología, innovación y emprendimiento de Norte de Santander.",
      },
      { property: "og:title", content: "Noticias del ecosistema — Distrito Nortech" },
      { property: "og:description", content: "Lo que está pasando en el ecosistema de Norte de Santander." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NoticiasPage,
});

function NoticiasPage() {
  const [lead, ...rest] = news;

  return (
    <>
      <PageHero
        breadcrumb="Noticias"
        eyebrow="Actualidad"
        title="Lo que está pasando en el ecosistema."
        description="Anuncios, convocatorias, alianzas y avances de los actores de Norte de Santander."
      />

      <Section>
        {lead && (
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
        )}

        <SectionHeading eyebrow="Más noticias" title="Últimas publicaciones" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((n) => (
            <article
              key={n.id}
              className="hover-lift flex flex-col border border-border bg-card p-6 hover:-translate-y-0.5 hover:border-primary/60"
            >
              <Tag>{n.category}</Tag>
              <h3 className="mt-4 font-display text-xl leading-snug font-semibold">{n.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
              <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
                {n.author} · {n.date} · {n.readingTime}
              </p>
            </article>
          ))}
        </div>
        <PlaceholderNote />
      </Section>

      <CTAStrip
        title="¿Tienes un anuncio para el ecosistema?"
        primary={{ label: "Enviar noticia", to: "/contacto" }}
        secondary={{ label: "Leer historias", to: "/historias" }}
      />
    </>
  );
}
