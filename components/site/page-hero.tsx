"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { EASE, SplitText } from "@/components/site/motion";
import { Contours } from "@/components/site/ui";

type Crumb = { label: string; href?: string };

/**
 * Opening band for every inner page: dark surface, contour lines,
 * breadcrumb, animated serif title and an optional photograph.
 */
export function PageHero({
  crumbs,
  title,
  lede,
  image,
  imageAlt = "",
  imagePosition = "center",
  meta,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  lede?: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  meta?: string[];
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section
      ref={ref}
      className="grain relative overflow-hidden bg-forest text-white"
    >
      <Contours
        seed={crumbs.length + title.length}
        className="absolute -left-[25%] top-[-20%] h-[150%] w-[95%] text-white/[0.06]"
      />

      <div
        className={`shell relative grid gap-x-12 gap-y-12 pb-16 pt-36 sm:pt-44 lg:pb-24 ${
          image ? "lg:grid-cols-12 lg:items-end" : ""
        }`}
      >
        <motion.div
          style={{ y: textY }}
          className={image ? "lg:col-span-7" : "max-w-5xl"}
        >
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="eyebrow mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sage"
          >
            <span aria-hidden="true" className="h-px w-8 bg-wheat" />
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-3">
                <span aria-hidden="true" className="opacity-40">
                  /
                </span>
                {c.href ? (
                  <Link
                    href={c.href}
                    className="transition-colors hover:text-white"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
              </span>
            ))}
          </motion.nav>

          <SplitText
            as="h1"
            immediate
            delay={0.15}
            text={title}
            className="display display-xl block text-white"
          />

          {lede && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.55 }}
              className="lede mt-8 max-w-xl text-white/70"
            >
              {lede}
            </motion.p>
          )}

          {(meta || children) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.7 }}
              className="mt-10"
            >
              {meta && (
                <ul className="flex flex-wrap gap-2">
                  {meta.map((m) => (
                    <li
                      key={m}
                      className="eyebrow rounded-full border border-white/20 px-3.5 py-2 text-white/80"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              )}
              {children}
            </motion.div>
          )}
        </motion.div>

        {image && (
          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.25 }}
            className="relative aspect-[4/3] overflow-hidden rounded-[3px] lg:col-span-5 lg:aspect-[4/5]"
          >
            <motion.div
              style={{ y: imageY }}
              className="absolute inset-x-0 -top-[8%] bottom-[-8%]"
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="animate-kenburns object-cover"
                style={{ objectPosition: imagePosition }}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
