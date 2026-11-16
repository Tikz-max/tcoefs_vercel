"use client";

import { SafeImage } from "@/components/site/safe-image";
import type { HeroSlideView } from "@/lib/content/defaults";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/site/ui";

export default function Hero({ slides }: { slides: HeroSlideView[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      7000,
    );
    return () => clearTimeout(id);
  }, [current, paused, slides.length]);

  return (
    <section className="relative isolate overflow-hidden bg-forest text-white">
      {slides.map((slide, i) => (
        <SafeImage
          key={`${slide.src}-${i}`}
          src={slide.src}
          alt={i === current ? slide.alt : ""}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`-z-10 object-cover transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b1b33]/90 via-[#0b1b33]/70 to-[#0b1b33]/25"
      />

      <div className="shell animate-in fade-in slide-in-from-bottom-3 duration-700 flex min-h-[34rem] flex-col justify-center py-20 lg:min-h-[40rem] lg:py-28">
        <p className="eyebrow text-wheat">University of Jos, Nigeria</p>
        <h1 className="display display-hero mt-4 max-w-3xl">
          TETFund Centre of Excellence in Food Security
        </h1>
        <p className="lede mt-6 max-w-2xl text-white/85">
          Advancing climate-smart agriculture, postgraduate education,
          enterprise-driven demonstration, and strategic partnerships for
          resilient food systems.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/programmes" variant="wheat">
            Explore our programmes
          </ButtonLink>
          <ButtonLink href="/partnerships" variant="outline-light">
            Partner with us
          </ButtonLink>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4">
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label="Hero photographs"
        >
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show photograph ${i + 1} of ${slides.length}`}
              aria-current={i === current}
              onClick={() => {
                setCurrent(i);
                setPaused(true);
              }}
              className="grid h-11 w-9 place-items-center"
            >
              <span
                className={`h-1 w-full rounded-full transition-colors duration-200 ${
                  i === current ? "bg-wheat" : "bg-white/40 hover:bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>
        {slides[current]?.caption && (
          <p
            key={current}
            className="hidden text-[0.8125rem] text-white/80 animate-in fade-in duration-700 sm:block"
          >
            {slides[current].caption}
          </p>
        )}
        </div>
      </div>
    </section>
  );
}
