"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { getYouTubeVideo } from "@/lib/services/admin";
import { Reveal, SplitText } from "@/components/site/motion";
import { Eyebrow } from "@/components/site/ui";

const FALLBACK_VIDEO = "katKpm79Zus";

/** Feature film. Plays muted while on screen and pauses when it leaves. */
export default function Film() {
  const frameRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const [videoId, setVideoId] = useState(FALLBACK_VIDEO);
  const inView = useInView(frameRef, { amount: 0.25 });
  const seen = useInView(frameRef, { once: true, margin: "200px" });

  useEffect(() => {
    getYouTubeVideo()
      .then((video) => video?.video_id && setVideoId(video.video_id))
      .catch(() => {});
  }, []);

  // Load the YouTube player only once the frame is close to the viewport.
  useEffect(() => {
    if (!seen) return;
    let cancelled = false;
    const w = window as any;

    const create = () => {
      if (cancelled || playerRef.current || !w.YT?.Player) return;
      playerRef.current = new w.YT.Player("tcoefs-film", {
        videoId,
        playerVars: {
          start: 8,
          autoplay: 0,
          controls: 0,
          mute: 1,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          origin: window.location.origin,
        },
        events: { onReady: () => setReady(true) },
      });
    };

    if (w.YT?.Player) {
      create();
    } else {
      if (!document.getElementById("yt-iframe-api")) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.id = "yt-iframe-api";
        document.body.appendChild(tag);
      }
      const previous = w.onYouTubeIframeAPIReady;
      w.onYouTubeIframeAPIReady = () => {
        if (typeof previous === "function") previous();
        create();
      };
    }
    return () => {
      cancelled = true;
    };
  }, [seen, videoId]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !ready) return;
    try {
      if (muted) player.mute();
      else player.unMute();
      if (inView) player.playVideo();
      else player.pauseVideo();
    } catch {}
  }, [ready, inView, muted]);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="shell">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal y={12}>
              <Eyebrow index="03" className="mb-4">
                Film
              </Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text="See the Centre *at work.*"
              className="display display-lg block text-ink"
            />
          </div>
          <Reveal delay={0.15}>
            <a
              href="https://www.youtube.com/@TETFund_TCoEFS"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex text-[0.9375rem] font-semibold text-pine"
            >
              <span className="link-draw pb-0.5">More on our YouTube channel</span>
            </a>
          </Reveal>
        </div>

        <div
          ref={frameRef}
          className="relative overflow-hidden rounded-lg bg-ink"
        >
          <div className="relative aspect-video">
            <div id="tcoefs-film" className="absolute inset-0 size-full" />
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-pressed={!muted}
              className="absolute bottom-4 right-4 z-10 inline-flex h-11 items-center gap-2.5 rounded-full bg-ink/60 pl-4 pr-5 text-[0.8125rem] font-medium text-white backdrop-blur-md transition-colors duration-300 hover:bg-wheat hover:text-ink"
            >
              {muted ? (
                <VolumeX className="size-4" />
              ) : (
                <Volume2 className="size-4" />
              )}
              {muted ? "Sound off" : "Sound on"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
