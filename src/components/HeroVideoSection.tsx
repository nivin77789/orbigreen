import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bannerVideo from "@/banner.mp4";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIDEO_DURATION_SEC = 2;

function ScrollHint() {
  return (
    <div className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
      <span className="text-[12px] uppercase tracking-[0.3em] text-white/55 lg:text-[13px]">Scroll</span>
      <div className="h-10 w-px bg-gradient-to-b from-secondary to-transparent" />
    </div>
  );
}

export function HeroVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let paused = false;

    const pauseAtEnd = () => {
      if (paused || video.currentTime < VIDEO_DURATION_SEC) return;
      paused = true;
      video.pause();
      video.currentTime = VIDEO_DURATION_SEC;
    };

    const start = async () => {
      video.currentTime = 0;
      try {
        await video.play();
      } catch {
        video.pause();
        video.currentTime = VIDEO_DURATION_SEC;
      }
    };

    video.addEventListener("timeupdate", pauseAtEnd);
    void start();

    return () => {
      video.removeEventListener("timeupdate", pauseAtEnd);
    };
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-primary">
      <video
        ref={videoRef}
        src={bannerVideo}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        preload="auto"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/45 via-primary/25 to-[#F5F8F7]/80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_35%,rgba(7,63,82,0.35)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 flex h-full items-center justify-center px-5 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="hero-copy-plain pointer-events-auto mx-auto flex w-full max-w-sm flex-col items-center px-5 py-6 text-center sm:max-w-md sm:px-7 sm:py-8 lg:max-w-lg"
        >
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.25em] text-white/90 lg:text-[13px]">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(92,191,42,0.55)]" />
            Orbigreen Techsource
          </span>
          <h1 className="mt-5 text-balance text-[clamp(1.875rem,4.8vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:mt-6">
            Driving Sustainable{" "}
            <span>Industrial Solutions</span>
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

        <ScrollHint />
      </div>
    </section>
  );
}
