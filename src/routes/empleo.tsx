import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CTAStrip, PageHero, PlaceholderNote, Section, SectionHeading, Tag } from "@/components/site/primitives";
import { opportunities } from "@/data/ecosystem";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/empleo")({
  head: () => ({
    meta: [
      { title: "Empleo tech — Distrito Nortech" },
      {
        name: "description",
        content:
          "Vacantes de tecnología, datos, diseño y producto en Norte de Santander. Conecta tu talento con las empresas del ecosistema.",
      },
      { property: "og:title", content: "Empleo tech — Distrito Nortech" },
      { property: "og:description", content: "Vacantes tecnológicas del ecosistema de Norte de Santander." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmpleoPage,
});

function EmpleoPage() {
  const jobs = useMemo(() => opportunities.filter((o) => o.category === "Empleo"), []);
  const cities = useMemo(
    () => ["Todas", ...Array.from(new Set(jobs.map((j) => j.location)))],
    [jobs],
  );
  const [city, setCity] = useState("Todas");
  const list = city === "Todas" ? jobs : jobs.filter((j) => j.location === city);

  return (
    <>
      <PageHero
        breadcrumb="Empleo"
        eyebrow="Talento y trabajo"
        title="Las oportunidades tech se quedan en la región."
        description="Vacantes publicadas por empresas, startups e instituciones del ecosistema."
      />

      <Section>
        <SectionHeading eyebrow="Vacantes" title="Ofertas abiertas" />
        <div className="mt-8 flex flex-wrap gap-2">
          {cities.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCity(c)}
              className={cn(
                "border px-3 py-1 text-xs transition-colors",
                c === city
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/60",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 divide-y divide-border border-y border-border">
          {list.map((j) => (
            <article key={j.id} className="grid gap-4 py-6 md:grid-cols-[1.5fr_1fr] md:items-center">
              <div>
                <h3 className="font-display text-lg font-semibold">{j.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{j.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {j.audience.map((a) => (
                    <Tag key={a}>{a}</Tag>
                  ))}
                </div>
              </div>
              <div className="text-xs text-muted-foreground md:text-right">
                <p className="text-foreground">{j.organization}</p>
                <p className="mt-1">
                  {j.location} · Cierra {j.deadline}
                </p>
                <p className="mt-1 text-primary">{j.status}</p>
              </div>
            </article>
          ))}
          {!list.length && (
            <p className="py-10 text-sm text-muted-foreground">No hay vacantes registradas para este filtro.</p>
          )}
        </div>
        <PlaceholderNote />
      </Section>

      <CTAStrip
        title="¿Buscas talento tech en Norte de Santander?"
        description="Publica tu vacante y llega a la comunidad profesional de la región."
        primary={{ label: "Publicar vacante", to: "/haz-parte" }}
        secondary={{ label: "Ver perfiles de talento", to: "/talento" }}
      />
    </>
  );
}
