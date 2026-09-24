import { Link, type LinkProps } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("eyebrow text-primary", className)}>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "mt-4 text-2xl leading-[1.1] font-semibold text-balance sm:text-3xl md:text-4xl lg:text-5xl",
          invert && "text-ink-foreground",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 text-base leading-relaxed", invert ? "text-ink-muted" : "text-muted-foreground")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function PageHero({
  breadcrumb,
  eyebrow,
  title,
  description,
  children,
}: {
  breadcrumb: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-ink-border bg-ink text-ink-foreground">
      <div className="grid-nodes-ink absolute inset-0 opacity-40" aria-hidden />
      <div
        className="absolute -top-40 right-0 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--primary), transparent 65%)" }}
        aria-hidden
      />
      <div className="container-nt relative py-12 sm:py-16 md:py-24">
        <nav aria-label="Ruta de navegación" className="mb-8 text-xs text-ink-muted">
          <Link to="/" className="hover:text-primary">
            Inicio
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-ink-foreground">{breadcrumb}</span>
        </nav>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="mt-4 max-w-4xl text-3xl leading-[1.06] font-semibold text-balance sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">{description}</p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </header>
  );
}

export function Section({
  children,
  className,
  tone = "default",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "muted" | "ink";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 sm:py-16 md:py-24",
        tone === "muted" && "bg-secondary",
        tone === "ink" && "bg-ink text-ink-foreground",
        className,
      )}
    >
      <div className="container-nt">{children}</div>
    </section>
  );
}

export function PlaceholderNote({ children }: { children?: ReactNode }) {
  return (
    <p className="mt-6 inline-flex items-center gap-2 rounded-sm border border-dashed border-border bg-card px-3 py-2 text-xs text-muted-foreground">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
      {children ?? "Contenido placeholder: pendiente de carga desde el CMS del ecosistema."}
    </p>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm border border-border bg-secondary px-2 py-0.5 text-[11px] tracking-wide text-muted-foreground">
      {children}
    </span>
  );
}

export function useCountUp(target: number | null, duration = 1400) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting || started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return { ref, value };
}

export function StatCounter({
  label,
  value,
  note,
}: {
  label: string;
  value: number | null;
  note?: string;
}) {
  const { ref, value: shown } = useCountUp(value);
  return (
    <div className="group border-t border-ink-border pt-5">
      <span ref={ref} className="font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
        {value === null ? "—" : shown.toLocaleString("es-CO")}
      </span>
      <p className="mt-2 text-sm font-medium">{label}</p>
      {note ? <p className="mt-1 text-xs text-ink-muted">{note}</p> : null}
    </div>
  );
}

export function CTAStrip({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description?: string;
  primary: { label: string; to: NonNullable<LinkProps["to"]> };
  secondary?: { label: string; to: NonNullable<LinkProps["to"]> };
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="grid-nodes-ink absolute inset-0 opacity-30" aria-hidden />
      <div className="container-nt relative flex flex-col gap-8 py-12 sm:py-16 md:flex-row md:items-end md:justify-between md:py-20">
        <div className="max-w-2xl">
          <h2 className="text-2xl leading-tight font-semibold text-balance sm:text-3xl md:text-4xl">{title}</h2>
          {description ? <p className="mt-4 text-ink-muted">{description}</p> : null}
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
          <Link
            to={primary.to}
      className="inline-flex min-h-11 items-center justify-center gap-2 btn-cta px-6 py-3 text-sm font-medium"
          >
            {primary.label}
          </Link>
          {secondary ? (
            <Link
              to={secondary.to}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-ink-border px-6 py-3 text-sm font-medium text-ink-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
