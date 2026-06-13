import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type ParsedValue = {
  prefix: string;
  digits: number[];
  suffix: string;
  canAnimate: boolean;
};

type StatTone = "gradient" | "solid";

function parseValue(value: string): ParsedValue {
  const slashMatch = value.match(/^(\d+)\/(\d+)$/);
  if (slashMatch) {
    return {
      prefix: "",
      digits: slashMatch[1].split("").map(Number),
      suffix: `/${slashMatch[2]}`,
      canAnimate: true,
    };
  }

  const match = value.match(/^([^0-9]*)(\d+)(.*)$/);
  if (!match) {
    return { prefix: "", digits: [], suffix: value, canAnimate: false };
  }

  return {
    prefix: match[1],
    digits: match[2].split("").map(Number),
    suffix: match[3],
    canAnimate: true,
  };
}

function resolveTone(className?: string): StatTone {
  if (!className) return "gradient";
  if (className.includes("text-primary") || className.includes("text-body")) return "solid";
  return "gradient";
}

function RollingDigit({
  target,
  delay,
  started,
  tone,
}: {
  target: number;
  delay: number;
  started: boolean;
  tone: StatTone;
}) {
  const toneClass = tone === "gradient" ? "animated-stat-tone--gradient" : "animated-stat-tone--solid";

  return (
    <span className="animated-stat-digit inline-block h-[1em] w-[0.62em] overflow-hidden align-baseline tabular-nums">
      <motion.span
        className="animated-stat-digit__stack flex flex-col"
        initial={{ y: 0 }}
        animate={started ? { y: `-${target}em` } : { y: 0 }}
        transition={{
          duration: 1.65,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {Array.from({ length: 10 }, (_, digit) => (
          <span
            key={digit}
            className={`animated-stat-digit__cell ${toneClass} flex h-[1em] items-center justify-center`}
          >
            {digit}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

type AnimatedStatValueProps = {
  value: string;
  className?: string;
  delay?: number;
  immediate?: boolean;
};

export function AnimatedStatValue({ value, className, delay = 0, immediate = false }: AnimatedStatValueProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const parsed = useMemo(() => parseValue(value), [value]);
  const tone = useMemo(() => resolveTone(className), [className]);
  const [reduceMotion, setReduceMotion] = useState(false);
  const started = immediate || inView;

  const layoutClass = className
    ?.replace(/\bbg-gradient-to-\S+/g, "")
    .replace(/\bfrom-\S+/g, "")
    .replace(/\bvia-\S+/g, "")
    .replace(/\bto-\S+/g, "")
    .replace(/\bbg-clip-text\b/g, "")
    .replace(/\btext-transparent\b/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const toneClass = tone === "gradient" ? "animated-stat-tone--gradient" : "animated-stat-tone--solid";

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!parsed.canAnimate || reduceMotion) {
    return (
      <span ref={ref} className={`animated-stat-value ${toneClass} ${layoutClass ?? ""}`}>
        {value}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className={`animated-stat-value inline-flex items-baseline tabular-nums ${layoutClass ?? ""}`}
      aria-label={value}
    >
      {parsed.prefix ? <span className={toneClass}>{parsed.prefix}</span> : null}
      <span className="inline-flex items-baseline">
        {parsed.digits.map((digit, i) => (
          <RollingDigit
            key={`${value}-${i}`}
            target={digit}
            delay={delay + i * 0.09}
            started={started}
            tone={tone}
          />
        ))}
      </span>
      {parsed.suffix ? <span className={toneClass}>{parsed.suffix}</span> : null}
    </span>
  );
}
