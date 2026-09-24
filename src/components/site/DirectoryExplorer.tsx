import { Link } from "@tanstack/react-router";
import { ExternalLink, Eye, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tag } from "./primitives";
import { CITIES, ORGANIZATION_TYPES, SECTORS, SERVICES, STAGES } from "@/data/taxonomy";
import type { Organization } from "@/data/types";
import { cn } from "@/lib/utils";

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: readonly string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="border-t border-border py-4 first:border-t-0 first:pt-0">
      <p className="eyebrow text-foreground/70">{title}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onToggle(o)}
            className={cn(
              "border px-2.5 py-1 text-xs transition-colors",
              selected.includes(o)
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export function OrganizationCard({
  org,
  onQuickView,
}: {
  org: Organization;
  onQuickView: (o: Organization) => void;
}) {
  return (
    <article className="hover-lift group flex flex-col border border-border bg-card p-5 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center border border-border bg-secondary font-display text-sm font-semibold">
          {org.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
            {org.type}
          </span>
          {org.verified ? (
            <span className="border border-primary/50 bg-accent px-2 py-0.5 text-[11px] text-accent-foreground">
              Verificado
            </span>
          ) : null}
        </div>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold">{org.name}</h3>
      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{org.description}</p>

      <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <MapPin className="h-3.5 w-3.5 text-primary" /> {org.city}
        {org.stage ? <span className="ml-2 text-primary">· {org.stage}</span> : null}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {[...org.sectors, ...org.technologies].slice(0, 4).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
        <button
          type="button"
          onClick={() => onQuickView(org)}
          aria-label={`Vista rápida de ${org.name}`}
          className="inline-flex h-9 w-9 items-center justify-center border border-border transition-colors hover:border-primary hover:text-primary"
        >
          <Eye className="h-4 w-4" />
        </button>
        <Link
          to="/ecosistema/$slug"
          params={{ slug: org.slug }}
          className="inline-flex flex-1 items-center justify-center border border-border px-3 py-2 text-xs font-medium transition-colors hover:border-primary hover:text-primary"
        >
          Ver perfil
        </Link>
        <a
          href={org.website ?? "#"}
          className="inline-flex items-center gap-1.5 bg-foreground px-3 py-2 text-xs font-medium text-background transition-colors hover:bg-primary"
        >
          Visitar <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}

export function DirectoryExplorer({
  data,
  showTypeFilter = true,
  showStageFilter = true,
}: {
  data: Organization[];
  showTypeFilter?: boolean;
  showStageFilter?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [stages, setStages] = useState<string[]>([]);
  const [quick, setQuick] = useState<Organization | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle =
    (setter: React.Dispatch<React.SetStateAction<string[]>>) => (value: string) =>
      setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((o) => {
      const haystack = [o.name, o.description, o.city, ...o.sectors, ...o.services, ...o.technologies]
        .join(" ")
        .toLowerCase();
      if (q && !haystack.includes(q)) return false;
      if (types.length && !types.includes(o.type)) return false;
      if (sectors.length && !o.sectors.some((s) => sectors.includes(s))) return false;
      if (services.length && !o.services.some((s) => services.includes(s))) return false;
      if (cities.length && !cities.includes(o.city)) return false;
      if (stages.length && (!o.stage || !stages.includes(o.stage))) return false;
      return true;
    });
  }, [data, query, types, sectors, services, cities, stages]);

  const activeCount = types.length + sectors.length + services.length + cities.length + stages.length;

  return (
    <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
      <aside>
        <button
          type="button"
          onClick={() => setFiltersOpen((v) => !v)}
          className="mb-4 inline-flex w-full items-center justify-between border border-border bg-card px-4 py-3 text-sm lg:hidden"
        >
          <span className="inline-flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-primary" /> Filtros
          </span>
          <span className="text-xs text-muted-foreground">{activeCount || "—"}</span>
        </button>

        <div className={cn("border border-border bg-card p-5 lg:sticky lg:top-24", !filtersOpen && "hidden lg:block")}>
          {showTypeFilter ? (
            <FilterGroup title="Tipo" options={ORGANIZATION_TYPES} selected={types} onToggle={toggle(setTypes)} />
          ) : null}
          <FilterGroup title="Sector" options={SECTORS} selected={sectors} onToggle={toggle(setSectors)} />
          <FilterGroup title="Servicios" options={SERVICES} selected={services} onToggle={toggle(setServices)} />
          <FilterGroup title="Ubicación" options={CITIES} selected={cities} onToggle={toggle(setCities)} />
          {showStageFilter ? (
            <FilterGroup title="Etapa (startups)" options={STAGES} selected={stages} onToggle={toggle(setStages)} />
          ) : null}
          {activeCount ? (
            <button
              type="button"
              onClick={() => {
                setTypes([]);
                setSectors([]);
                setServices([]);
                setCities([]);
                setStages([]);
              }}
              className="mt-4 w-full border border-border py-2 text-xs hover:border-primary hover:text-primary"
            >
              Limpiar filtros
            </button>
          ) : null}
        </div>
      </aside>

      <div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar empresas, startups, talento, organizaciones..."
            className="w-full border border-border bg-card py-4 pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary"
            aria-label="Buscar en el directorio"
          />
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          {filtered.length} registro{filtered.length === 1 ? "" : "s"} · datos placeholder pendientes de carga
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((o) => (
            <OrganizationCard key={o.id} org={o} onQuickView={setQuick} />
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted-foreground">
            No hay registros con esos criterios.
          </p>
        ) : null}
      </div>

      <Dialog open={!!quick} onOpenChange={(o) => !o && setQuick(null)}>
        <DialogContent className="max-w-2xl gap-0 rounded-none border-border p-0">
          {quick ? (
            <>
              <div className="relative border-b border-border bg-ink p-6 text-ink-foreground">
                <div className="grid-nodes-ink absolute inset-0 opacity-30" aria-hidden />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center border border-ink-border font-display text-lg font-semibold">
                    {quick.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="eyebrow text-primary">{quick.type}</p>
                    <h2 className="mt-1 font-display text-2xl font-semibold">{quick.name}</h2>
                    <p className="text-xs text-ink-muted">{quick.city}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-5 p-6">
                <p className="text-sm text-muted-foreground">{quick.description}</p>
                <dl className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="eyebrow text-foreground/60">Sectores</dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {quick.sectors.map((s) => (
                        <Tag key={s}>{s}</Tag>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-foreground/60">Servicios</dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {quick.services.map((s) => (
                        <Tag key={s}>{s}</Tag>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-foreground/60">Tecnologías</dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {quick.technologies.map((s) => (
                        <Tag key={s}>{s}</Tag>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-foreground/60">Contacto</dt>
                    <dd className="mt-2 text-sm text-muted-foreground">
                      Pendiente de carga desde el CMS
                    </dd>
                  </div>
                </dl>
                <div className="flex flex-wrap gap-3 border-t border-border pt-5">
                  <Link
                    to="/ecosistema/$slug"
                    params={{ slug: quick.slug }}
                    onClick={() => setQuick(null)}
          className="btn-cta px-5 py-2.5 text-sm font-medium "
                  >
                    Ver perfil completo
                  </Link>
                  <a
                    href={quick.website ?? "#"}
                    className="border border-border px-5 py-2.5 text-sm font-medium hover:border-primary hover:text-primary"
                  >
                    Visitar sitio web
                  </a>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
