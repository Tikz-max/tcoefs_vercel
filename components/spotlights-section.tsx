"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { getSpotlightCards } from "@/lib/services/admin";
import type { SpotlightCard as DBSpotlightCard } from "@/lib/types/database";

interface SpotlightCard {
  id: string;
  title: string;
  description: string;
  image: string;
  images?: string[];
  videoId?: string;
  fullContent: {
    title: string;
    content: string;
    details?: string[];
  };
}

export default function SpotlightsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [selectedCard, setSelectedCard] = useState<SpotlightCard | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoPlayerRef = useRef<any>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [spotlightCards, setSpotlightCards] = useState<SpotlightCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Ensure we're mounted before using portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load spotlight cards from database
  useEffect(() => {
    const loadSpotlights = async () => {
      const cards = await getSpotlightCards();
      // Transform database format to component format
      const transformedCards: SpotlightCard[] = cards.map(
        (card: DBSpotlightCard) => ({
          id: card.id,
          title: card.title,
          description: card.description,
          image: card.image,
          images: card.images || [],
          videoId: card.video_id || undefined,
          fullContent: {
            title: card.full_content_title,
            content: card.full_content_text,
            details: card.full_content_details || [],
          },
        }),
      );
      setSpotlightCards(transformedCards);
      setLoading(false);
    };
    loadSpotlights();
  }, []);

  useEffect(() => {
    const update = () => {
      const el = trackRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLDivElement>("[data-card]");
      const gap = 32; // gap-8 ~ 32px
      const cardWidth = card?.offsetWidth ?? 320;
      const viewportCenter = el.clientWidth / 2;
      const centerOffset =
        viewportCenter - cardWidth / 2 - currentIndex * (cardWidth + gap);
      setOffset(centerOffset);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [currentIndex]);

  useEffect(() => {
    if (spotlightCards.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % spotlightCards.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [spotlightCards.length]);

  useEffect(() => {
    // Lock background scroll and manage focus while modal is open
    if (selectedCard) {
      // Save current focus and lock scroll
      previouslyFocusedRef.current =
        document.activeElement as HTMLElement | null;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // Reset modal scroll to top and focus the content heading for screen readers
      if (modalRef.current) {
        modalRef.current.scrollTop = 0;
      }
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.scrollTop = 0;
        }
        if (titleRef.current) {
          titleRef.current.focus();
        } else if (closeBtnRef.current) {
          closeBtnRef.current.focus();
        } else if (modalRef.current) {
          modalRef.current.focus();
        }
      }, 0);

      return () => {
        document.body.style.overflow = originalOverflow;
        // Restore focus
        if (previouslyFocusedRef.current) {
          previouslyFocusedRef.current.focus();
        }
        // Clean up video player
        if (videoPlayerRef.current) {
          try {
            videoPlayerRef.current.destroy();
          } catch {}
          videoPlayerRef.current = null;
        }
        setVideoReady(false);
      };
    }
  }, [selectedCard]);

  // Initialize YouTube player for cards with videoId
  useEffect(() => {
    if (!selectedCard || !selectedCard.videoId) {
      return;
    }

    let mounted = true;

    function initYouTubePlayer() {
      if (!mounted || videoPlayerRef.current) return;

      const YTGlobal = (window as any).YT;
      if (!YTGlobal || !YTGlobal.Player) return;

      const container = document.getElementById("spotlight-video-player");
      if (!container) return;

      videoPlayerRef.current = new YTGlobal.Player("spotlight-video-player", {
        videoId: selectedCard!.videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          mute: 1,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          origin:
            typeof window !== "undefined" ? window.location.origin : undefined,
        },
        events: {
          onReady: () => {
            setVideoReady(true);
            try {
              videoPlayerRef.current.playVideo();
            } catch {}
          },
        },
      });
    }

    const loadYouTubeAPI = () => {
      if ((window as any).YT && (window as any).YT.Player) {
        initYouTubePlayer();
      } else {
        const existing = document.getElementById("yt-iframe-api");
        if (!existing) {
          const tag = document.createElement("script");
          tag.src = "https://www.youtube.com/iframe_api";
          tag.id = "yt-iframe-api";
          document.body.appendChild(tag);
        }

        const prev = (window as any).onYouTubeIframeAPIReady;
        (window as any).onYouTubeIframeAPIReady = () => {
          if (typeof prev === "function") prev();
          initYouTubePlayer();
        };
      }
    };

    const timer = setTimeout(loadYouTubeAPI, 100);

    return () => {
      mounted = false;
      clearTimeout(timer);
      if (videoPlayerRef.current) {
        try {
          videoPlayerRef.current.destroy();
        } catch {}
        videoPlayerRef.current = null;
      }
    };
  }, [selectedCard]);

  const handleCardClick = (card: SpotlightCard) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const handleModalKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
      return;
    }
    if (e.key !== "Tab") return;
    const container = modalRef.current;
    if (!container) return;
    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => el.offsetParent !== null);
    if (focusable.length === 0) {
      e.preventDefault();
      container.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement | null;
    if (e.shiftKey) {
      if (active === first || !container.contains(active)) {
        e.preventDefault();
        (last as HTMLElement).focus();
      }
    } else {
      if (active === last || !container.contains(active)) {
        e.preventDefault();
        (first as HTMLElement).focus();
      }
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (spotlightCards.length === 0) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Spotlights
          </h2>
          <p className="text-xl text-gray-600">
            No spotlights available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background spotlight/walls for center emphasis */}
      <div className="hidden md:block pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white via-white/90 to-transparent z-20" />
      <div className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white via-white/90 to-transparent z-20" />
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[min(350px,80vw)] h-[min(600px,120vh)] bg-[radial-gradient(ellipse_40%_80%_at_50%_0%,rgba(45,90,45,0.2)_0%,rgba(45,90,45,0.1)_30%,rgba(45,90,45,0.04)_50%,transparent_70%)] z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Spotlights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our key initiatives and achievements in agricultural
            research and food security
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative">
          {/* Spotlight Cards */}
          <div>
            {/* Spotlight Cards */}
            <div>
              <div
                ref={trackRef}
                className="relative w-full overflow-hidden"
                onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
                onTouchMove={(e) => {
                  if (touchStartX !== null) {
                    setTouchDeltaX(e.touches[0].clientX - touchStartX);
                  }
                }}
                onTouchEnd={() => {
                  const threshold = 50;
                  if (touchDeltaX <= -threshold) {
                    setCurrentIndex(
                      (prev) => (prev + 1) % spotlightCards.length,
                    );
                  } else if (touchDeltaX >= threshold) {
                    setCurrentIndex(
                      (prev) =>
                        (prev - 1 + spotlightCards.length) %
                        spotlightCards.length,
                    );
                  }
                  setTouchStartX(null);
                  setTouchDeltaX(0);
                }}
              >
                <div
                  className="relative flex items-center gap-8 transition-transform duration-700 ease-in-out will-change-transform w-fit"
                  style={{ transform: `translateX(${offset}px)` }}
                >
                  {spotlightCards.map((card, index) => {
                    const relativePosition =
                      (index - currentIndex + spotlightCards.length) %
                      spotlightCards.length;
                    const isCenter = relativePosition === 0;
                    const isSide =
                      relativePosition === 1 ||
                      relativePosition === spotlightCards.length - 1;
                    const stateClass = isCenter
                      ? "-translate-y-2 scale-100 z-20 border-[#2d5a2d] border-2 shadow-2xl"
                      : isSide
                        ? "opacity-80 z-10"
                        : "opacity-30 scale-95 z-0";

                    return (
                      <div
                        key={card.id}
                        data-card
                        onClick={() =>
                          isCenter
                            ? handleCardClick(card)
                            : setCurrentIndex(index)
                        }
                        className={`bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden shadow-lg transition-all duration-700 cursor-pointer flex-shrink-0 w-80 md:w-[340px] ${stateClass}`}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={card.image || "/placeholder.svg"}
                            alt={card.title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-[#2f3e2f] mb-3">
                            {card.title}
                          </h3>
                          <p className="text-[#4a5b4a] text-sm leading-relaxed mb-4">
                            {card.description}
                          </p>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleCardClick(card);
                            }}
                            className="inline-flex items-center bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:from-[#1e4a1e] hover:to-[#2d5a2d] transition-colors"
                          >
                            Learn More
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile View removed; grid is responsive */}
          </div>
        </div>
      </div>

      {/* Modal for expanded card content */}
      {selectedCard &&
        (() => {
          const images =
            selectedCard.images?.filter(Boolean) ??
            [selectedCard.image].filter(Boolean);

          // Paragraphize content to place images between paragraphs
          const raw = String(selectedCard.fullContent.content || "").trim();
          let paragraphs: string[] = [];
          if (/\n\s*\n/.test(raw)) {
            paragraphs = raw.split(/\n\s*\n/).map((p) => p.trim());
          } else {
            const sentences = raw
              .split(/(?<=\.)\s+(?=[A-Z(])/)
              .map((s) => s.trim())
              .filter(Boolean);
            const groupSize = 2;
            for (let i = 0; i < sentences.length; i += groupSize) {
              paragraphs.push(sentences.slice(i, i + groupSize).join(" "));
            }
          }

          const headImages = images.slice(0, 2);
          const tailImages = images.slice(2);

          const modalContent = (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] overflow-y-auto">
              <div className="min-h-screen flex items-center justify-center p-4">
                <div
                  ref={modalRef}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={`spotlight-modal-title-${selectedCard.id}`}
                  tabIndex={-1}
                  onKeyDown={handleModalKeyDown}
                  className="bg-white rounded-xl max-w-4xl w-full shadow-2xl relative my-8"
                >
                  {/* Top bar with close (matches News modal style) */}
                  <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-end">
                    <button
                      ref={closeBtnRef}
                      onClick={closeModal}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Close"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Body with images injected between paragraphs and rest below */}
                  <div className="p-6 md:p-8">
                    <h2
                      id={`spotlight-modal-title-${selectedCard.id}`}
                      ref={titleRef}
                      tabIndex={-1}
                      className="text-3xl font-bold mb-6"
                      style={{ color: "#2f3e2f" }}
                    >
                      {selectedCard.fullContent.title}
                    </h2>

                    {/* Video player if videoId exists */}
                    {selectedCard.videoId && (
                      <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl mb-6">
                        <div className="relative pt-[56.25%]">
                          <div
                            id="spotlight-video-player"
                            className="absolute inset-0 w-full h-full"
                          />
                        </div>
                      </div>
                    )}

                    {/* Content paragraphs with interspersed images */}
                    {paragraphs.map((para, idx) => (
                      <div key={idx} className="mb-4">
                        <p
                          className="text-lg leading-relaxed"
                          style={{ color: "#4a5b4a" }}
                        >
                          {para}
                        </p>
                        {headImages[idx] && (
                          <div className="my-6">
                            <Image
                              src={headImages[idx]}
                              alt={`${selectedCard.fullContent.title} image ${idx + 1}`}
                              width={1600}
                              height={900}
                              className="w-full h-auto rounded-lg object-cover"
                            />
                          </div>
                        )}
                      </div>
                    ))}

                    {tailImages.length > 0 && (
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {tailImages.map((src, i) => (
                          <div
                            key={src + i}
                            className="relative w-full overflow-hidden rounded-lg"
                          >
                            <Image
                              src={src}
                              alt={`${selectedCard.fullContent.title} additional image ${i + 1}`}
                              width={1200}
                              height={800}
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {Array.isArray(selectedCard.fullContent.details) &&
                      selectedCard.fullContent.details.length > 0 && (
                        <div className="mt-8 space-y-3">
                          {selectedCard.fullContent.details.map(
                            (detail, index) => (
                              <div key={index} className="flex items-start">
                                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span className="text-gray-800">{detail}</span>
                              </div>
                            ),
                          )}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          );

          // Use portal to render modal at document root
          return mounted ? createPortal(modalContent, document.body) : null;
        })()}
    </section>
  );
}
