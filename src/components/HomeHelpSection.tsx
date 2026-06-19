import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/SectionLabel";
import { HOME_FAQ } from "@/data/faqData";

const EASE = [0.16, 1, 0.3, 1] as const;

function HelpCard({
  item,
  index,
  isActive,
  onActivate,
}: {
  item: (typeof HOME_FAQ)[number];
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  const alignRight = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: alignRight ? 24 : -24, y: 8 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.4, margin: "-20px" }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: EASE }}
      className={`home-help-zigzag-row ${alignRight ? "home-help-zigzag-row--right" : "home-help-zigzag-row--left"}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
    >
      <motion.article
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className={`home-help-card group relative overflow-hidden rounded-full ${
          isActive ? "home-help-card--active" : ""
        }`}
      >
        <div className="home-help-card__shine" aria-hidden />

        <div className="home-help-card__inner relative z-10 flex min-h-[3rem] items-center gap-2.5 px-3 py-2 sm:min-h-[3.25rem] sm:gap-3 sm:px-4 sm:py-2.5">
          <span className="home-help-card__index shrink-0">{String(index + 1).padStart(2, "0")}</span>

          <p className="min-w-0 flex-1 truncate text-[13px] font-semibold leading-none tracking-tight text-primary sm:text-[14px] lg:text-[15px]">
            {item.question}
          </p>

          <Link
            to={item.href}
            aria-label={item.cta}
            className="home-help-card__link inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-bold sm:px-3.5 sm:py-2 sm:text-[12px] lg:text-[13px]"
          >
            <span className="home-help-card__link-label max-w-[7.5rem] truncate sm:max-w-none">{item.cta}</span>
            <motion.span
              animate={isActive ? { x: 3 } : { x: 0 }}
              transition={{ type: "spring", stiffness: 480, damping: 22 }}
              aria-hidden
            >
              →
            </motion.span>
          </Link>
        </div>
      </motion.article>
    </motion.div>
  );
}

export function HomeHelpSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="help" className="home-help-section content-auto relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20">
      <div className="home-help-section__grid absolute inset-0" aria-hidden />
      <div className="home-help-section__wash absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[980px] px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <SectionLabel>How can we help?</SectionLabel>
          <h2 className="mt-3 text-balance text-[clamp(1.85rem,3.6vw,2.75rem)] font-semibold leading-[1.08] tracking-tight text-primary">
            Find the right support path in seconds.
          </h2>
          <div className="global-presence-heading-line mx-auto mt-4" />
        </motion.div>

        <div className="home-help-zigzag mt-8 sm:mt-10">
          {HOME_FAQ.map((item, i) => (
            <HelpCard
              key={item.question}
              item={item}
              index={i}
              isActive={activeIndex === i}
              onActivate={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
