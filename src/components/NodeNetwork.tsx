import { useMemo, useState } from "react";

export interface NetworkNode {
  id: string;
  label: string;
  detail: string;
  x: number;
  y: number;
  r: number;
}

const DEFAULT_NODES: NetworkNode[] = [
  { id: "startups", label: "Startups", detail: "Nuevas empresas de base tecnológica de la región.", x: 50, y: 18, r: 7 },
  { id: "empresas", label: "Empresas", detail: "Tejido empresarial que adopta tecnología e innovación.", x: 82, y: 34, r: 6.5 },
  { id: "talento", label: "Talento", detail: "Profesionales tech, creativos e investigadores.", x: 74, y: 72, r: 6 },
  { id: "innovacion", label: "Innovación", detail: "Proyectos, retos y soluciones para el territorio.", x: 44, y: 86, r: 6 },
  { id: "academia", label: "Academia", detail: "Universidades y centros de investigación.", x: 15, y: 66, r: 5.5 },
  { id: "inversion", label: "Inversión", detail: "Capital, fondos y ángeles conectados con la región.", x: 20, y: 30, r: 5.5 },
  { id: "instituciones", label: "Instituciones", detail: "Sector público, gremios y organizaciones de apoyo.", x: 50, y: 50, r: 9 },
];

const EDGES: [string, string][] = [
  ["instituciones", "startups"],
  ["instituciones", "empresas"],
  ["instituciones", "talento"],
  ["instituciones", "innovacion"],
  ["instituciones", "academia"],
  ["instituciones", "inversion"],
  ["startups", "inversion"],
  ["startups", "empresas"],
  ["talento", "empresas"],
  ["academia", "innovacion"],
  ["innovacion", "talento"],
];

export function NodeNetwork({ nodes = DEFAULT_NODES }: { nodes?: NetworkNode[] }) {
  const [active, setActive] = useState<string | null>(null);
  const byId = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);
  const activeNode = active ? byId[active] : null;

  return (
    <div className="relative aspect-square w-full">
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id="nt-glow">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill="url(#nt-glow)" />
        {EDGES.map(([a, b], i) => {
          const na = byId[a];
          const nb = byId[b];
          if (!na || !nb) return null;
          const on = active === a || active === b;
          return (
            <line
              key={`${a}-${b}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke={on ? "var(--primary)" : "currentColor"}
              strokeOpacity={on ? 0.9 : 0.28}
              strokeWidth={on ? 0.55 : 0.3}
              strokeDasharray="2 3"
              style={{
                animation: `nt-dash ${18 + (i % 5) * 4}s linear infinite`,
                transition: "stroke-opacity .3s ease",
              }}
            />
          );
        })}
        {nodes.map((n, i) => (
          <g
            key={n.id}
            onMouseEnter={() => setActive(n.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(n.id)}
            onBlur={() => setActive(null)}
            tabIndex={0}
            className="cursor-pointer outline-none"
            aria-label={n.label}
          >
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r + 4}
              fill="var(--primary)"
              opacity={active === n.id ? 0.18 : 0.06}
              style={{ transition: "opacity .3s ease" }}
            />
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r * 0.42}
              fill={n.id === "instituciones" ? "var(--primary)" : "currentColor"}
              style={{
                transformOrigin: `${n.x}px ${n.y}px`,
                animation: `nt-pulse-node ${5 + (i % 4)}s ease-in-out ${i * 0.4}s infinite`,
              }}
            />
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill="none"
              stroke={active === n.id ? "var(--primary)" : "currentColor"}
              strokeOpacity={active === n.id ? 1 : 0.45}
              strokeWidth="0.4"
            />
            <text
              x={n.x}
              y={n.y + n.r + 4.5}
              textAnchor="middle"
              fontSize="3"
              fill="currentColor"
              opacity={active === n.id ? 1 : 0.65}
              className="font-display uppercase"
              style={{ letterSpacing: "0.12em" }}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 rounded-sm border border-ink-border/60 bg-ink/70 p-4 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: activeNode ? 1 : 0 }}
      >
        <p className="eyebrow text-primary">{activeNode?.label ?? ""}</p>
        <p className="mt-1 text-sm text-ink-muted">{activeNode?.detail ?? ""}</p>
      </div>
    </div>
  );
}
