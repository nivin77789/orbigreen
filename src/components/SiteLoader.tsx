import { motion } from "framer-motion";
import { SectionLabel } from "@/components/SectionLabel";
import { BrandLogo } from "@/components/BrandLogo";

type SiteLoaderProps = {
  progress: number;
};

export function SiteLoader({ progress }: SiteLoaderProps) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <motion.div
      className="site-loader fixed inset-0 z-[200] flex items-center justify-center bg-section"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="site-loader-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center px-8">
        <motion.div
          className="relative mb-10"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="site-loader-ring absolute inset-0 -m-6 rounded-full" aria-hidden />
          <div className="site-loader-ring site-loader-ring--delayed absolute inset-0 -m-10 rounded-full" aria-hidden />
          <div className="relative">
            <BrandLogo variant="loader" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <SectionLabel tone="muted">Preparing experience</SectionLabel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mt-8 w-full"
        >
          <div className="mb-3 flex items-center justify-between text-[11px] lg:text-[12px] font-semibold tabular-nums tracking-widest text-primary/45">
            <span>Loading assets</span>
            <span>{clamped}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-primary/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
              initial={{ width: "0%" }}
              animate={{ width: `${clamped}%` }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>

        <motion.div
          className="mt-6 flex gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-secondary/70"
              animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.1, 0.85] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
