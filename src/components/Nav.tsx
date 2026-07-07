import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import { Logo } from "./Logo";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/collections", label: "Collections" },
  { to: "/lookbook", label: "Lookbook" },
  { to: "/about", label: "World" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <>
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <Link to="/" aria-label="Home"><Logo size="md" /></Link>
          <nav className="nav__links">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`nav__link ${isActive(l.to) ? "nav__link--active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="nav__actions">
            <Link to="/login" aria-label="Account" className="nav__icon-btn nav__icon-btn--desktop">
              <User className="icon" />
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="nav__icon-btn nav__burger"
            >
              <Menu className="icon-md" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mobile-menu"
          >
            <div className="mobile-menu__top">
              <Logo size="md" />
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="nav__icon-btn"
              >
                <X className="icon-md" />
              </button>
            </div>
            <nav className="mobile-menu__nav">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    to={l.to}
                    className={`mobile-menu__link ${isActive(l.to) ? "mobile-menu__link--active" : ""}`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mobile-menu__footer"
              >
                <Link to="/login">Account →</Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
