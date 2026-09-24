import { createFileRoute } from "@tanstack/react-router";
import { CTAStrip, PageHero, PlaceholderNote, Section, SectionHeading, Tag } from "@/components/site/primitives";
import { projects } from "@/data/ecosystem";
import { TECHNOLOGIES } from "@/data/taxonomy";

export const Route = createFileRoute("/innovacion")({
  head: () => ({
    meta: [
      { title: "Innovación, ciencia y tecnología — Distrito Nortech" },
      {
        name: "description",
        content:
          "Innovación abierta, proyectos de ciencia y tecnología y tecnologías emergentes en el ecosistema de Norte de Santander.",
      },
      { property: "og:title", content: "Innovación — Distrito Nortech" },
      { property: "og:description", content: "Ciencia, tecnología, proyectos e innovación abierta en la región." },
    ],
  }),
  component: InnovacionPage,
});

const PILLARS = [
  { title: "Innovación abierta", text: "Empresas e instituciones abren retos; el ecosistema propone soluciones." },
  { title: "Ciencia y tecnología", text: "Grupos de investigación y capacidades científicas de la región." },
  { title: "Tecnologías emergentes", text: "IA, datos, IoT, ciberseguridad y automatización aplicadas al territorio." },
];

const SCIENCE = [
  { title: "Grupos de investigación", text: "Equipos académicos con líneas activas en ingeniería, salud, agro y ciencias sociales." },
  { title: "Laboratorios y equipamiento", text: "Infraestructura disponible para pruebas, prototipado y validación técnica." },
  { title: "Transferencia y propiedad intelectual", text: "Rutas para llevar resultados de investigación al mercado." },
];

function InnovacionPage() {
  return (
    <>
      <PageHero
        breadcrumb="Innovación"
        eyebrow="Innovación"
        title="Conocimiento aplicado a los desafíos de la región."
        description="La innovación no es un discurso: es investigación, transferencia, prototipos y proyectos que llegan al territorio."
      />

      <Section id="innovacion-abierta">
        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <div key={p.title} className="bg-card p-8">
              <span className="font-display text-sm text-primary">0{i + 1}</span>
              <h2 className="mt-4 font-display text-xl font-semibold">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="proyectos" tone="muted">
        <SectionHeading eyebrow="Proyectos" title="Proyectos de innovación en curso" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <article key={p.id} className="hover-lift border border-border bg-card p-6 hover:border-primary/60">
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-wider text-primary uppercase">{p.area}</span>
                <Tag>{p.status}</Tag>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              <p className="mt-5 text-xs text-muted-foreground">{p.organizations.join(" · ")}</p>
            </article>
          ))}
        </div>
        <PlaceholderNote />
      </Section>

      <Section id="ciencia-tecnologia">
        <SectionHeading
          eyebrow="Ciencia y tecnología"
          title="Investigación aplicada al territorio"
          description="Capacidades científicas de universidades y centros de investigación puestas al servicio de los desafíos de Norte de Santander."
        />
        <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
          {SCIENCE.map((c) => (
            <div key={c.title} className="bg-card p-8">
              <h3 className="font-display text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
        <PlaceholderNote />
      </Section>

      <Section id="tecnologias-emergentes" tone="ink">
        <SectionHeading eyebrow="Tecnologías emergentes" title="Capacidades que están creciendo" invert />
        <div className="mt-8 flex flex-wrap gap-2">
          {TECHNOLOGIES.map((t) => (
            <span key={t} className="border border-ink-border px-3 py-1 text-xs text-ink-muted">
              {t}
            </span>
          ))}
        </div>
      </Section>

      <CTAStrip
        title="¿Tienes un proyecto de innovación?"
        primary={{ label: "Publicarlo en el ecosistema", to: "/haz-parte" }}
        secondary={{ label: "Ver retos regionales", to: "/retos" }}
      />
    </>
  );
}
