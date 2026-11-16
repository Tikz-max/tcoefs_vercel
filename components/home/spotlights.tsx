"use client";

import { SafeImage as Image } from "@/components/site/safe-image";
import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { getSpotlightCards } from "@/lib/services/admin";
import type { SpotlightCard as DBSpotlightCard } from "@/lib/types/database";
import { Reveal, SplitText } from "@/components/site/motion";
import { Eyebrow } from "@/components/site/ui";

interface Spotlight {
  id: string;
  title: string;
  description: string;
  image: string;
  images: string[];
  videoId?: string;
  fullContent: { title: string; content: string; details: string[] };
}

/** Splits long copy into readable paragraphs when none were authored. */
function toParagraphs(raw: string) {
  const text = raw.trim();
  if (!text) return [];
  if (/\n\s*\n/.test(text)) return text.split(/\n\s*\n/).map((p) => p.trim());
  const sentences = text
    .split(/(?<=\.)\s+(?=[A-Z(])/)
    .map((s) => s.trim())
    .filter(Boolean);
  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) {
    paragraphs.push(sentences.slice(i, i + 2).join(" "));
  }
  return paragraphs;
}

function SpotlightStory({ card }: { card: Spotlight }) {
  const images = card.images.length ? card.images : [card.image].filter(Boolean);
  const paragraphs = toParagraphs(card.fullContent.content);
  const headImages = images.slice(0, 2);
  const tailImages = images.slice(2);

  return (
    <article className="mx-auto max-w-3xl px-5 pb-20 pt-6 sm:px-8">
      <p className="eyebrow mb-6 flex items-center gap-3 text-pine">
        <span aria-hidden="true" className="h-px w-8 bg-wheat-deep" />
        Spotlight
      </p>
      <Dialog.Title className="display display-lg text-ink">
        {card.fullContent.title}
      </Dialog.Title>

      {card.videoId && (
        <div className="relative mt-10 aspect-video overflow-hidden rounded-lg bg-ink">
          <iframe
            src={`https://www.youtube.com/embed/${card.videoId}?autoplay=1&mute=1&rel=0&playsinline=1&modestbranding=1`}
            title={card.fullContent.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        </div>
      )}

      <div className="mt-10 space-y-8">
        {paragraphs.map((paragraph, i) => (
          <div key={i} className="space-y-8">
            <p
              className={
                i === 0
                  ? "text-[1.25rem] leading-relaxed text-ink"
                  : "prose-body text-stone"
              }
            >
              {paragraph}
            </p>
            {headImages[i] && (
              <Image
                src={headImages[i]}
                alt={`${card.fullContent.title}, photograph ${i + 1}`}
                width={1600}
                height={900}
                sizes="(min-width: 768px) 720px, 100vw"
                className="h-auto w-full rounded-lg"
              />
            )}
          </div>
        ))}
      </div>

      {tailImages.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {tailImages.map((src, i) => (
            <Image
              key={src + i}
              src={src}
              alt={`${card.fullContent.title}, additional photograph ${i + 1}`}
              width={1200}
              height={800}
              sizes="(min-width: 640px) 360px, 100vw"
              className="h-auto w-full rounded-lg"
            />
          ))}
        </div>
      )}

      {card.fullContent.details.length > 0 && (
        <ul className="mt-12 border-b border-line">
          {card.fullContent.details.map((detail, i) => (
            <li
              key={i}
              className="flex items-baseline gap-6 border-t border-line py-4"
            >
              <span className="eyebrow w-6 shrink-0 text-wheat-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[1rem] leading-snug text-ink">{detail}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function Spotlights() {
  const [cards, setCards] = useState<Spotlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Spotlight | null>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    getSpotlightCards()
      .then((rows) =>
        setCards(
          rows.map((card: DBSpotlightCard) => ({
            id: card.id,
            title: card.title,
            description: card.description,
            image: card.image,
            images: (card.images || []).filter(Boolean),
            videoId: card.video_id || undefined,
            fullContent: {
              title: card.full_content_title,
              content: card.full_content_text || "",
              details: card.full_content_details || [],
            },
          })),
        ),
      )
      .catch(() => setCards([]))
      .finally(() => setLoading(false));
  }, []);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 8,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8,
    });
  };

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [cards.length]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = (card?.offsetWidth ?? 360) + 24;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  if (!loading && cards.length === 0) return null;

  const arrowClass =
    "grid size-12 place-items-center rounded-full border border-ink/25 text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30";

  return (
    <section className="overflow-hidden bg-mist py-16 sm:py-20 lg:py-24">
      <div className="shell flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <div>
          <Reveal y={12}>
            <Eyebrow index="06" className="mb-6">
              Spotlights
            </Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            text="Key initiatives and *achievements.*"
            className="display display-lg block max-w-[14ch]"
          />
        </div>
        <Reveal delay={0.15} className="flex gap-2">
          <button
            type="button"
            aria-label="Previous spotlight"
            onClick={() => scrollByCard(-1)}
            disabled={edges.start}
            className={arrowClass}
          >
            <ArrowLeft className="size-[1.125rem]" />
          </button>
          <button
            type="button"
            aria-label="Next spotlight"
            onClick={() => scrollByCard(1)}
            disabled={edges.end}
            className={arrowClass}
          >
            <ArrowRight className="size-[1.125rem]" />
          </button>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-14 lg:mt-16">
        <ul
          ref={trackRef}
          onScroll={updateEdges}
          className="bleed-track no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
        >
          {loading
            ? [0, 1, 2].map((i) => (
                <li
                  key={i}
                  className="aspect-[4/5] w-[80vw] shrink-0 animate-pulse rounded-lg bg-white sm:w-[26rem]"
                />
              ))
            : cards.map((card, i) => (
                <li
                  key={card.id}
                  data-card
                  className="w-[80vw] shrink-0 snap-start sm:w-[26rem]"
                >
                  <button
                    type="button"
                    onClick={() => setSelected(card)}
                    className="group block w-full text-left"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-forest">
                      <Image
                        src={card.image || "/placeholder.svg"}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 26rem, 80vw"
                        className="object-cover transition-transform duration-500 ease-expo group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                      <span className="eyebrow absolute left-5 top-5 text-white/90">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-500 ease-expo group-hover:bg-wheat group-hover:text-ink">
                        <ArrowUpRight className="size-[1.125rem]" />
                      </span>
                      <div className="absolute inset-x-5 bottom-5">
                        <h3 className="display display-sm text-white">
                          {card.title}
                        </h3>
                        <p className="mt-3 line-clamp-2 text-[0.9rem] leading-relaxed text-white/75">
                          {card.description}
                        </p>
                        <span className="mt-4 inline-flex text-[0.875rem] font-medium text-wheat">
                          <span className="link-draw pb-0.5">Read the story</span>
                        </span>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
        </ul>
      </Reveal>

      <Dialog.Root
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-ink/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out duration-300" />
          <Dialog.Content
            aria-describedby={undefined}
            className="fixed inset-x-0 bottom-0 top-6 z-[90] overflow-y-auto rounded-t-2xl bg-paper shadow-2xl outline-none data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-10 data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out duration-500 sm:inset-x-6 lg:inset-x-auto lg:left-1/2 lg:w-[60rem] lg:-translate-x-1/2"
          >
            <div className="sticky top-0 z-10 flex justify-end bg-gradient-to-b from-paper via-paper/90 to-transparent p-4">
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close"
                  className="grid size-11 place-items-center rounded-full bg-ink text-paper transition-colors duration-300 hover:bg-pine"
                >
                  <X className="size-[1.125rem]" />
                </button>
              </Dialog.Close>
            </div>
            {selected && <SpotlightStory card={selected} />}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
