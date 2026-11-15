"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/site/ui";

const slides = [
  {
    src: "/ENTERPRISE_and_DEMONSTRATION/farm-land-opt.webp",
    alt: "Research and demonstration farmland at the University of Jos",
  },
  {
    src: "/hero/compressed/4.jpg",
    alt: "The TCoEFS team and visitors at the Centre's facilities",
  },
  {
    src: "/ENTERPRISE_and_DEMONSTRATION/greenhouse-1-opt.webp",
    alt: "Visitors at the Centre's greenhouse complex",
  },
  {
    src: "/hero/compressed/2.jpg",
    alt: "Partners and University of Jos leadership at an institutional engagement",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      7000,
    );
    return () => clearTimeout(id);
  }, [current, paused]);

  return (
    <section className="relative isolate overflow-hidden bg-forest text-white">
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
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

      <div className="shell flex min-h-[34rem] flex-col justify-center py-20 lg:min-h-[40rem] lg:py-28">
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

        <div
          className="mt-12 flex items-center gap-2"
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
      </div>
    </section>
  );
}
