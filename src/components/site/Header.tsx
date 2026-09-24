import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png.asset.json";
import { GlobalSearch } from "./GlobalSearch";
import { NAV } from "./nav-config";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-ink text-ink-foreground transition-all duration-300",
        scrolled ? "border-ink-border shadow-[0_1px_0_0_var(--primary)]" : "border-transparent",
      )}
    >
      <div className="container-nt flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          to="/"
          className="flex min-w-0 shrink items-center gap-3"
          aria-label="Distrito Nortech — Inicio"
        >
          <img
            src={logo.url}
            alt="Distrito Nortech"
            className="h-8 w-auto max-w-[9rem] object-contain invert sm:h-9 md:h-10"
            width={120}
            height={40}
          />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Navegación principal">
          {NAV.map((group) =>
            group.items ? (
              <div key={group.label} className="group relative">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 px-3 py-2 text-sm text-ink-foreground/85 transition-colors group-hover:text-primary"
                >
                  {group.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-0 top-full w-[22rem] translate-y-2 border border-ink-border bg-ink p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {group.items.map((item) => (
                    <Link
                      key={item.label + item.to}
                      to={item.to}
                      {...(item.hash ? { hash: item.hash } : {})}
                      className="block border-l-2 border-transparent px-3 py-2 transition-colors hover:border-primary hover:bg-white/5"
                    >
                      <span className="block text-sm font-medium">{item.label}</span>
                      {item.description ? (
                        <span className="block text-xs text-ink-muted">{item.description}</span>
                      ) : null}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={group.label}
                to={group.to!}
                className="px-3 py-2 text-sm text-ink-foreground/85 transition-colors hover:text-primary"
                activeProps={{ className: "px-3 py-2 text-sm text-primary" }}
              >
                {group.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden md:block">
            <GlobalSearch />
          </div>
          <Link
            to="/haz-parte"
      className="hidden items-center gap-1.5 btn-cta px-4 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors sm:inline-flex"
          >
            <Plus className="h-3.5 w-3.5" /> Hacer parte
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Abrir menú"
                className="inline-flex h-10 w-10 items-center justify-center border border-ink-border xl:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full overflow-y-auto border-ink-border bg-ink text-ink-foreground sm:max-w-sm">
              <div className="mt-8 space-y-6 px-1">
                <GlobalSearch />
                {NAV.map((group) => (
                  <div key={group.label}>
                    {group.items ? (
                      <>
                        <p className="eyebrow text-primary">{group.label}</p>
                        <div className="mt-2 space-y-1">
                          {group.items.map((item) => (
                            <Link
                              key={item.label + item.to}
                              to={item.to}
                              {...(item.hash ? { hash: item.hash } : {})}
                              onClick={() => setMobileOpen(false)}
                              className="flex min-h-11 items-center border-l border-ink-border py-2 pl-3 text-sm hover:border-primary hover:text-primary"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        to={group.to!}
                        onClick={() => setMobileOpen(false)}
                        className="flex min-h-11 items-center font-display text-lg font-semibold hover:text-primary"
                      >
                        {group.label}
                      </Link>
                    )}
                  </div>
                ))}
                <Link
                  to="/haz-parte"
                  onClick={() => setMobileOpen(false)}
         className="block btn-cta px-4 py-3 text-center text-sm font-semibold uppercase"
                >
                  + Hacer parte
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
