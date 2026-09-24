import { Link } from "@tanstack/react-router";
import { siteLogo } from "@/lib/asset-paths";
import { FOOTER_COLUMNS, SOCIALS } from "./nav-config";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-border bg-ink text-ink-foreground">
      <div className="grid-nodes-ink absolute inset-0 opacity-25" aria-hidden />
      <div className="container-nt relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <img src={siteLogo} alt="Distrito Nortech" className="h-11 w-auto invert" width={140} height={44} />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-muted">
              Conectamos lo que Norte de Santander tiene con lo que Norte de Santander necesita
              para crecer.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  className="border border-ink-border px-3 py-1.5 text-xs transition-colors hover:border-primary hover:text-primary"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="eyebrow text-primary">{col.title}</p>
                <ul className="mt-4 space-y-2">
                  {col.links.map((l) => (
                    <li key={l.label + l.to}>
                      <Link to={l.to} className="text-sm text-ink-muted transition-colors hover:text-ink-foreground">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-border pt-6 text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Distrito Nortech · Norte de Santander, Colombia.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contacto" className="hover:text-ink-foreground">
              Política de privacidad
            </Link>
            <Link to="/contacto" className="hover:text-ink-foreground">
              Términos de uso
            </Link>
            <Link to="/contacto" className="hover:text-ink-foreground">
              Tratamiento de datos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
