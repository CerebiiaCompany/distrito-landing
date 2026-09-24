import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Compass,
  GraduationCap,
  Landmark,
  Rocket,
  TrendingUp,
  Users,
  Play,
} from "lucide-react";
import { NodeNetwork } from "@/components/NodeNetwork";
import { PartnerLogo } from "@/components/site/PartnerLogo";
import {
  CTAStrip,
  Eyebrow,
  PlaceholderNote,
  Section,
  SectionHeading,
  StatCounter,
  Tag,
} from "@/components/site/primitives";
import { challenges, episodes, events, metrics, organizations, partners, stories } from "@/data/ecosystem";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Distrito Nortech — El ecosistema TECH de Norte de Santander" },
      {
        name: "description",
        content:
          "Conectamos el talento, las empresas y la innovación para transformar Norte de Santander. Directorio, retos, oportunidades, datos y el podcast Voces del NorTech.",
      },
      { property: "og:title", content: "Distrito Nortech — Ecosistema TECH de Norte de Santander" },
      {
        property: "og:description",
        content:
          "Plataforma digital del ecosistema de ciencia, tecnología, innovación, emprendimiento y talento de Norte de Santander.",
      },
    ],
  }),
  component: Home,
});

const PROFILES = [
  { icon: Rocket, title: "Soy startup", text: "Encuentra recursos, aliados, talento e inversión.", to: "/startups" },
  { icon: Building2, title: "Soy empresa", text: "Conecta con innovación, tecnología y talento.", to: "/empresas" },
  { icon: Users, title: "Soy talento", text: "Encuentra oportunidades y comunidad.", to: "/talento" },
  { icon: GraduationCap, title: "Soy academia", text: "Conecta conocimiento con territorio.", to: "/innovacion" },
  { icon: TrendingUp, title: "Soy inversionista", text: "Descubre empresas y proyectos.", to: "/inversion" },
  { icon: Landmark, title: "Soy institución", text: "Conecta iniciativas y capacidades.", to: "/retos" },
] as const;

function Home() {
  const latest = episodes[0];
  if (!latest) return null;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="grid-nodes-ink absolute inset-0 opacity-40" aria-hidden />
        <div
          className="absolute -left-32 top-1/3 h-[32rem] w-[32rem] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--primary), transparent 65%)" }}
          aria-hidden
        />
        <div className="container-nt relative grid items-center gap-10 py-12 sm:gap-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div className="animate-fade-up">
            <Eyebrow>Norte de Santander · Ecosistema TECH</Eyebrow>
            <h1 className="mt-6 text-3xl leading-[1.06] font-semibold text-balance sm:text-4xl md:text-5xl lg:text-6xl">
              Conectamos el talento, las empresas y la innovación para transformar{" "}
              <span className="text-primary">Norte de Santander</span>.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Distrito Nortech es el punto de encuentro del ecosistema TECH, empresarial y de
              innovación de nuestra región.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/ecosistema"
        className="inline-flex min-h-11 items-center justify-center gap-2 btn-cta px-6 py-3.5 text-sm font-medium transition-colors "
              >
                Explorar el ecosistema <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/haz-parte"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-ink-border px-6 py-3.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                Haz parte
              </Link>
            </div>
            <p className="mt-10 max-w-md border-l-2 border-primary pl-4 text-sm text-ink-muted">
              Todo está conectado: talento, empresa, academia, inversión e instituciones en una
              misma red regional.
            </p>
          </div>

          <div className="relative text-ink-foreground">
            <NodeNetwork />
          </div>
        </div>
      </section>

      {/* PODCAST MODULE 65/35 */}
      <section className="border-y border-border bg-card">
        <div className="container-nt grid gap-10 py-14 lg:grid-cols-[65fr_35fr] lg:py-16">
          <div>
            <Eyebrow>Voces del NorTech</Eyebrow>
            <h2 className="mt-4 max-w-2xl text-2xl leading-tight font-semibold text-balance sm:text-3xl md:text-4xl">
              Las ideas del oriente colombiano se convierten en acción.
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              El podcast del ecosistema: conversaciones con quienes están construyendo tecnología,
              empresa e innovación desde Norte de Santander.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/podcast/$slug"
                params={{ slug: latest.slug }}
        className="inline-flex min-h-11 items-center justify-center gap-2 btn-cta px-5 py-3 text-sm font-medium "
              >
                <Play className="h-4 w-4" /> Escuchar episodio
              </Link>
              <Link
                to="/podcast"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium hover:border-primary hover:text-primary"
              >
                Ver todos los episodios
              </Link>
            </div>
          </div>

          <article className="relative flex flex-col justify-between overflow-hidden border border-ink-border bg-ink p-6 text-ink-foreground">
            <div className="grid-nodes-ink absolute inset-0 opacity-30" aria-hidden />
            <div className="relative">
              <p className="eyebrow text-primary">Último episodio</p>
              <p className="mt-3 font-display text-xl font-semibold">{latest.title}</p>
              <p className="mt-2 text-sm text-ink-muted">
                {latest.guest} · {latest.role}
              </p>
            </div>
            <div className="relative mt-8 flex items-center justify-between border-t border-ink-border pt-4 text-xs text-ink-muted">
              <span>Episodio {latest.number}</span>
              <span>Duración {latest.duration}</span>
            </div>
          </article>
        </div>
      </section>

      {/* MÉTRICAS */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="grid-nodes-ink absolute inset-0 opacity-25" aria-hidden />
        <div className="container-nt relative py-16 md:py-20">
          <SectionHeading
            eyebrow="El ecosistema en una mirada"
            title="Norte de Santander, medido y conectado."
            description="Los indicadores se alimentarán desde el CMS del ecosistema. No publicamos cifras sin verificación."
            invert
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((m) => (
              <StatCounter key={m.key} label={m.label} value={m.value} note={m.note} />
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORA */}
      <Section>
        <SectionHeading
          eyebrow="Explora el ecosistema"
          title="¿Qué estás buscando?"
          description="Buscar · Conectar · Aprender · Participar · Invertir · Innovar · Crecer."
        />
        <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {PROFILES.map(({ icon: Icon, ...p }) => (
            <Link
              key={p.title}
              to={p.to}
              className="group flex flex-col justify-between bg-card p-7 transition-colors hover:bg-secondary"
            >
              <Icon className="h-6 w-6 text-primary" />
              <div className="mt-10">
                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-primary">
                  Continuar <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* DIRECTORIO PREVIEW */}
      <Section tone="muted">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Directorio"
            title="Quién es quién en el ecosistema."
            description="Startups, empresas, universidades, inversionistas, comunidades e instituciones en un solo lugar."
          />
          <Link
            to="/directorio"
            className="inline-flex items-center gap-2 border border-foreground px-5 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            <Compass className="h-4 w-4" /> Abrir directorio
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {organizations.slice(0, 4).map((o) => (
            <Link
              key={o.id}
              to="/ecosistema/$slug"
              params={{ slug: o.slug }}
              className="hover-lift border border-border bg-card p-5 hover:-translate-y-0.5 hover:border-primary/60"
            >
              <span className="text-[11px] tracking-wider text-primary uppercase">{o.type}</span>
              <h3 className="mt-2 font-display text-lg font-semibold">{o.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{o.description}</p>
              <p className="mt-3 text-xs text-muted-foreground">{o.city}</p>
            </Link>
          ))}
        </div>
        <PlaceholderNote />
      </Section>

      {/* RETOS + AGENDA */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Retos regionales"
              title="Los grandes retos necesitan nuevas soluciones."
            />
            <div className="mt-8 divide-y divide-border border-y border-border">
              {challenges.slice(0, 3).map((c) => (
                <Link
                  key={c.id}
                  to="/retos"
                  className="flex items-center justify-between gap-4 py-4 transition-colors hover:text-primary"
                >
                  <div>
                    <p className="font-medium">{c.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.area} · {c.owner}
                    </p>
                  </div>
                  <span className="border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                    {c.status}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Agenda" title="Lo que viene en el ecosistema." />
            <div className="mt-8 space-y-4">
              {events.slice(0, 3).map((e) => (
                <Link
                  key={e.id}
                  to="/eventos"
                  className="hover-lift flex gap-5 border border-border bg-card p-5 hover:border-primary/60"
                >
                  <div className="border-r border-border pr-5 text-center">
                    <p className="font-display text-2xl font-semibold">{e.date.slice(8, 10)}</p>
                    <p className="text-[11px] text-muted-foreground uppercase">
                      {new Date(e.date).toLocaleDateString("es-CO", { month: "short" })}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">{e.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {e.city} · {e.category}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* HISTORIAS */}
      <Section tone="muted">
        <SectionHeading eyebrow="Historias" title="Historias que inspiran" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stories.map((s) => (
            <Link
              key={s.id}
              to="/historias"
              className="hover-lift group flex flex-col border border-border bg-card p-6 hover:-translate-y-0.5 hover:border-primary/60"
            >
              <Tag>{s.category}</Tag>
              <h3 className="mt-4 font-display text-lg leading-snug font-semibold">{s.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{s.excerpt}</p>
              <p className="mt-6 text-xs text-muted-foreground">
                {s.date} · {s.readingTime}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* ALIADOS */}
      <Section>
        <SectionHeading
          eyebrow="Aliados"
          title="Organizaciones que construyen con nosotros"
          description="Empresas y organizaciones que aportan capacidades al ecosistema regional."
        />
        <div className="mt-10 grid gap-5 grid-cols-2 md:grid-cols-4">
          {partners.map((p) => (
            <PartnerLogo key={p.id} name={p.name} logo={p.logo} />
          ))}
        </div>
        <div className="mt-8">
          <Link to="/aliados" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
            Ver la red de aliados <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>



      <CTAStrip
        title="El ecosistema también necesita de ti."
        description="Registra tu startup, tu empresa, tu perfil de talento o tu institución y haz parte del mapa digital del ecosistema."
        primary={{ label: "Hacer parte", to: "/haz-parte" }}
        secondary={{ label: "Hablar con el equipo", to: "/contacto" }}
      />
    </>
  );
}
