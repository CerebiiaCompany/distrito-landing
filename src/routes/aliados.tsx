import { createFileRoute } from "@tanstack/react-router";
import { NodeNetwork } from "@/components/NodeNetwork";
import { PartnerLogo } from "@/components/site/PartnerLogo";
import { CTAStrip, PageHero, PlaceholderNote, Section, SectionHeading, Tag } from "@/components/site/primitives";
import { partners } from "@/data/ecosystem";

export const Route = createFileRoute("/aliados")({
  head: () => ({
    meta: [
      { title: "Aliados — Distrito Nortech" },
      {
        name: "description",
        content:
          "Organizaciones aliadas que hacen posible el ecosistema de innovación y tecnología de Norte de Santander.",
      },
      { property: "og:title", content: "Aliados — Distrito Nortech" },
      { property: "og:description", content: "La red de aliados del ecosistema regional." },
    ],
  }),
  component: AliadosPage,
});

function AliadosPage() {
  const scopes = ["Regional", "Nacional", "Internacional"] as const;

  return (
    <>
      <PageHero
        breadcrumb="Aliados"
        eyebrow="Red de aliados"
        title="Ningún ecosistema se construye solo."
        description="Empresas, universidades, gremios e instituciones que trabajan con Distrito Nortech."
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-foreground">
            <NodeNetwork />
          </div>
          <SectionHeading
            eyebrow="Cómo nos conectamos"
            title="Una red de colaboración, no una lista de logos."
            description="Cada alianza aporta capacidades distintas: conocimiento, infraestructura, capital, mercado o política pública."
          />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Aliados" title="Organizaciones aliadas" />
        <div className="mt-10 space-y-10">
          {scopes.map((scope) => {
            const list = partners.filter((p) => p.scope === scope);
            if (!list.length) return null;
            return (
              <div key={scope}>
                <p className="eyebrow text-foreground/60">{scope}</p>
                <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {list.map((p) => (
                    <div key={p.id}>
                      <PartnerLogo name={p.name} logo={p.logo} />
                      <div className="mt-3">
                        <p className="font-medium">{p.name}</p>
                        <div className="mt-2">
                          <Tag>{p.category}</Tag>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <PlaceholderNote>
          La categoría y el alcance de cada aliado están pendientes de confirmación.
        </PlaceholderNote>
      </Section>

      <CTAStrip
        title="¿Quieres ser aliado del ecosistema?"
        primary={{ label: "Proponer alianza", to: "/contacto" }}
        secondary={{ label: "Conocer Distrito Nortech", to: "/nosotros" }}
      />
    </>
  );
}
