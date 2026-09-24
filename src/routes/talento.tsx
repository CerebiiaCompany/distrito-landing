import { createFileRoute } from "@tanstack/react-router";
import { CTAStrip, PageHero, PlaceholderNote, Section, SectionHeading, Tag } from "@/components/site/primitives";
import { opportunities, talent } from "@/data/ecosystem";
import { TECHNOLOGIES } from "@/data/taxonomy";

export const Route = createFileRoute("/talento")({
  head: () => ({
    meta: [
      { title: "Talento Tech — Distrito Nortech" },
      {
        name: "description",
        content:
          "Talento tecnológico de Norte de Santander: perfiles, habilidades, formación y oportunidades de empleo en el ecosistema.",
      },
      { property: "og:title", content: "Talento Tech — Distrito Nortech" },
      { property: "og:description", content: "Perfiles y oportunidades para el talento tecnológico regional." },
    ],
  }),
  component: TalentoPage,
});

function TalentoPage() {
  const jobs = opportunities.filter((o) => o.category === "Empleo");

  return (
    <>
      <PageHero
        breadcrumb="Talento"
        eyebrow="Talento Tech"
        title="El talento es el motor del ecosistema."
        description="Perfiles técnicos, creativos y de negocio que hacen posible la transformación digital de la región."
      />

      <Section>
        <SectionHeading eyebrow="Perfiles" title="Talento del ecosistema" description="Los perfiles se publican con autorización de cada persona." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {talent.map((t) => (
            <article key={t.id} className="hover-lift border border-border bg-card p-6 hover:border-primary/60">
              <span className="text-[11px] tracking-wider text-primary uppercase">{t.seniority}</span>
              <h3 className="mt-2 font-display text-lg font-semibold">{t.role}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.specialty}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {t.skills.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
              <p className="mt-5 text-xs text-muted-foreground">{t.city}</p>
            </article>
          ))}
        </div>
        <PlaceholderNote />
      </Section>

      <Section tone="ink">
        <SectionHeading eyebrow="Habilidades" title="Tecnologías presentes en la región" invert />
        <div className="mt-8 flex flex-wrap gap-2">
          {TECHNOLOGIES.map((t) => (
            <span key={t} className="border border-ink-border px-3 py-1 text-xs text-ink-muted">
              {t}
            </span>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Empleo" title="Vacantes en el ecosistema" />
        <div className="mt-8 divide-y divide-border border-y border-border">
          {jobs.map((j) => (
            <div key={j.id} className="flex flex-wrap items-center justify-between gap-4 py-5">
              <div>
                <p className="font-medium">{j.title}</p>
                <p className="text-xs text-muted-foreground">
                  {j.organization} · {j.location}
                </p>
              </div>
              <Tag>{j.status}</Tag>
            </div>
          ))}
        </div>
        <PlaceholderNote />
      </Section>

      <CTAStrip
        title="¿Eres talento tech en Norte de Santander?"
        primary={{ label: "Registrar mi perfil", to: "/haz-parte" }}
        secondary={{ label: "Ver oportunidades", to: "/oportunidades" }}
      />
    </>
  );
}
