import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHero, Section, SectionHeading } from "@/components/site/primitives";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Distrito Nortech" },
      {
        name: "description",
        content:
          "Escríbenos para conectar con el ecosistema de innovación y tecnología de Norte de Santander.",
      },
      { property: "og:title", content: "Contacto — Distrito Nortech" },
      { property: "og:description", content: "Habla con el equipo de Distrito Nortech." },
    ],
  }),
  component: ContactoPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre").max(100),
  email: z.string().trim().email("Correo no válido").max(255),
  subject: z.string().trim().min(3, "Escribe un asunto").max(120),
  message: z.string().trim().min(10, "Cuéntanos un poco más").max(1000),
});

const field =
  "w-full border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

function ContactoPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <>
      <PageHero
        breadcrumb="Contacto"
        eyebrow="Contacto"
        title="Hablemos."
        description="¿Tienes una propuesta, una duda o una idea para el ecosistema? Escríbenos."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
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
              toast.success("Mensaje registrado", {
                description: "El envío real se activará al conectar el correo del ecosistema.",
              });
            }}
            className="space-y-5"
          >
            {[
              { name: "name", label: "Nombre", placeholder: "Tu nombre completo" },
              { name: "email", label: "Correo", placeholder: "nombre@organizacion.com" },
              { name: "subject", label: "Asunto", placeholder: "¿De qué se trata?" },
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
              <label htmlFor="message" className="eyebrow text-foreground/60">
                Mensaje
              </label>
              <textarea id="message" name="message" rows={6} className={`${field} mt-2 resize-none`} />
              {errors["message"] ? <p className="mt-1 text-xs text-destructive">{errors["message"]}</p> : null}
            </div>
            <button
              type="submit"
       className="btn-cta px-6 py-3.5 text-sm font-medium transition-colors "
            >
              Enviar mensaje
            </button>
          </form>

          <aside>
            <SectionHeading eyebrow="Canales" title="Otras formas de conectar" />
            <div className="mt-8 space-y-6 text-sm">
              <p className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  Correo oficial pendiente de publicación.
                </span>
              </p>
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  Norte de Santander, Colombia. Dirección física por confirmar.
                </span>
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
