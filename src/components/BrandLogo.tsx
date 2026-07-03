import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../logo.png";
import { COMPANY_NAME } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

type BrandLogoProps = {
  variant?: "nav" | "footer" | "loader";
  onClick?: () => void;
};

export function BrandLogo({ variant = "nav", onClick }: BrandLogoProps) {
  const isNav = variant === "nav";
  const isLoader = variant === "loader";

  const logoHeight = isNav
    ? "h-8 w-auto sm:h-9 md:h-9 lg:h-10 xl:h-11 2xl:h-12"
    : isLoader
      ? "h-16 md:h-20"
      : "h-14 md:h-16";

  const image = (
    <img
      src={logo}
      alt={COMPANY_NAME}
      className={`${logoHeight} w-auto shrink-0 object-contain`}
    />
  );

  if (variant === "loader") {
    return image;
  }

  if (isNav) {
    return (
      <Link
        to="/"
        onClick={onClick}
        className="group relative inline-flex shrink-0 items-center overflow-visible"
        aria-label={`${COMPANY_NAME} home`}
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/25 to-accent/20 blur-md"
          animate={{
            opacity: [0.35, 0.7, 0.35],
            scale: [0.94, 1.06, 0.94],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="relative block"
          initial={{ opacity: 0, x: -12, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1, y: [0, -2.5, 0] }}
          transition={{
            opacity: { duration: 0.75, ease: EASE },
            x: { duration: 0.75, ease: EASE },
            scale: { duration: 0.75, ease: EASE },
            y: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.75 },
          }}
          whileHover={{ scale: 1.06, y: -3, rotate: -1.5 }}
          whileTap={{ scale: 0.97 }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg"
          >
            <span className="nav-logo-shine absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </span>
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -inset-1 rounded-xl border border-secondary/25"
            animate={{
              opacity: [0.15, 0.45, 0.15],
              scale: [0.98, 1.04, 0.98],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          {image}
        </motion.span>
      </Link>
    );
  }

  return (
    <Link to="/" onClick={onClick} className="inline-flex shrink-0 transition-opacity hover:opacity-90">
      {image}
    </Link>
  );
}
