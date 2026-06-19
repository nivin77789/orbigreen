import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bannerVideo from "@/banner.mp4";
import { HERO_BG } from "@/lib/constants";
import { useAutoplayVideo } from "@/hooks/useAutoplayVideo";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useAutoplayVideo(videoRef);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden" style={{ backgroundColor: HERO_BG }}>
      <video
        ref={videoRef}
        className="hero-banner-video absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden
      >
        <source src={bannerVideo} type="video/mp4" />
      </video>

      <div className="hero-surface-overlay pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative z-10 flex h-full items-center justify-center px-5 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="hero-copy-plain pointer-events-auto mx-auto flex w-full max-w-sm flex-col items-center px-5 py-6 text-center sm:max-w-md sm:px-7 sm:py-8 lg:max-w-lg"
        >
          <p className="hero-banner-kicker inline-flex items-center gap-2.5 text-white">
            <span className="h-2 w-2 shrink-0 rounded-full bg-secondary shadow-[0_0_10px_rgba(92,191,42,0.65)]" />
            Orbigreen Techsource
          </p>
          <h1 className="mt-5 text-[clamp(1.45rem,3.4vw,2.65rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:mt-6">
            <span className="block">Driving Sustainable</span>
            <span className="block">Industrial Solutions</span>
          </h1>
          <p className="mt-4 max-w-md text-pretty text-[clamp(1.05rem,1.5vw,1.3rem)] font-medium leading-snug tracking-tight text-white/92">
            Engineering-led sourcing for OEMs worldwide.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-8">
            <Link
              to="/products"
              className="hero-copy-btn gradient-border-cta rounded-full px-6 py-3 text-[14px] font-medium transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] lg:text-[15px]"
            >
              Our Products
            </Link>
            <Link
              to="/services"
              className="hero-copy-btn hero-copy-btn--outline gradient-border-cta-outline rounded-full px-6 py-3 text-[14px] font-semibold transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] lg:text-[15px]"
            >
              Our Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
