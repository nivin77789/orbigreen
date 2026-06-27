import { useRef } from "react";
import { motion } from "framer-motion";
import globalNetworkVideo from "@/assets/global-network-video.mp4";
import { useAutoplayVideo } from "@/hooks/useAutoplayVideo";

const EASE = [0.16, 1, 0.3, 1] as const;

export function GlobalNetworkSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useAutoplayVideo(videoRef);

  return (
    <section className="global-network-section border-t border-primary/10 bg-section/50">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-6 lg:px-10 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="global-network-map-panel"
        >
          <span className="global-network-map-panel__glow" aria-hidden />
          <video
            ref={videoRef}
            className="global-network-map-video"
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            aria-label="Orbigreen global supply network visualization"
          >
            <source src={globalNetworkVideo} type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  );
}
