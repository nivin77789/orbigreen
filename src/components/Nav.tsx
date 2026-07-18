import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BrandLogo } from "@/components/BrandLogo";

const NAV = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Global Network", to: "/global-presence" },
  { label: "Media", to: "/blog" },
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
    <header className="fixed top-0 z-[100] w-full max-w-[100vw] px-3 pt-2.5 sm:px-4 sm:pt-3 xl:px-8">
      <div className="glass-nav relative mx-auto flex h-[60px] min-w-0 max-w-[1400px] items-center justify-between gap-1.5 overflow-hidden rounded-full px-2.5 sm:h-[64px] sm:gap-2 sm:px-3 md:gap-2.5 md:px-3.5 lg:px-4 xl:h-[68px] xl:px-6">
        <div className="min-w-0 shrink-0">
          <BrandLogo variant="nav" onClick={() => setMenuOpen(false)} />
        </div>

        <nav className="absolute left-1/2 hidden min-w-0 max-w-[calc(100%-10.5rem)] -translate-x-1/2 items-center gap-0 md:flex lg:max-w-[calc(100%-12.5rem)] xl:max-w-[calc(100%-16rem)] 2xl:max-w-[calc(100%-18rem)]">
          {NAV.map((item) => {
            const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`whitespace-nowrap rounded-full px-1 py-1 text-[0.5625rem] font-semibold leading-none transition-all duration-500 ease-out hover:glass-card-hover sm:px-1.5 sm:text-[0.625rem] md:px-1.5 md:text-[0.6875rem] lg:px-2 lg:text-[0.75rem] xl:px-2 xl:text-[11px] 2xl:px-3 2xl:text-[13px] ${
                  isActive ? "glass-card-hover text-primary" : "text-primary/85"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5 md:gap-2">
          <Link
            to="/quotation"
            className="gradient-border-cta inline-flex shrink-0 rounded-full px-2 py-1.5 text-[0.625rem] font-semibold leading-none shadow-[0_4px_16px_rgba(11,95,126,0.18)] transition-all hover:shadow-[0_0_24px_-2px_rgba(92,191,42,0.45)] sm:px-3 sm:py-2 sm:text-[0.6875rem] md:px-3 md:py-2 lg:px-3.5 lg:py-2.5 lg:text-[0.75rem] xl:px-5 xl:py-2.5 xl:text-[13px]"
          >
            <span className="md:hidden">Quote</span>
            <span className="hidden md:inline xl:hidden">Quote</span>
            <span className="hidden xl:inline">Request Quote</span>
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="glass-card-light relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-primary transition-all hover:glass-card-hover md:hidden sm:h-10 sm:w-10"
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
              className="fixed inset-0 top-[4.25rem] z-[90] bg-primary/20 backdrop-blur-[2px] sm:top-[4.75rem] md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            <motion.nav
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card-light fixed left-3 right-3 top-[calc(4.25rem+0.5rem)] z-[95] mx-auto max-w-[1400px] overflow-hidden rounded-3xl p-3 sm:left-4 sm:right-4 sm:top-[calc(4.75rem+0.5rem)] md:hidden"
            >
              <ul className="grid grid-cols-2 gap-1">
                {NAV.map((item, i) => {
                  const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
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
                        className={`block rounded-2xl px-4 py-3.5 text-[16px] font-semibold transition-all duration-300 hover:glass-card-hover ${
                          isActive ? "glass-card-hover text-primary" : "text-primary"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-2 grid gap-2 border-t border-primary/10 pt-2">
                <Link
                  to="/quotation"
                  onClick={() => setMenuOpen(false)}
                  className="gradient-border-cta flex w-full items-center justify-center rounded-2xl px-5 py-3.5 text-[15px] font-semibold"
                >
                  Request Quotation
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="glass-card-light flex w-full items-center justify-center rounded-2xl px-5 py-3 text-[14px] font-semibold text-primary"
                >
                  Contact Us
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
