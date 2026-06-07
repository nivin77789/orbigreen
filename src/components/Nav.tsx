import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../logo.png";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Products", to: "/products" },
  { label: "Sourcing Markets", to: "/sourcing-markets" },
  { label: "Resources", to: "/resources" },
  { label: "About", to: "/about" },
];

export function Nav() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 z-50 w-full px-4 pt-4 lg:px-8">
      <div className="glass-nav relative mx-auto flex h-[58px] max-w-[1400px] items-center justify-between gap-3 rounded-full px-5 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Orbigreen Techsource" className="h-9 w-auto object-contain md:h-10" />
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 md:flex">
          {NAV.map((item) => {
            const isActive = item.to === "/" ? pathname === "/" : pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-all duration-500 ease-out hover:glass-card-hover ${
                  isActive ? "glass-card-hover text-primary" : "text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="gradient-border-cta hidden rounded-full px-5 py-2.5 text-[13px] font-semibold shadow-[0_4px_16px_rgba(11,95,126,0.18)] transition-all hover:shadow-[0_0_24px_-2px_rgba(92,191,42,0.45)] sm:inline-flex"
          >
            Get Quote
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="glass-card-light relative flex h-10 w-10 items-center justify-center rounded-full text-primary transition-all hover:glass-card-hover md:hidden"
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span className="relative h-3.5 w-4">
              <span
                className={`absolute left-0 h-0.5 w-4 rounded-full bg-primary transition-all duration-300 ${
                  menuOpen ? "top-[6px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] h-0.5 w-4 rounded-full bg-primary transition-all duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-4 rounded-full bg-primary transition-all duration-300 ${
                  menuOpen ? "top-[6px] -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 top-[4.5rem] bg-primary/20 backdrop-blur-[2px] md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            <motion.nav
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card-light absolute left-4 right-4 top-[calc(4.5rem+0.5rem)] mx-auto max-w-[1400px] overflow-hidden rounded-3xl p-3 md:hidden"
            >
              <ul className="flex flex-col gap-1">
                {NAV.map((item, i) => {
                  const isActive = item.to === "/" ? pathname === "/" : pathname === item.to;
                  return (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                    >
                      <Link
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className={`block rounded-2xl px-4 py-3.5 text-[15px] font-semibold transition-all duration-300 hover:glass-card-hover ${
                          isActive ? "glass-card-hover text-primary" : "text-primary"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-2 border-t border-primary/10 pt-2">
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="gradient-border-cta flex w-full items-center justify-center rounded-2xl px-5 py-3.5 text-[14px] font-semibold"
                >
                  Get Quote
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
