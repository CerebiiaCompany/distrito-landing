import { createFileRoute } from "@tanstack/react-router";
import { CTAStrip, PageHero, PlaceholderNote, Section, SectionHeading, StatCounter } from "@/components/site/primitives";
import { metrics, organizations } from "@/data/ecosystem";
import { ORGANIZATION_TYPES, SECTORS } from "@/data/taxonomy";

export const Route = createFileRoute("/datos")({
  head: () => ({
    meta: [
      { title: "Datos del ecosistema — Distrito Nortech" },
      {
        name: "description",
        content:
          "Observatorio del ecosistema de Norte de Santander: indicadores de actores, sectores, talento e innovación.",
      },
      { property: "og:title", content: "Datos del ecosistema — Distrito Nortech" },
      { property: "og:description", content: "Observatorio de indicadores del ecosistema regional." },
    ],
  }),
  component: DatosPage,
});

function DatosPage() {
  const byType = ORGANIZATION_TYPES.map((t) => ({
    label: t,
    count: organizations.filter((o) => o.type === t).length,
  })).filter((r) => r.count > 0);
  const max = Math.max(...byType.map((r) => r.count), 1);

  const bySector = SECTORS.map((s) => ({
    label: s,
    count: organizations.filter((o) => o.sectors.includes(s)).length,
  })).filter((r) => r.count > 0);

  return (
    <>
      <PageHero
        breadcrumb="Datos"
        eyebrow="Observatorio"
        title="Medir el ecosistema para poder transformarlo."
        description="Indicadores construidos con información verificada de los actores del ecosistema. Nada se publica sin fuente."
      />

      <Section tone="ink">
        <SectionHeading eyebrow="Indicadores" title="Panorama general" invert />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m) => (
            <StatCounter key={m.key} label={m.label} value={m.value} note={m.note} />
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Distribución" title="Actores por tipo" />
            <div className="mt-8 space-y-4">
              {byType.map((r) => (
                <div key={r.label}>
                  <div className="flex justify-between text-sm">
                    <span>{r.label}</span>
                    <span className="text-muted-foreground">{r.count}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full bg-secondary">
                    <div className="h-full bg-primary" style={{ width: `${(r.count / max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Sectores" title="Presencia sectorial" />
            <div className="mt-8 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3">
              {bySector.map((r) => (
                <div key={r.label} className="bg-card p-4">
                  <p className="font-display text-2xl font-semibold">{r.count}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <PlaceholderNote>
          Los conteos provienen de registros de demostración. Al conectar el CMS, el observatorio
          mostrará datos verificados con su fuente y fecha de corte.
        </PlaceholderNote>
      </Section>

      <CTAStrip
        title="Aporta información al observatorio."
        primary={{ label: "Registrar mi organización", to: "/haz-parte" }}
        secondary={{ label: "Ver el mapa", to: "/mapa" }}
      />
    </>
  );
}
