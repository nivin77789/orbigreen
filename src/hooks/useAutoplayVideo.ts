import { useEffect, type RefObject } from "react";
import { useInView } from "@/hooks/useInView";

function configureForIos(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
}

async function tryPlay(video: HTMLVideoElement) {
  configureForIos(video);

  if (!video.paused) return true;

  try {
    await video.play();
    return !video.paused;
  } catch {
    return false;
  }
}

type UseAutoplayVideoOptions = {
  /** When false, playback is paused to save CPU/GPU. */
  enabled?: boolean;
};

export function useAutoplayVideo(
  ref: RefObject<HTMLVideoElement | null>,
  { enabled = true }: UseAutoplayVideoOptions = {},
) {
  useEffect(() => {
    const video = ref.current;
    if (!video || !enabled) return;

    configureForIos(video);

    const play = () => {
      void tryPlay(video);
    };

    play();

    video.addEventListener("loadeddata", play);
    video.addEventListener("canplay", play);

    const onVisibility = () => {
      if (document.visibilityState === "visible") play();
    };

    const onPageShow = () => play();
    const onGesture = () => play();

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("orientationchange", play);
    window.addEventListener("touchstart", onGesture, { passive: true });
    window.addEventListener("click", onGesture, { passive: true });

    return () => {
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("orientationchange", play);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("click", onGesture);
    };
  }, [ref, enabled]);
}

export function useLazyAutoplayVideo(
  ref: RefObject<HTMLVideoElement | null>,
  containerRef: RefObject<HTMLElement | null>,
  rootMargin = "240px",
) {
  const inView = useInView(containerRef, rootMargin);
  useAutoplayVideo(ref, { enabled: inView });

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (!inView && !video.paused) {
      video.pause();
    }
  }, [inView, ref]);

  return inView;
}
