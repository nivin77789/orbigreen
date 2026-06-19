import type { ReactNode } from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const TONES = {
  secondary: "text-secondary",
  white: "text-white/90",
  muted: "text-primary/50",
  primary: "text-primary",
} as const;

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
  tone?: keyof typeof TONES;
  animated?: boolean;
  as?: "span" | "h5";
};

export function SectionLabel({
  children,
  className = "",
  tone = "secondary",
  animated = false,
  as: Tag = "span",
}: SectionLabelProps) {
  const classes = `section-label ${TONES[tone]} ${className}`.trim();

  if (animated) {
    return (
      <motion.span
        initial={{ opacity: 0, letterSpacing: "0.15em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.28em" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
        className={classes}
      >
        {children}
      </motion.span>
    );
  }

  if (Tag === "h5") {
    return <h5 className={classes}>{children}</h5>;
  }

  return <span className={classes}>{children}</span>;
}
