import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/collections", label: "Collections" },
  { to: "/lookbook", label: "Lookbook" },
  { to: "/about", label: "World" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [path]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled ? "bg-black/85 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-10">
          <Link to="/" className="group flex items-center">
            <Logo size="md" className="text-white transition-transform group-hover:-translate-y-0.5" />
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {LINKS.map((l) => {
              const active = l.to === "/" ? path === "/" : path.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "relative text-[11px] font-medium uppercase tracking-luxe transition-colors link-underline",
                    active ? "text-blood" : "text-white/80 hover:text-white"
                  )}
                >
                  {l.label}
                  {active && (
                    <span className="absolute -left-3 top-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-blood" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              aria-label="Account"
              className="hidden md:inline-flex h-9 w-9 items-center justify-center border border-white/15 text-white/80 transition-colors hover:border-blood hover:text-blood"
            >
              <User className="size-4" />
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center border border-white/15 text-white"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black md:hidden"
          >
            <div className="flex h-16 items-center justify-between px-5 border-b border-white/5">
              <Logo size="md" />
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center border border-white/15 text-white"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex flex-col px-5 pt-16 gap-8">
              {LINKS.map((l, i) => {
                const active = l.to === "/" ? path === "/" : path.startsWith(l.to);
                return (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      to={l.to}
                      className={cn(
                        "font-display text-4xl tracking-brand",
                        active ? "text-blood" : "text-white"
                      )}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12 pt-8 border-t border-white/10"
              >
                <Link to="/login" className="text-[11px] uppercase tracking-luxe text-white/60 hover:text-blood">
                  Account →
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
