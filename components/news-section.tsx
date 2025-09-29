"use client";

import { useEffect, useRef, useState } from "react";

const NewsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        // Reveal animation only once
        if (entry.isIntersecting && !isAnimated) {
          setIsVisible(true);
          setIsAnimated(true);
        }

        // Playback control based on visibility
        if (playerRef.current && playerReady) {
          if (entry.isIntersecting) {
            try {
              if (isMuted) {
                playerRef.current.mute();
              } else {
                playerRef.current.unMute();
              }
              playerRef.current.playVideo();
            } catch {}
          } else if (entry.intersectionRatio === 0) {
            try {
              playerRef.current.pauseVideo();
            } catch {}
          }
        }
      },
      { threshold: 0, rootMargin: "0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isAnimated, isMuted, playerReady]);

  // Ensure autoplay if player becomes ready while section is already in view
  useEffect(() => {
    if (!playerRef.current || !playerReady) return;
    try {
      if (inView) {
        if (isMuted) {
          playerRef.current.mute();
        } else {
          playerRef.current.unMute();
        }
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    } catch {}
  }, [playerReady, inView, isMuted]);

  // Load YouTube Iframe API and instantiate player
  useEffect(() => {
    // Only load the YouTube API and instantiate the player when the section is in view
    if (!inView) return;

    let mounted = true;

    function onYouTubeIframeAPIReady() {
      if (!mounted || playerRef.current) return;
      // @ts-ignore
      const YTGlobal = (window as any).YT;
      if (!YTGlobal || !YTGlobal.Player) return;

      playerRef.current = new YTGlobal.Player("tcoefs-video-embed", {
        videoId: "katKpm79Zus",
        playerVars: {
          start: 8,
          autoplay: 0,
          controls: 0,
          mute: 1,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          origin:
            typeof window !== "undefined" ? window.location.origin : undefined,
        },
        events: {
          onReady: () => {
            setPlayerReady(true);
          },
        },
      });
    }

    // If API already loaded
    if ((window as any).YT && (window as any).YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      // Inject script once
      const existing = document.getElementById("yt-iframe-api");
      if (!existing) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.id = "yt-iframe-api";
        document.body.appendChild(tag);
      }
      // Attach or extend the ready callback
      const prev = (window as any).onYouTubeIframeAPIReady;
      (window as any).onYouTubeIframeAPIReady = () => {
        if (typeof prev === "function") prev();
        onYouTubeIframeAPIReady();
      };
    }

    return () => {
      mounted = false;
    };
  }, [inView]);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-center min-h-[500px]">
        <div
          ref={sectionRef}
          className={`w-full max-w-4xl transition-all duration-1200 ease-out transform-gpu ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
          style={{ transformOrigin: "center" }}
        >
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">
            {/* 16:9 responsive container */}
            <div className="relative pt-[56.25%]">
              <div
                id="tcoefs-video-embed"
                className="absolute inset-0 w-full h-full"
              />
              {/* Sound toggle */}
              <button
                type="button"
                onClick={() => {
                  setIsMuted((m) => {
                    const next = !m;
                    try {
                      if (playerRef.current && playerReady) {
                        if (next) {
                          playerRef.current.mute();
                        } else {
                          playerRef.current.unMute();
                        }
                      }
                    } catch {}
                    return next;
                  });
                }}
                className="absolute bottom-3 right-3 z-10 px-3 py-2 rounded-full bg-black/50 text-white text-xs backdrop-blur-sm hover:bg-black/60 transition"
              >
                {isMuted ? "Unmute" : "Mute"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
