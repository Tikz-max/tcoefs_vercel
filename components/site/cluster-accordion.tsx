"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE, Reveal } from "@/components/site/motion";

export type Cluster = {
  id: string;
  number: string;
  name: string;
  focus: string;
  programmes: { title: string; degrees: string[] }[];
};

const degreeTone: Record<string, string> = {
  PGD: "border-ink/25 text-ink",
  MSc: "border-pine bg-pine text-paper",
  PhD: "border-ink bg-ink text-paper",
  MBA: "border-wheat bg-wheat text-ink",
};

/** Expandable list of postgraduate programme clusters. */
export function ClusterAccordion({ clusters }: { clusters: Cluster[] }) {
  const [open, setOpen] = useState<string>(clusters[0]?.id ?? "");

  return (
    <ul className="border-b border-ink/20">
      {clusters.map((cluster, i) => {
        const isOpen = open === cluster.id;
        return (
          <Reveal as="li" key={cluster.id} delay={i * 0.05} y={16}>
            <div className="border-t border-ink/20">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? "" : cluster.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${cluster.id}-panel`}
                  className="group grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-6 py-8 text-left lg:grid-cols-12 lg:gap-x-10 lg:py-10"
                >
                  <span className="eyebrow pt-2 text-wheat-deep lg:col-span-1">
                    {cluster.number}
                  </span>
                  <span className="lg:col-span-10">
                    <span
                      className={`display display-md block transition-colors duration-500 ${
                        isOpen ? "text-pine" : "text-ink group-hover:text-pine"
                      }`}
                    >
                      {cluster.name}
                    </span>
                    <span className="mt-3 block max-w-2xl text-[0.9875rem] leading-relaxed text-stone">
                      {cluster.focus}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`relative mt-1 grid size-10 shrink-0 place-items-center justify-self-end rounded-full border transition-colors duration-500 lg:col-span-1 ${
                      isOpen
                        ? "border-pine bg-pine text-paper"
                        : "border-ink/25 group-hover:border-pine"
                    }`}
                  >
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span
                      className={`absolute h-3.5 w-px bg-current transition-transform duration-500 ease-expo ${
                        isOpen ? "rotate-90 scale-y-0" : ""
                      }`}
                    />
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`${cluster.id}-panel`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.65, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <ul className="grid gap-px pb-10 lg:grid-cols-12 lg:gap-x-10">
                      <li className="hidden lg:col-span-1 lg:block" />
                      <li className="lg:col-span-10">
                        <ul className="overflow-hidden rounded-lg bg-white ring-1 ring-ink/10">
                          {cluster.programmes.map((programme) => (
                            <li
                              key={programme.title}
                              className="flex flex-col justify-between gap-3 border-b border-line px-6 py-5 last:border-b-0 sm:flex-row sm:items-center"
                            >
                              <span className="text-[1.125rem] font-semibold leading-snug text-ink">
                                {programme.title}
                              </span>
                              <span className="flex shrink-0 gap-1.5">
                                {programme.degrees.map((degree) => (
                                  <span
                                    key={degree}
                                    className={`eyebrow rounded-full border px-3 py-1.5 ${
                                      degreeTone[degree] ?? "border-ink/25 text-ink"
                                    }`}
                                  >
                                    {degree}
                                  </span>
                                ))}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
