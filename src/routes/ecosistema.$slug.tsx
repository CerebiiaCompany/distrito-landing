import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ExternalLink, MapPin } from "lucide-react";
import { Section, Tag } from "@/components/site/primitives";
import { getOrganization, organizations } from "@/data/ecosystem";

export const Route = createFileRoute("/ecosistema/$slug")({
  loader: ({ params }) => {
    const org = getOrganization(params.slug);
    if (!org) throw notFound();
    return { org };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Perfil no disponible — Distrito Nortech" }, { name: "robots", content: "noindex" }] };
    }
    const { org } = loaderData;
    return {
      meta: [
        { title: `${org.name} — Ecosistema Distrito Nortech` },
        { name: "description", content: org.description },
        { property: "og:title", content: `${org.name} — Distrito Nortech` },
        { property: "og:description", content: org.description },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: org.name,
            description: org.description,
            address: { "@type": "PostalAddress", addressLocality: org.city, addressRegion: "Norte de Santander" },
          }),
        },
      ],
    };
  },
  component: OrgProfile,
});

function OrgProfile() {
  const { org } = Route.useLoaderData();
  const related = organizations.filter((o) => org.connections?.includes(o.id));

  return (
    <>
      <header className="relative overflow-hidden border-b border-ink-border bg-ink text-ink-foreground">
        <div className="grid-nodes-ink absolute inset-0 opacity-40" aria-hidden />
        <div className="container-nt relative py-16">
          <nav aria-label="Ruta de navegación" className="mb-8 text-xs text-ink-muted">
            <Link to="/" className="hover:text-primary">Inicio</Link>
            <span className="mx-2 opacity-50">/</span>
            <Link to="/directorio" className="hover:text-primary">Directorio</Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-ink-foreground">{org.name}</span>
          </nav>
          <div className="flex flex-wrap items-end gap-6">
            <div className="flex h-20 w-20 items-center justify-center border border-ink-border font-display text-2xl font-semibold">
              {org.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="eyebrow text-primary">{org.type}</p>
              <h1 className="mt-2 font-display text-4xl font-semibold">{org.name}</h1>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-ink-muted">
                <MapPin className="h-4 w-4 text-primary" /> {org.city}
                {org.stage ? <span className="ml-2">· Etapa {org.stage}</span> : null}
              </p>
            </div>
            <a
              href={org.website ?? "#"}
       className="ml-auto inline-flex min-h-11 items-center justify-center gap-2 btn-cta px-5 py-3 text-sm font-medium "
            >
              Visitar sitio web <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold">Sobre la organización</h2>
            <p className="mt-4 text-muted-foreground">{org.longDescription ?? org.description}</p>

            <h3 className="mt-12 font-display text-xl font-semibold">Conexiones en el ecosistema</h3>
            {related.length ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    to="/ecosistema/$slug"
                    params={{ slug: r.slug }}
                    className="hover-lift border border-border bg-card p-4 hover:border-primary/60"
                  >
                    <p className="text-[11px] tracking-wider text-primary uppercase">{r.type}</p>
                    <p className="mt-1 font-medium">{r.name}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                Conexiones pendientes de mapeo desde el CMS.
              </p>
            )}
          </div>

          <aside className="space-y-6 border border-border bg-card p-6">
            {[
              { label: "Sectores", items: org.sectors },
              { label: "Servicios", items: org.services },
              { label: "Tecnologías", items: org.technologies },
            ].map((block) => (
              <div key={block.label}>
                <p className="eyebrow text-foreground/60">{block.label}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {block.items.map((i) => (
                    <Tag key={i}>{i}</Tag>
                  ))}
                </div>
              </div>
            ))}
            <div className="border-t border-border pt-5 text-sm text-muted-foreground">
              <p className="eyebrow text-foreground/60">Contacto y redes</p>
              <p className="mt-2">Pendiente de carga desde el CMS del ecosistema.</p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
