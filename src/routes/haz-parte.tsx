import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHero, PlaceholderNote, Section, SectionHeading } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/haz-parte")({
  head: () => ({
    meta: [
      { title: "Haz parte del ecosistema — Distrito Nortech" },
      {
        name: "description",
        content:
          "Registra tu startup, empresa, perfil de talento, universidad, institución o fondo y haz parte del ecosistema de Norte de Santander.",
      },
      { property: "og:title", content: "Haz parte — Distrito Nortech" },
      { property: "og:description", content: "Súmate al mapa digital del ecosistema regional." },
    ],
  }),
  component: HazPartePage,
});

const ACTORS = [
  { key: "Startup", detail: "Etapa, sector, tecnologías y necesidades." },
  { key: "Empresa", detail: "Sector, tamaño y retos de innovación." },
  { key: "Talento", detail: "Rol, habilidades y disponibilidad." },
  { key: "Academia", detail: "Programas, grupos y capacidades." },
  { key: "Inversionista", detail: "Tesis, ticket y sectores de interés." },
  { key: "Institución", detail: "Programas, servicios y líneas de apoyo." },
] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Escribe el nombre").max(120),
  email: z.string().trim().email("Correo no válido").max(255),
  city: z.string().trim().min(2, "Indica la ciudad").max(80),
  description: z.string().trim().min(20, "Cuéntanos un poco más").max(1000),
});

const field =
  "w-full border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

function HazPartePage() {
  const [actor, setActor] = useState<string>(ACTORS[0].key);
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <>
      <PageHero
        breadcrumb="Haz parte"
        eyebrow="Súmate"
        title="El ecosistema también necesita de ti."
        description="Elige tu perfil y comparte tu información para aparecer en el directorio y el mapa del ecosistema."
      />

      <Section>
        <SectionHeading eyebrow="Perfiles" title="¿Cómo participas en el ecosistema?" />
        <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {ACTORS.map((a) => (
            <button
              key={a.key}
              onClick={() => setActor(a.key)}
              className={cn(
                "p-6 text-left transition-colors",
                actor === a.key ? "bg-ink text-ink-foreground" : "bg-card hover:bg-secondary",
              )}
            >
              <p className="font-display text-lg font-semibold">{a.key}</p>
              <p className={cn("mt-1 text-sm", actor === a.key ? "text-ink-muted" : "text-muted-foreground")}>
                {a.detail}
              </p>
            </button>
          ))}
        </div>

        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.currentTarget));
            const parsed = schema.safeParse(data);
            if (!parsed.success) {
              const next: Record<string, string> = {};
              for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
              setErrors(next);
              return;
            }
            setErrors({});
            e.currentTarget.reset();
            toast.success(`Registro de ${actor} recibido`, {
              description: "La revisión y publicación se activarán al conectar el panel del ecosistema.",
            });
          }}
          className="mt-12 grid max-w-3xl gap-5"
        >
          {[
            { name: "name", label: `Nombre de ${actor.toLowerCase()}`, placeholder: "Nombre" },
            { name: "email", label: "Correo de contacto", placeholder: "nombre@organizacion.com" },
            { name: "city", label: "Ciudad o municipio", placeholder: "Cúcuta, Ocaña, Pamplona…" },
          ].map((f) => (
            <div key={f.name}>
              <label htmlFor={f.name} className="eyebrow text-foreground/60">
                {f.label}
              </label>
              <input id={f.name} name={f.name} placeholder={f.placeholder} className={`${field} mt-2`} />
              {errors[f.name] ? <p className="mt-1 text-xs text-destructive">{errors[f.name]}</p> : null}
            </div>
          ))}
          <div>
            <label htmlFor="description" className="eyebrow text-foreground/60">
              Descripción
            </label>
            <textarea id="description" name="description" rows={5} className={`${field} mt-2 resize-none`} />
            {errors["description"] ? (
              <p className="mt-1 text-xs text-destructive">{errors["description"]}</p>
            ) : null}
          </div>
          <button
            type="submit"
      className="justify-self-start btn-cta px-6 py-3.5 text-sm font-medium transition-colors "
          >
            Enviar registro
          </button>
        </form>

        <PlaceholderNote>
          Los registros aún no se almacenan: al activar la base de datos del ecosistema, cada
          solicitud pasará a revisión antes de publicarse.
        </PlaceholderNote>
      </Section>
    </>
  );
}
