import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HOME_FAQ } from "@/data/faqData";

const EASE = [0.16, 1, 0.3, 1] as const;

function FaqBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="faq-section-grid absolute inset-0" />
      <div className="absolute -left-[10%] top-[18%] h-[40vh] w-[40vw] rounded-full bg-primary/[0.05] blur-[90px]" />
      <div className="absolute -right-[8%] bottom-[10%] h-[36vh] w-[36vw] rounded-full bg-secondary/[0.07] blur-[80px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
    </div>
  );
}

function FaqItemCard({
  item,
  index,
  compact,
  heroAnimate,
  visible,
  zigzag,
}: {
  item: (typeof HOME_FAQ)[number];
  index: number;
  compact: boolean;
  heroAnimate: boolean;
  visible: boolean;
  zigzag: boolean;
}) {
  const alignRight = zigzag && index % 2 === 1;

  const card = (
    <div
      className={`faq-item faq-item--flat overflow-hidden ${
        zigzag
          ? `faq-zigzag-item w-[94%] rounded-xl sm:w-[84%] sm:rounded-[1.1rem] ${
              alignRight ? "faq-zigzag-item--right ml-auto" : "faq-zigzag-item--left mr-auto"
            }`
          : "rounded-xl sm:rounded-2xl"
      } ${compact ? "px-3.5 py-3 sm:px-4 sm:py-3.5" : "px-4 py-4 sm:px-5 sm:py-5"}`}
    >
      <div
        className={`flex flex-col gap-2 sm:gap-2.5 ${
          alignRight ? "items-end text-right" : "items-start text-left"
        }`}
      >
        <p
          className={`font-semibold leading-snug tracking-tight text-primary ${
            compact ? "text-[13px] sm:text-[14px]" : "text-[16px] sm:text-[17px]"
          }`}
        >
          {item.question}
        </p>
        <Link
          to={item.href}
          className={`faq-item__cta group inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 font-semibold transition-all sm:gap-2 sm:px-4 sm:py-2.5 ${
            compact ? "text-[13px] sm:text-[14px]" : "text-[15px] sm:text-[16px]"
          } ${alignRight ? "flex-row-reverse" : ""}`}
        >
          {item.cta}
          <span
            className={`text-secondary transition-transform duration-300 ${
              alignRight ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
            }`}
            aria-hidden
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );

  if (heroAnimate) {
    return (
      <motion.div
        initial={{ opacity: 0, x: alignRight ? 20 : -20, y: 8 }}
        animate={visible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: alignRight ? 20 : -20, y: 8 }}
        transition={{ delay: index * 0.05, duration: 0.45, ease: EASE }}
      >
        {card}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: zigzag ? (alignRight ? 16 : -16) : 0, y: 12 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: index * 0.04, duration: 0.45, ease: EASE }}
    >
      {card}
    </motion.div>
  );
}

function FaqList({
  compact = false,
  heroAnimate = false,
  visible = true,
  zigzag = false,
}: {
  compact?: boolean;
  heroAnimate?: boolean;
  visible?: boolean;
  zigzag?: boolean;
}) {
  return (
    <div className={zigzag ? "faq-zigzag space-y-2.5 sm:space-y-3" : "space-y-3 sm:space-y-3.5"}>
      {HOME_FAQ.map((item, i) => (
        <FaqItemCard
          key={item.question}
          item={item}
          index={i}
          compact={compact}
          heroAnimate={heroAnimate}
          visible={visible}
          zigzag={zigzag}
        />
      ))}
    </div>
  );
}

type HomeFaqSectionProps = {
  variant?: "section" | "hero";
  visible?: boolean;
};

export function HomeFaqSection({ variant = "section", visible = true }: HomeFaqSectionProps) {
  if (variant === "hero") {
    return (
      <motion.div
        initial={false}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.75, ease: EASE }}
        className="pointer-events-auto mx-auto flex h-full max-h-[88vh] w-full max-w-[min(100%,58rem)] flex-col justify-center px-4 sm:max-w-[60rem] sm:px-6"
      >
        <div className="mb-3.5 shrink-0 text-center sm:mb-4">
          <span className="text-[12px] font-bold uppercase tracking-[0.26em] text-primary/65 sm:text-[13px]">
            FAQ
          </span>
          <h3 className="mt-2 text-[clamp(1.25rem,2.8vw,1.75rem)] font-semibold leading-snug tracking-tight text-primary">
            How can we help?
          </h3>
        </div>

        <div className="min-h-0 shrink px-0.5">
          <FaqList compact heroAnimate zigzag visible={visible} />
        </div>
      </motion.div>
    );
  }

  return (
    <section
      id="faq"
      className="content-auto relative overflow-hidden border-t border-primary/10 bg-section/50 py-16 sm:py-20 lg:py-24"
    >
      <FaqBackground />

      <div className="relative z-10 mx-auto max-w-[1140px] px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mb-8 max-w-2xl text-center sm:mb-10"
        >
          <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-secondary">FAQ</span>
          <h2 className="mt-3 text-balance text-[clamp(1.9rem,3.8vw,2.85rem)] font-semibold leading-[1.08] tracking-tight text-primary">
            Common sourcing{" "}
            <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
              questions
            </span>
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-primary/62 sm:text-[17px]">
            Each answer links to the service or page that fits your challenge.
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <FaqList zigzag />
        </div>
      </div>
    </section>
  );
}
