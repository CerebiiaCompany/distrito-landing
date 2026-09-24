import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  challenges,
  episodes,
  events,
  opportunities,
  organizations,
  stories,
  talent,
  news,
  partners,
} from "@/data/ecosystem";

interface Result {
  group: string;
  label: string;
  hint: string;
  to: string;
}

const PAGES = [
  { label: "Directorio", hint: "Todos los actores del ecosistema", to: "/directorio" },
  { label: "Mapa", hint: "Norte de Santander en movimiento", to: "/mapa" },
  { label: "Datos del ecosistema", hint: "Observatorio regional", to: "/datos" },
  { label: "Universidades", hint: "Academia e investigación", to: "/universidades" },
  { label: "Instituciones", hint: "Sector público y gremios", to: "/instituciones" },
  { label: "Empleo", hint: "Vacantes tech", to: "/empleo" },
  { label: "Programas", hint: "Incubación, aceleración y formación", to: "/programas" },
  { label: "Convocatorias", hint: "Abiertas y próximas", to: "/convocatorias" },
  { label: "Inversión", hint: "Fondos e instrumentos", to: "/inversion" },
  { label: "Innovación", hint: "Proyectos, ciencia y tecnologías emergentes", to: "/innovacion" },
  { label: "Aliados", hint: "Red de aliados", to: "/aliados" },
  { label: "Nosotros", hint: "Qué es Distrito Nortech", to: "/nosotros" },
  { label: "Hacer parte", hint: "Súmate al ecosistema", to: "/haz-parte" },
];

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo<Result[]>(
    () => [
      ...organizations.map((o) => ({
        group: o.type === "Startup" ? "Startups" : "Empresas y organizaciones",
        label: o.name,
        hint: `${o.type} · ${o.city} · ${o.sectors.join(", ")}`,
        to: `/ecosistema/${o.slug}`,
      })),
      ...talent.map((t) => ({
        group: "Talento",
        label: t.role,
        hint: `${t.specialty} · ${t.city}`,
        to: "/talento",
      })),
      ...events.map((e) => ({
        group: "Eventos",
        label: e.title,
        hint: `${e.date} · ${e.city} · ${e.category}`,
        to: "/eventos",
      })),
      ...episodes.map((e) => ({
        group: "Podcast",
        label: e.title,
        hint: `Episodio ${e.number} · ${e.tags.join(", ")}`,
        to: `/podcast/${e.slug}`,
      })),
      ...challenges.map((c) => ({
        group: "Retos",
        label: c.title,
        hint: `${c.area} · ${c.status}`,
        to: "/retos",
      })),
      ...stories.map((s) => ({
        group: "Historias",
        label: s.title,
        hint: s.category,
        to: "/historias",
      })),
      ...opportunities.map((o) => ({
        group: "Oportunidades",
        label: o.title,
        hint: `${o.category} · ${o.status}`,
        to: o.category === "Empleo" ? "/empleo" : o.category === "Programas" ? "/programas" : "/oportunidades",
      })),
      ...news.map((n) => ({
        group: "Noticias",
        label: n.title,
        hint: `${n.category} · ${n.date}`,
        to: "/noticias",
      })),
      ...partners.map((p) => ({
        group: "Aliados",
        label: p.name,
        hint: `${p.category} · ${p.scope}`,
        to: "/aliados",
      })),
      ...PAGES.map((p) => ({ group: "Páginas", label: p.label, hint: p.hint, to: p.to })),
    ],
    [],
  );

  const groups = useMemo(() => {
    const map = new Map<string, Result[]>();
    for (const r of results) {
      map.set(r.group, [...(map.get(r.group) ?? []), r]);
    }
    return [...map.entries()];
  }, [results]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Buscar en el ecosistema"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-ink-border px-3 py-2 text-xs text-ink-muted transition-colors hover:border-primary hover:text-ink-foreground"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden lg:inline">Buscar en el ecosistema</span>
        <kbd className="hidden rounded-sm border border-ink-border px-1 py-0.5 text-[10px] lg:inline">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Buscar empresas, startups, talento, eventos, podcast..." />
        <CommandList>
          <CommandEmpty>Sin resultados en el ecosistema.</CommandEmpty>
          {groups.map(([group, items]) => (
            <CommandGroup key={group} heading={group}>
              {items.map((r) => (
                <CommandItem
                  key={`${group}-${r.label}`}
                  value={`${r.label} ${r.hint}`}
                  onSelect={() => {
                    setOpen(false);
                    navigate({ to: r.to });
                  }}
                >
                  <span className="font-medium">{r.label}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{r.hint}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
