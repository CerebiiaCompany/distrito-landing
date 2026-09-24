import { Link, createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { CTAStrip, PageHero, PlaceholderNote, Section, SectionHeading, Tag } from "@/components/site/primitives";
import { episodes } from "@/data/ecosystem";
import { PODCAST_TAGS } from "@/data/taxonomy";

export const Route = createFileRoute("/podcast/")({
  head: () => ({
    meta: [
      { title: "Voces del NorTech — Podcast del ecosistema" },
      {
        name: "description",
        content:
          "Voces del NorTech: conversaciones con quienes construyen tecnología, empresa e innovación desde Norte de Santander.",
      },
      { property: "og:title", content: "Voces del NorTech — Podcast del ecosistema" },
      { property: "og:description", content: "El podcast del ecosistema TECH de Norte de Santander." },
    ],
  }),
  component: PodcastPage,
});

function PodcastPage() {
  const [featured, ...rest] = episodes;
  if (!featured) return null;

  return (
    <>
      <PageHero
        breadcrumb="Voces del NorTech"
        eyebrow="Podcast"
        title="Las ideas del oriente colombiano se convierten en acción."
        description="Historias, aprendizajes y conversaciones honestas con el ecosistema que está construyendo la región."
      />

      <Section>
        <article className="grid gap-8 border border-border bg-card p-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Tag>Episodio destacado</Tag>
            <h2 className="mt-4 font-display text-3xl leading-tight font-semibold">{featured.title}</h2>
            <p className="mt-3 text-muted-foreground">{featured.description}</p>
            <p className="mt-4 text-sm">
              {featured.guest} · <span className="text-muted-foreground">{featured.role}</span>
            </p>
            <Link
              to="/podcast/$slug"
              params={{ slug: featured.slug }}
       className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 btn-cta px-5 py-3 text-sm font-medium "
            >
              <Play className="h-4 w-4" /> Escuchar episodio
            </Link>
          </div>
          <div className="flex flex-col justify-between border-l border-border pl-8">
            <div className="flex flex-wrap gap-1.5">
              {featured.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <p className="mt-8 text-xs text-muted-foreground">
              Episodio {featured.number} · {featured.duration} · {featured.date}
            </p>
          </div>
        </article>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Episodios" title="Todos los episodios" />
        <div className="mt-10 divide-y divide-border border-y border-border">
          {rest.map((e) => (
            <Link
              key={e.id}
              to="/podcast/$slug"
              params={{ slug: e.slug }}
              className="group flex flex-wrap items-center justify-between gap-4 py-6 transition-colors hover:text-primary"
            >
              <div className="max-w-2xl">
                <span className="text-[11px] tracking-wider text-primary uppercase">Ep. {e.number}</span>
                <h3 className="mt-1 font-display text-xl font-semibold">{e.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {e.guest} · {e.role}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">{e.duration}</span>
            </Link>
          ))}
        </div>
        <PlaceholderNote />
      </Section>

      <Section>
        <SectionHeading eyebrow="Temas" title="De qué hablamos" />
        <div className="mt-8 flex flex-wrap gap-2">
          {PODCAST_TAGS.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </Section>

      <CTAStrip
        title="¿Quieres proponer un invitado o un tema?"
        primary={{ label: "Escríbenos", to: "/contacto" }}
        secondary={{ label: "Ver videos", to: "/videos" }}
      />
    </>
  );
}
