import { useEffect, type RefObject } from "react";

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

export function useAutoplayVideo(ref: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    configureForIos(video);

    const play = () => {
      void tryPlay(video);
    };

    play();

    video.addEventListener("loadeddata", play);
    video.addEventListener("canplay", play);
    video.addEventListener("canplaythrough", play);

    const onVisibility = () => {
      if (document.visibilityState === "visible") play();
    };

    const onPageShow = () => play();

    const onGesture = () => play();

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("orientationchange", play);
    window.addEventListener("touchstart", onGesture, { passive: true });
    window.addEventListener("touchend", onGesture, { passive: true });
    window.addEventListener("click", onGesture, { passive: true });

    return () => {
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
      video.removeEventListener("canplaythrough", play);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("orientationchange", play);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("touchend", onGesture);
      window.removeEventListener("click", onGesture);
    };
  }, [ref]);
}
