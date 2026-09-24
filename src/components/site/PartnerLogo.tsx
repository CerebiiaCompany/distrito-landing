import { cn } from "@/lib/utils";

/**
 * Muestra el logo del aliado tal cual (sin filtros de color) sobre un
 * halo rojo difuminado que integra los PNG transparentes con la paleta del sitio.
 */
export function PartnerLogo({
  name,
  logo,
  className,
}: {
  name: string;
  logo?: string | undefined;
  className?: string | undefined;
}) {
  return (
    <div
      className={cn(
        "group relative flex aspect-[3/2] items-center justify-center overflow-hidden border border-border bg-card transition-colors duration-300 hover:border-primary/60",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 opacity-90 blur-[6px] transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(70% 75% at 50% 42%, color-mix(in oklch, var(--color-primary) 38%, transparent) 0%, color-mix(in oklch, var(--color-primary) 20%, transparent) 45%, color-mix(in oklch, var(--color-primary) 6%, transparent) 72%, transparent 92%)",
        }}
      />
      {logo ? (
        <img
          src={logo}
          alt={`Logo de ${name}`}
          loading="lazy"
          className="relative z-10 max-h-[58%] w-auto max-w-[72%] object-contain transition-transform duration-300 group-hover:scale-[1.04]"
        />
      ) : (
        <span className="relative z-10 font-display text-lg text-foreground">
          {name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}
