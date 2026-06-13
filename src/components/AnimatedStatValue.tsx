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
  immediate = false,
}: {
  target: number;
  delay: number;
  started: boolean;
  tone: StatTone;
  immediate?: boolean;
}) {
  const toneClass = tone === "gradient" ? "animated-stat-tone--gradient" : "animated-stat-tone--solid";
  const showTarget = started || immediate;

  return (
    <span className="animated-stat-digit" aria-hidden="true">
      <motion.span
        className="animated-stat-digit__stack"
        initial={false}
        animate={{ y: showTarget ? `-${target}em` : "0em" }}
        transition={
          immediate
            ? { duration: 0 }
            : {
                duration: 1.65,
                delay,
                ease: [0.16, 1, 0.3, 1],
              }
        }
      >
        {Array.from({ length: 10 }, (_, digit) => (
          <span key={digit} className={`animated-stat-digit__cell ${toneClass}`}>
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
      className={`animated-stat-value inline-flex items-start tabular-nums ${layoutClass ?? ""}`}
      aria-label={value}
    >
      {parsed.prefix ? <span className={toneClass}>{parsed.prefix}</span> : null}
      <span className="animated-stat-value__digits inline-flex items-start">
        {parsed.digits.map((digit, i) => (
          <RollingDigit
            key={`${value}-${i}`}
            target={digit}
            delay={delay + i * 0.09}
            started={started}
            tone={tone}
            immediate={immediate}
          />
        ))}
      </span>
      {parsed.suffix ? <span className={toneClass}>{parsed.suffix}</span> : null}
    </span>
  );
}
