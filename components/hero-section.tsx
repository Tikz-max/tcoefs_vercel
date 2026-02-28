"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    src: "/hero/compressed/1.jpg",
    alt: "Climate-smart agriculture research at TCoEFS",
  },
  {
    src: "/hero/compressed/2.jpg",
    alt: "Agricultural innovation and fieldwork",
  },
  {
    src: "/hero/compressed/3.jpg",
    alt: "Research and demonstration facilities",
  },
  {
    src: "/hero/compressed/4.jpg",
    alt: "Sustainable enterprise and food systems",
  },
  {
    src: "/hero/compressed/5.jpg",
    alt: "Postgraduate education programmes",
  },
  {
    src: "/hero/compressed/6.jpg",
    alt: "Strategic partnerships for resilient food systems",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const id = setInterval(advance, 4000);
    return () => clearInterval(id);
  }, [advance]);

  return (
    <div className="relative min-h-screen lg:h-screen w-full overflow-hidden">
      {/* ── Mobile: full-bleed image stack with white overlay ────────────────── */}
      <div
        className="lg:hidden absolute inset-0 min-h-full z-0"
        aria-hidden="true"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              priority={i === 0}
              className="object-cover"
            />
          </div>
        ))}
        {/* Heavy white veil — keeps text fully legible on any image */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/96 via-white/91 to-white/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-white/86 to-white/96" />
      </div>

      {/* ── Full-bleed layout wrapper ─────────────────────────────────────────── */}
      <div className="absolute inset-0 min-h-full z-10 flex flex-col lg:flex-row">
        {/* ── Left panel: content ──────────────────────────────────────────────── */}
        <div className="relative flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-20 lg:py-0 flex-1 lg:flex-none lg:w-[52%] bg-transparent lg:bg-white">
          {/* Content */}
          <div className="w-full">
            {/* H1 — authority voice leads, researcher voice lands */}
            <h1 className="text-4xl sm:text-5xl lg:text-[2.65rem] xl:text-5xl 2xl:text-6xl font-bold leading-tight mb-6">
              <span className="text-[#2f3e2f]">
                Advancing Research, Innovation, and Enterprise
              </span>{" "}
              <span className="text-[#4a5b4a] font-normal">
                for Sustainable Food Security.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg leading-relaxed text-[#4a5b4a] mb-10">
              The TETFund Centre of Excellence in Food Security (TCoEFS),
              University of Jos, advances climate-smart agriculture,
              postgraduate education, enterprise-driven demonstration, and
              strategic partnerships for resilient food systems.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link href="/programmes/postgraduate">
                <button className="w-full sm:w-auto bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] hover:from-[#1e4a1e] hover:to-[#2d5a2d] text-white px-6 py-3 rounded-lg font-medium text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap">
                  Explore Our Programmes
                </button>
              </Link>
              <Link href="/contact">
                <button className="w-full sm:w-auto border-2 border-[#2d5a2d] text-[#2d5a2d] font-semibold px-6 py-3 rounded-xl hover:bg-[#2d5a2d] hover:text-white transition-all duration-300 whitespace-nowrap">
                  Partner With Us
                </button>
              </Link>
            </div>

            {/* Slide position indicators */}
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Image slides"
            >
              {slides.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-7 bg-[#2d5a2d]"
                      : "w-2 bg-[#4a5b4a]/25 hover:bg-[#4a5b4a]/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Right panel: image slider (desktop only) ─────────────────────────── */}
        <div
          className="hidden lg:block relative flex-1 overflow-hidden"
          aria-hidden="true"
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="46vw"
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}

          {/* Left-edge fade: softens the image edge without washing it out */}
          <div
            className="absolute inset-y-0 left-0 w-20 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.88), transparent)",
            }}
          />

          {/* Bottom depth vignette: subtle grounding, never darkens the image */}
          <div
            className="absolute inset-x-0 bottom-0 h-36 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to top, rgba(47,62,47,0.10), transparent)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
