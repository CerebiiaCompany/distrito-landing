import { createFileRoute } from "@tanstack/react-router";
import { PlayCircle } from "lucide-react";
import { CTAStrip, PageHero, PlaceholderNote, Section, SectionHeading, Tag } from "@/components/site/primitives";
import { videos } from "@/data/ecosystem";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos — Distrito Nortech" },
      {
        name: "description",
        content:
          "Contenido audiovisual del ecosistema: entrevistas, coberturas de eventos y cápsulas de innovación de Norte de Santander.",
      },
      { property: "og:title", content: "Videos — Distrito Nortech" },
      { property: "og:description", content: "Contenido audiovisual del ecosistema TECH regional." },
    ],
  }),
  component: VideosPage,
});

function VideosPage() {
  return (
    <>
      <PageHero
        breadcrumb="Videos"
        eyebrow="Contenido"
        title="El ecosistema, en imágenes."
        description="Entrevistas, coberturas y cápsulas que muestran lo que está pasando en la región."
      />

      <Section>
        <SectionHeading eyebrow="Galería" title="Videos del ecosistema" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <article key={v.id} className="hover-lift border border-border bg-card hover:border-primary/60">
              <div className="relative flex aspect-video items-center justify-center border-b border-border bg-ink text-ink-foreground">
                <div className="grid-nodes-ink absolute inset-0 opacity-40" aria-hidden />
                <PlayCircle className="relative h-10 w-10 text-primary" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] tracking-wider text-primary uppercase">{v.category}</span>
                  <Tag>{v.source}</Tag>
                </div>
                <h3 className="mt-2 font-display text-lg leading-snug font-semibold">{v.title}</h3>
                <p className="mt-3 text-xs text-muted-foreground">
                  {v.duration} · {v.date}
                </p>
              </div>
            </article>
          ))}
        </div>
        <PlaceholderNote>
          Las miniaturas y los reproductores se conectarán a los canales oficiales del ecosistema.
        </PlaceholderNote>
      </Section>

      <CTAStrip
        title="¿Tienes contenido para el ecosistema?"
        primary={{ label: "Compartir contenido", to: "/contacto" }}
        secondary={{ label: "Escuchar el podcast", to: "/podcast" }}
      />
    </>
  );
}
