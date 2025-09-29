"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface SpotlightCard {
  id: string;
  title: string;
  description: string;
  image: string;
  images?: string[];
  fullContent: {
    title: string;
    content: string;
    details?: string[];
  };
}

const spotlightCards: SpotlightCard[] = [
  {
    id: "new-lab-facility",
    title: "A New Home for TCoEFS Laboratory",
    description:
      "University of Jos allocates a dedicated building for TCoEFS’ future laboratory facility.",
    image: "/spotlight-images/spotlight-card1/img1.png",
    images: [
      "/spotlight-images/spotlight-card1/img1.png",
      "/spotlight-images/spotlight-card1/img2.png",
      "/spotlight-images/spotlight-card1/img3.png",
    ],
    fullContent: {
      title: "A New Home for TCoEFS Laboratory",
      content:
        "The Transnational Centre of Excellence for Food Environment Studies (TCoEFS), University of Jos, has taken a major step forward with the allocation of a dedicated building that will serve as the Centre’s future laboratory facility. In a recent inspection, the Vice-Chancellor of the University of Jos and the Deputy Administrator visited the building, reaffirming the University’s strong commitment to advancing research, innovation, and academic excellence. Although the facility is yet to be equipped, this development marks a significant milestone for TCoEFS. Once fully furnished with modern laboratory equipment, the building will become a hub for cutting-edge research, capacity building, and collaborative projects that address critical issues in food environments, nutrition, and public health. This milestone not only strengthens the University’s commitment to impactful research but also positions TCoEFS as a leading centre of excellence in food environment studies within Africa and globally.",
      details: [
        "Dedicated building allocated for TCoEFS’ future laboratory facility",
        "Leadership visit reaffirmed the University’s commitment to research and innovation",
        "Facility will support cutting-edge research, training, and collaboration",
        "Strengthens TCoEFS’ position as a leading Centre of Excellence",
      ],
    },
  },
  {
    id: "land-allocation-4.9-hectares",
    title: "4.9 hectares Allocated to TCoEFS",
    description:
      "University of Jos allocates 4.9 hectares to strengthen research, innovation, and sustainable development.",
    image: "/spotlight-images/spotlight-card2/img1.png",
    images: [
      "/spotlight-images/spotlight-card2/img1.png",
      "/spotlight-images/spotlight-card2/img2.png",
      "/spotlight-images/spotlight-card2/img3.png",
      "/spotlight-images/spotlight-card2/img4.png",
    ],
    fullContent: {
      title: "4.9 hectares Allocated to TCoEFS",
      content:
        "The Transnational Centre of Excellence for Food Environment Studies (TCoEFS), University of Jos, has been allocated 4.9 hectares  of land by the University management. This strategic allocation reflects the University’s commitment to strengthening research capacity, innovation, and sustainable development.\n\nThe land will serve as a research and innovation hub, supporting activities such as:\n• Development of climate-smart agricultural practices.\n• Field-based experiments and demonstration projects.\n• Practical training for students and early-career researchers.\n• Collaborative initiatives with industry, policymakers, and communities.\n\nThis milestone provides TCoEFS with a unique platform to translate research into practice and to drive transformative solutions in food environments, nutrition, and public health.",
      details: [
        "Strategic 4.9 hectare of land allocation by University of Jos",
        "Supports field experiments, training, and demonstration projects",
        "Platform for climate-smart agriculture and innovation",
        "Enables deeper collaboration with industry and policymakers",
      ],
    },
  },
  {
    id: "tetfund-me-visit",
    title: "TETFund M&E Team Visits TCoEFS",
    description:
      "Monitoring and Evaluation visit highlights progress, engagement, and future plans.",
    image: "/spotlight-images/spotlight-card3/img1.png",
    images: [
      "/spotlight-images/spotlight-card3/img1.png",
      "/spotlight-images/spotlight-card3/img2.png",
      "/spotlight-images/spotlight-card3/img3.png",
    ],
    fullContent: {
      title: "TETFund M&E Team Visits TCoEFS",
      content:
        "The Transnational Centre of Excellence for Food Environment Studies (TCoEFS), University of Jos, recently welcomed the Monitoring and Evaluation (M&E) team from the TETFund Head Office. The visit was part of TETFund’s continuous effort to ensure accountability, monitor progress, and support the effective implementation of its Centres of Excellence.\n\nDuring the visit, the team held interactive sessions with students of the Centre, who shared their experiences, learning opportunities, and aspirations for the future. This engagement provided valuable feedback on how the Centre is shaping academic and research capacity.\n\nThe M&E team also met with the Vice-Chancellor of the University of Jos and the Director of the Centre, who highlighted achievements so far, outlined ongoing projects, and discussed future plans for expanding the Centre’s impact. The discussions emphasized the University’s commitment to advancing TCoEFS as a hub for innovation, research, and policy engagement in food environment studies.\n\nIn their remarks, the TETFund team commended the progress recorded by the Centre and shared insights on strategies to further strengthen implementation and enhance collaboration. Their visit underscored the importance of accountability and forward-looking planning in sustaining the Centre’s growth.",
      details: [
        "Interactive sessions with students and leadership",
        "Progress review and forward plans for impact",
        "Strengthened accountability and collaboration pathways",
      ],
    },
  },
];

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

const upcomingEvents: UpcomingEvent[] = [
  {
    id: "workshop-2024",
    title: "Agricultural Innovation Workshop",
    date: "March 15, 2024",
    location: "University of Jos",
    description:
      "Join us for a comprehensive workshop on the latest agricultural innovations and technologies.",
  },
  {
    id: "conference-2024",
    title: "Food Security Conference",
    date: "April 20, 2024",
    location: "Abuja, Nigeria",
    description:
      "Annual conference bringing together experts to discuss food security challenges and solutions.",
  },
];

export default function SpotlightsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState<SpotlightCard | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % spotlightCards.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

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
      };
    }
    return;
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
                  setCurrentIndex((prev) => (prev + 1) % spotlightCards.length);
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

        {/* Upcoming Events removed */}
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

          return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`spotlight-modal-title-${selectedCard.id}`}
                tabIndex={-1}
                onKeyDown={handleModalKeyDown}
                className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
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
          );
        })()}
    </section>
  );
}
