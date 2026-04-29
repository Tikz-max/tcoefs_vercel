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
    <div className="relative h-screen lg:h-screen w-full overflow-hidden">
      {/* ── Mobile: full-bleed image layer ───────────────────────────────────── */}
      <div className="lg:hidden absolute inset-0 z-0" aria-hidden="true">
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
              className="object-cover object-center"
            />
          </div>
        ))}

        {/* Cinematic bottom gradient — text legibility without killing the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/40 to-black/18" />
        {/* Left-edge shadow for editorial depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
      </div>

      {/* ── Full-bleed layout wrapper ─────────────────────────────────────────── */}
      <div className="absolute inset-0 z-10 flex flex-col lg:flex-row">
        {/* ── Left panel: content ──────────────────────────────────────────────── */}
        <div className="relative flex flex-col justify-end lg:justify-center px-7 sm:px-12 lg:px-16 xl:px-20 pb-14 pt-28 lg:py-0 flex-1 lg:flex-none lg:w-[52%] bg-transparent lg:bg-white">
          <div className="w-full">
            {/* H1 */}
            <h1 className="text-[2rem] leading-[1.08] sm:text-5xl lg:text-[2.65rem] xl:text-5xl 2xl:text-6xl font-bold mb-5 max-w-[12ch] sm:max-w-[14ch] lg:max-w-none">
              <span className="block text-white lg:text-[#2f3e2f]">
                TETFund Center of Excellence for Food Security
              </span>
              <span className="mt-3 block text-white/75 lg:text-[#4a5b4a] font-normal text-[0.98em] sm:text-[0.92em]">
                Advancing research, innovation, and enterprise for sustainable
                food security.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-[0.95rem] sm:text-lg leading-relaxed text-white/68 lg:text-[#4a5b4a] mb-9 lg:mb-10 max-w-prose">
              The TETFund Centre of Excellence in Food Security (TCoEFS),
              University of Jos, advances climate-smart agriculture,
              postgraduate education, enterprise-driven demonstration, and
              strategic partnerships for resilient food systems.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/programmes/postgraduate"
                className="block sm:inline-block w-full sm:w-auto"
              >
                <button className="w-full bg-white text-[#2d5a2d] lg:bg-gradient-to-r lg:from-[#2d5a2d] lg:to-[#4a5b4a] lg:text-white px-6 py-3.5 rounded-lg font-semibold text-[0.95rem] sm:text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                  Explore Our Programmes
                </button>
              </Link>
              <Link
                href="/contact"
                className="block sm:inline-block w-full sm:w-auto"
              >
                <button className="w-full border-2 border-white/60 text-white lg:border-[#2d5a2d] lg:text-[#2d5a2d] font-semibold px-6 py-3.5 rounded-xl text-[0.95rem] sm:text-base hover:bg-white/10 lg:hover:bg-[#2d5a2d] lg:hover:text-white transition-all duration-300">
                  Partner With Us
                </button>
              </Link>
            </div>

            {/* Slide position indicators — desktop only */}
            <div
              className="hidden lg:flex items-center gap-2 mt-10"
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

          {/* Bottom depth vignette */}
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
