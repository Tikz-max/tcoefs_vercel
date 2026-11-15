"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { EASE, SplitText } from "@/components/site/motion";
import { ButtonLink, Contours } from "@/components/site/ui";
import { site } from "@/lib/site";

const slides = [
  {
    src: "/hero/compressed/1.jpg",
    alt: "Climate-smart agriculture research at TCoEFS",
    caption: "On the farm",
    position: "center 20%",
  },
  {
    src: "/hero/compressed/2.jpg",
    alt: "Agricultural innovation and fieldwork",
    caption: "Institutional engagement",
    position: "center",
  },
  {
    src: "/hero/compressed/3.jpg",
    alt: "Research and demonstration facilities",
    caption: "World Food Day, Plateau State",
    position: "center",
  },
  {
    src: "/hero/compressed/4.jpg",
    alt: "Sustainable enterprise and food systems",
    caption: "Site visit",
    position: "center",
  },
  {
    src: "/hero/compressed/5.jpg",
    alt: "Postgraduate education programmes",
    caption: "World Food Day, Plateau State",
    position: "center",
  },
  {
    src: "/hero/compressed/6.jpg",
    alt: "Strategic partnerships for resilient food systems",
    caption: "Livestock field visit",
    position: "center",
  },
];

const INTERVAL = 6000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const panelY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);

  const advance = useCallback(
    () => setCurrent((prev) => (prev + 1) % slides.length),
    [],
  );

  useEffect(() => {
    const id = setTimeout(advance, INTERVAL);
    return () => clearTimeout(id);
  }, [current, advance]);

  return (
    <section
      ref={ref}
      className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white"
    >
      <Contours
        seed={2}
        rings={15}
        className="absolute -left-[30%] -top-[25%] h-[150%] w-[110%] text-white/[0.055]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-forest to-transparent"
      />

      <div className="shell relative grid flex-1 items-center gap-x-12 gap-y-12 pb-10 pt-32 lg:grid-cols-12 lg:pb-14 lg:pt-36">
        {/* Copy */}
        <motion.div style={{ y: copyY, opacity: fade }} className="lg:col-span-7">
          <h1>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              className="eyebrow mb-8 flex items-center gap-3 text-sage"
            >
              <span aria-hidden="true" className="h-px w-8 bg-wheat" />
              TETFund Centre of Excellence in Food Security
            </motion.span>
            <SplitText
              immediate
              delay={0.2}
              stagger={0.06}
              text="Feeding the future through *knowledge* and *innovation.*"
              className="display block text-[clamp(2.75rem,6.3vw,5.9rem)] leading-[0.97]"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.75 }}
            className="lede mt-9 max-w-xl text-white/70"
          >
            The TETFund Centre of Excellence in Food Security (TCoEFS),
            University of Jos, advances climate-smart agriculture,
            postgraduate education, enterprise-driven demonstration, and
            strategic partnerships for resilient food systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.9 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <ButtonLink href="/programmes" variant="wheat">
              Explore our programmes
            </ButtonLink>
            <ButtonLink href="/partnerships" variant="outline-light">
              Partner with us
            </ButtonLink>
          </motion.div>
        </motion.div>

        {/* Photograph panel */}
        <motion.div style={{ y: panelY }} className="relative lg:col-span-5">
          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.5, ease: EASE, delay: 0.35 }}
            className="relative aspect-[5/4] overflow-hidden rounded-[3px] sm:aspect-[16/10] lg:aspect-[4/5] lg:max-h-[68svh] lg:w-full"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={slides[current].src}
                  alt={slides[current].alt}
                  fill
                  priority={current === 0}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="animate-kenburns object-cover"
                  style={{ objectPosition: slides[current].position }}
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/10" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
              <AnimatePresence mode="wait">
                <motion.p
                  key={current}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="eyebrow text-white/90"
                >
                  {slides[current].caption}
                </motion.p>
              </AnimatePresence>
              <p className="eyebrow tabular-nums text-white/70">
                {String(current + 1).padStart(2, "0")}
                <span className="mx-1.5 opacity-50">/</span>
                {String(slides.length).padStart(2, "0")}
              </p>
            </div>
          </motion.div>

          {/* Rotating seal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 1.1 }}
            className="absolute -left-6 -top-10 hidden size-32 lg:block xl:-left-14 xl:size-36"
          >
            <div className="relative size-full rounded-full bg-wheat text-ink">
              <svg
                viewBox="0 0 100 100"
                className="size-full animate-[spin_26s_linear_infinite]"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="seal-path"
                    d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
                  />
                </defs>
                <text
                  fill="currentColor"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "7px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  <textPath href="#seal-path" textLength="226" lengthAdjust="spacing">
                    Research · Training · Enterprise · Partnership ·
                  </textPath>
                </text>
              </svg>
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid size-[52%] place-items-center rounded-full bg-white">
                  <Image
                    src="/brand/tcoefs-logo.png"
                    alt=""
                    width={80}
                    height={69}
                    className="h-auto w-[72%]"
                  />
                </span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        className="relative border-t border-line-inverse"
      >
        <div className="shell flex items-center justify-between gap-6 py-5">
          <p className="eyebrow hidden text-white/50 sm:block">
            {site.coordinates}
            <span className="mx-3 opacity-50">/</span>
            Naraguta Campus, Jos
          </p>
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Hero photographs"
          >
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-label={`Show photograph ${i + 1}: ${slide.caption}`}
                onClick={() => setCurrent(i)}
                className="group relative h-6 w-8 sm:w-10"
              >
                <span className="absolute inset-x-0 top-1/2 h-px bg-white/25 transition-colors group-hover:bg-white/60" />
                {i === current && (
                  <motion.span
                    key={current}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                    className="absolute inset-x-0 top-1/2 h-px origin-left bg-wheat"
                  />
                )}
              </button>
            ))}
          </div>
          <a
            href="#about"
            className="eyebrow group flex items-center gap-3 text-white/70 transition-colors hover:text-white"
          >
            Scroll
            <span className="relative block h-8 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_cubic-bezier(0.16,1,0.3,1)_infinite] bg-wheat" />
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
