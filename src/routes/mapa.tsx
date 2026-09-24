import { createFileRoute } from "@tanstack/react-router";
import { EcosystemMap } from "@/components/site/EcosystemMap";
import { CTAStrip, PageHero, PlaceholderNote, Section } from "@/components/site/primitives";

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [
      { title: "Mapa del ecosistema — Distrito Nortech" },
      {
        name: "description",
        content:
          "Norte de Santander en movimiento: mapa interactivo de empresas, startups, universidades, coworkings y comunidades del ecosistema.",
      },
      { property: "og:title", content: "Mapa del ecosistema — Distrito Nortech" },
      { property: "og:description", content: "Actores del ecosistema TECH ubicados en el territorio." },
    ],
  }),
  component: MapaPage,
});

function MapaPage() {
  return (
    <>
      <PageHero
        breadcrumb="Mapa"
        eyebrow="Territorio"
        title="Norte de Santander en movimiento"
        description="Visualiza dónde ocurre la innovación en el departamento y alterna entre mapa y listado."
      />
      <Section>
        <EcosystemMap />
        <PlaceholderNote>
          Marcadores con coordenadas de referencia. La capa cartográfica definitiva y las
          ubicaciones verificadas se cargarán desde el CMS.
        </PlaceholderNote>
      </Section>
      <CTAStrip
        title="Ubica tu organización en el mapa del ecosistema."
        primary={{ label: "Hacer parte", to: "/haz-parte" }}
        secondary={{ label: "Ver directorio", to: "/directorio" }}
      />
    </>
  );
}
