import { createFileRoute } from "@tanstack/react-router";
import { DirectoryExplorer } from "@/components/site/DirectoryExplorer";
import { CTAStrip, PageHero, Section } from "@/components/site/primitives";
import { organizations } from "@/data/ecosystem";

export const Route = createFileRoute("/directorio")({
  head: () => ({
    meta: [
      { title: "Directorio del ecosistema — Distrito Nortech" },
      {
        name: "description",
        content:
          "Busca y filtra startups, empresas, universidades, inversionistas, comunidades e instituciones de Norte de Santander.",
      },
      { property: "og:title", content: "Directorio del ecosistema — Distrito Nortech" },
      {
        property: "og:description",
        content: "Filtra por tipo, sector, servicios, ubicación y etapa dentro del ecosistema regional.",
      },
    ],
  }),
  component: DirectorioPage,
});

function DirectorioPage() {
  return (
    <>
      <PageHero
        breadcrumb="Directorio"
        eyebrow="Directorio del ecosistema"
        title="Encuentra con quién conectar."
        description="Todos los actores del ecosistema en un mismo buscador: tipo, sector, servicios, tecnologías, ubicación y etapa."
      />
      <Section>
        <DirectoryExplorer data={organizations} />
      </Section>
      <CTAStrip
        title="¿Falta tu organización en el directorio?"
        primary={{ label: "Registrar mi organización", to: "/haz-parte" }}
        secondary={{ label: "Ver el mapa", to: "/mapa" }}
      />
    </>
  );
}
