import { createFileRoute } from "@tanstack/react-router";
import { CTAStrip, PageHero, Section, SectionHeading } from "@/components/site/primitives";
import diorama from "@/assets/Diorama Cúcuta.png";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros — Distrito Nortech" },
      {
        name: "description",
        content:
          "Distrito Nortech articula el ecosistema de ciencia, tecnología, innovación, emprendimiento y talento de Norte de Santander.",
      },
      { property: "og:title", content: "Nosotros — Distrito Nortech" },
      { property: "og:description", content: "Qué es Distrito Nortech y para qué existe." },
    ],
  }),
  component: NosotrosPage,
});

const PRINCIPLES = [
  { title: "Conectar", text: "Ponemos en contacto a quienes no se estaban encontrando." },
  { title: "Visibilizar", text: "Lo que no se ve, no existe. Mostramos lo que ya está pasando." },
  { title: "Articular", text: "Alineamos esfuerzos entre empresa, academia, Estado y comunidad." },
  { title: "Medir", text: "Sin datos no hay estrategia ni decisiones informadas." },
];

function NosotrosPage() {
  return (
    <>
      <PageHero
        breadcrumb="Nosotros"
        eyebrow="Distrito Nortech"
        title="Somos la red que conecta al ecosistema del nororiente."
        description="Un espacio común para que el talento, la empresa, la academia, la inversión y las instituciones trabajen juntos."
        media={
          <img
            src={diorama}
            alt="Diorama ilustrado de Cúcuta con lugares representativos de la ciudad"
            fetchPriority="high"
            decoding="async"
            className="h-auto w-full max-w-[38rem] object-contain"
          />
        }
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <SectionHeading eyebrow="Propósito" title="Que Norte de Santander sea reconocido por lo que crea." />
          <div className="space-y-6 text-muted-foreground">
            <p>
              Distrito Nortech nace para articular las capacidades del departamento en ciencia,
              tecnología, innovación, emprendimiento y talento.
            </p>
            <p>
              No reemplazamos a los actores del ecosistema: los conectamos, los visibilizamos y
              facilitamos que ocurran más colaboraciones y más proyectos.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <SectionHeading eyebrow="Cómo trabajamos" title="Cuatro principios" invert />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <div key={p.title} className="border-t border-ink-border pt-5">
              <span className="font-display text-sm text-primary">0{i + 1}</span>
              <h3 className="mt-3 font-display text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Equipo e institucionalidad"
          title="Quiénes están detrás"
          description="La información del equipo, la gobernanza y los documentos institucionales se publicarán aquí una vez definidos oficialmente."
        />
      </Section>

      <CTAStrip
        title="Construyamos el ecosistema juntos."
        primary={{ label: "Hacer parte", to: "/haz-parte" }}
        secondary={{ label: "Contactarnos", to: "/contacto" }}
      />
    </>
  );
}
