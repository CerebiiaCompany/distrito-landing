import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { Section, Tag } from "@/components/site/primitives";
import { episodes } from "@/data/ecosystem";

export const Route = createFileRoute("/podcast/$slug")({
  loader: ({ params }) => {
    const episode = episodes.find((e) => e.slug === params.slug);
    if (!episode) throw notFound();
    return { episode };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Episodio no disponible — Distrito Nortech" }, { name: "robots", content: "noindex" }] };
    }
    const { episode } = loaderData;
    return {
      meta: [
        { title: `${episode.title} — Voces del NorTech` },
        { name: "description", content: episode.description },
        { property: "og:title", content: `${episode.title} — Voces del NorTech` },
        { property: "og:description", content: episode.description },
      ],
    };
  },
  component: EpisodePage,
});

function EpisodePage() {
  const { episode } = Route.useLoaderData();
  const others = episodes.filter((e) => e.slug !== episode.slug).slice(0, 3);

  return (
    <>
      <header className="relative overflow-hidden border-b border-ink-border bg-ink text-ink-foreground">
        <div className="grid-nodes-ink absolute inset-0 opacity-40" aria-hidden />
        <div className="container-nt relative py-16">
          <nav aria-label="Ruta de navegación" className="mb-8 text-xs text-ink-muted">
            <Link to="/" className="hover:text-primary">Inicio</Link>
            <span className="mx-2 opacity-50">/</span>
            <Link to="/podcast" className="hover:text-primary">Voces del NorTech</Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-ink-foreground">Episodio {episode.number}</span>
          </nav>
          <p className="eyebrow text-primary">Episodio {episode.number}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight font-semibold md:text-5xl">
            {episode.title}
          </h1>
          <p className="mt-4 text-ink-muted">
            {episode.guest} · {episode.role}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <span className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">
              <Play className="h-4 w-4" /> Reproductor pendiente
            </span>
            <span className="inline-flex items-center border border-ink-border px-5 py-3 text-sm text-ink-muted">
              {episode.duration} · {episode.date}
            </span>
          </div>
        </div>
      </header>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold">Sobre este episodio</h2>
            <p className="mt-4 text-muted-foreground">{episode.description}</p>

            {episode.chapters?.length ? (
              <>
                <h3 className="mt-12 font-display text-xl font-semibold">Capítulos</h3>
                <ul className="mt-4 divide-y divide-border border-y border-border">
                  {episode.chapters.map((c) => (
                    <li key={c.time} className="flex gap-6 py-3 text-sm">
                      <span className="font-display text-primary">{c.time}</span>
                      <span className="text-muted-foreground">{c.label}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <aside className="space-y-8">
            <div>
              <p className="eyebrow text-foreground/60">Temas</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {episode.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow text-foreground/60">Otros episodios</p>
              <ul className="mt-3 space-y-3">
                {others.map((o) => (
                  <li key={o.id}>
                    <Link
                      to="/podcast/$slug"
                      params={{ slug: o.slug }}
                      className="text-sm hover:text-primary"
                    >
                      Ep. {o.number} — {o.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
