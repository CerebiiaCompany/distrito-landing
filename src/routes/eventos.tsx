import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";
import { CTAStrip, PageHero, PlaceholderNote, Section, SectionHeading, Tag } from "@/components/site/primitives";
import { events } from "@/data/ecosystem";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos y agenda — Distrito Nortech" },
      {
        name: "description",
        content:
          "Agenda del ecosistema: meetups, hackatones, foros y encuentros de innovación y tecnología en Norte de Santander.",
      },
      { property: "og:title", content: "Eventos y agenda — Distrito Nortech" },
      { property: "og:description", content: "Lo que viene en el ecosistema TECH de Norte de Santander." },
    ],
  }),
  component: EventosPage,
});

function monthLabel(date: string) {
  return new Date(date).toLocaleDateString("es-CO", { month: "long", year: "numeric" });
}

function EventosPage() {
  const grouped = events.reduce<Record<string, typeof events>>((acc, e) => {
    const key = monthLabel(e.date);
    (acc[key] ??= []).push(e);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        breadcrumb="Eventos"
        eyebrow="Agenda"
        title="Lo que viene en el ecosistema."
        description="Encuentros donde el ecosistema se ve la cara: aprender, conectar y construir juntos."
      />

      <Section>
        {Object.entries(grouped).map(([month, list]) => (
          <div key={month} className="mb-14 last:mb-0">
            <SectionHeading eyebrow="Agenda" title={month.charAt(0).toUpperCase() + month.slice(1)} />
            <div className="mt-8 space-y-4">
              {list.map((e) => (
                <article
                  key={e.id}
                  className="hover-lift grid gap-5 border border-border bg-card p-6 hover:border-primary/60 md:grid-cols-[auto_1fr_auto] md:items-center"
                >
                  <div className="border-primary md:border-l-2 md:pl-5">
                    <p className="font-display text-3xl font-semibold">{e.date.slice(8, 10)}</p>
                    <p className="text-[11px] text-muted-foreground uppercase">
                      {new Date(e.date).toLocaleDateString("es-CO", { month: "short" })} · {e.time}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] tracking-wider text-primary uppercase">{e.category}</span>
                    <h3 className="mt-1 font-display text-xl font-semibold">{e.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{e.description}</p>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-primary" /> {e.venue}, {e.city} · {e.organizer}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2 md:items-end">
                    <Tag>{e.speakers.length} invitados</Tag>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" /> Inscripción pendiente
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
        <PlaceholderNote />
      </Section>

      <CTAStrip
        title="¿Organizas un evento del ecosistema?"
        primary={{ label: "Publicar evento", to: "/haz-parte" }}
        secondary={{ label: "Ver oportunidades", to: "/oportunidades" }}
      />
    </>
  );
}
