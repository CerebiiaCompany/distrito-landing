import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { organizations } from "@/data/ecosystem";
import { ORGANIZATION_TYPES, SECTORS } from "@/data/taxonomy";
import type { Organization } from "@/data/types";
import { cn } from "@/lib/utils";
import { Tag } from "./primitives";

// Aproximación cartográfica de Norte de Santander (proyección lineal simple).
const BOUNDS = { minLat: 7.1, maxLat: 9.0, minLng: -73.6, maxLng: -72.2 };

function project(lat: number, lng: number) {
  const x = ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * 100;
  const y = (1 - (lat - BOUNDS.minLat) / (BOUNDS.maxLat - BOUNDS.minLat)) * 100;
  return { x, y };
}

export function EcosystemMap() {
  const [view, setView] = useState<"mapa" | "listado">("mapa");
  const [type, setType] = useState<string | null>(null);
  const [sector, setSector] = useState<string | null>(null);
  const [selected, setSelected] = useState<Organization | null>(null);

  const points = useMemo(
    () =>
      organizations.filter(
        (o) =>
          o.latitude !== undefined &&
          (!type || o.type === type) &&
          (!sector || o.sectors.includes(sector)),
      ),
    [type, sector],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex border border-border">
          {(["mapa", "listado"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={cn(
                "px-4 py-2 text-xs font-medium capitalize transition-colors",
                view === v ? "bg-foreground text-background" : "hover:text-primary",
              )}
            >
              {v}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={type ?? ""}
            onChange={(e) => setType(e.target.value || null)}
            aria-label="Filtrar por tipo"
            className="border border-border bg-card px-3 py-2 text-xs outline-none focus:border-primary"
          >
            <option value="">Todos los tipos</option>
            {ORGANIZATION_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select
            value={sector ?? ""}
            onChange={(e) => setSector(e.target.value || null)}
            aria-label="Filtrar por sector"
            className="border border-border bg-card px-3 py-2 text-xs outline-none focus:border-primary"
          >
            <option value="">Todos los sectores</option>
            {SECTORS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {view === "mapa" ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_20rem]">
          <div className="relative overflow-hidden border border-ink-border bg-ink">
            <div className="grid-nodes-ink absolute inset-0 opacity-40" aria-hidden />
            <svg viewBox="0 0 100 100" className="relative aspect-[4/3] w-full text-ink-foreground">
              {/* Silueta esquemática del departamento */}
              <polygon
                points="46,4 62,10 68,22 62,34 70,44 66,58 54,66 50,80 38,92 28,86 24,70 32,58 26,46 32,32 38,18"
                fill="color-mix(in oklab, var(--ink-foreground) 6%, transparent)"
                stroke="color-mix(in oklab, var(--ink-foreground) 30%, transparent)"
                strokeWidth="0.4"
              />
              {points.map((o) => {
                const { x, y } = project(o.latitude!, o.longitude!);
                const on = selected?.id === o.id;
                return (
                  <g key={o.id} onClick={() => setSelected(o)} className="cursor-pointer">
                    <circle cx={x} cy={y} r={on ? 3.4 : 2.4} fill="var(--primary)" opacity={on ? 0.25 : 0.15} />
                    <circle cx={x} cy={y} r={on ? 1.3 : 0.9} fill="var(--primary)" />
                  </g>
                );
              })}
            </svg>
            <p className="absolute bottom-3 left-4 text-[11px] text-ink-muted">
              Mapa esquemático · geolocalización precisa pendiente de carga
            </p>
          </div>

          <aside className="border border-border bg-card p-5">
            {selected ? (
              <>
                <p className="eyebrow text-primary">{selected.type}</p>
                <h3 className="mt-2 font-display text-xl font-semibold">{selected.name}</h3>
                <p className="text-xs text-muted-foreground">{selected.city}</p>
                <p className="mt-3 text-sm text-muted-foreground">{selected.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {selected.sectors.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
                <Link
                  to="/ecosistema/$slug"
                  params={{ slug: selected.slug }}
         className="mt-5 inline-block btn-cta px-4 py-2 text-xs font-medium "
                >
                  Ver perfil
                </Link>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Selecciona un marcador para ver la ficha del actor en el territorio.
              </p>
            )}
          </aside>
        </div>
      ) : (
        <div className="mt-6 divide-y divide-border border border-border bg-card">
          {points.map((o) => (
            <Link
              key={o.id}
              to="/ecosistema/$slug"
              params={{ slug: o.slug }}
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-secondary"
            >
              <div>
                <p className="font-medium">{o.name}</p>
                <p className="text-xs text-muted-foreground">
                  {o.type} · {o.city}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {o.sectors.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
