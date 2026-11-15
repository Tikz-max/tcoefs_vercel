"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE, Reveal, SplitText } from "@/components/site/motion";
import { Eyebrow, TextLink } from "@/components/site/ui";

const faqs = [
  {
    question:
      "What is the TETFund Centre of Excellence in Food Security (TCoEFS)?",
    answer:
      "The TCoEFS is a specialised Centre established at the University of Jos through the Tertiary Education Trust Fund (TETFund). Its mandate is to advance research, training, innovation, and policy development in food security, with a focus on sustainable agricultural practices and institutional capacity building.",
  },
  {
    question: "What are the main objectives of the Centre?",
    answer: "The Centre is designed to:",
    points: [
      "Promote world-class research in food security and agriculture.",
      "Build capacity through postgraduate training and staff development.",
      "Drive innovation and knowledge transfer in agriculture and related sectors.",
      "Foster partnerships with government, industry, and development agencies.",
      "Support evidence-based policy for sustainable food systems.",
    ],
  },
  {
    question: "Who can participate in the Centre's programmes?",
    answer: "Participation is open to:",
    points: [
      "Postgraduate students and researchers in agriculture, food security, and related disciplines.",
      "Academic staff and institutional partners seeking capacity development.",
      "Policymakers, industry stakeholders, and NGOs interested in agricultural innovation.",
      "Local communities and farmer organisations through outreach and training programmes.",
    ],
  },
  {
    question: "What training opportunities does the Centre offer?",
    answer: "The TCoEFS offers:",
    points: [
      "Postgraduate programmes (Masters and PhD) with interdisciplinary curricula.",
      "Short-term training courses and workshops on food security, innovation, and sustainable agriculture.",
      "Capacity-building sessions for staff, industry stakeholders, and policymakers.",
      "Farmer-focused training through demonstration plots and Farmer Field Business Schools (FFBS).",
    ],
  },
  {
    question: "How does the Centre collaborate with industry and stakeholders?",
    answer:
      "The Centre actively fosters partnerships with industry players, research institutions, NGOs, and government agencies. These collaborations focus on:",
    points: [
      "Joint research projects.",
      "Innovation and entrepreneurship programmes.",
      "Policy engagement and advocacy.",
      "Technology transfer and commercialisation of research outputs.",
    ],
  },
  {
    question: "How is the Centre contributing to national development?",
    answer: "TCoEFS contributes to Nigeria's food security agenda by:",
    points: [
      "Developing human capital through advanced training.",
      "Strengthening agricultural value chains.",
      "Promoting climate-smart and regenerative agricultural practices.",
      "Influencing agricultural policies that improve productivity, resilience, and sustainability.",
    ],
  },
  {
    question: "Can external organisations partner with the Centre?",
    answer:
      "Yes. The Centre welcomes collaborations with universities, development partners, private sector organisations, and donor agencies. Partnerships are structured to promote innovation, research, and capacity building in food systems.",
  },
  {
    question: "How can students apply for programmes at the Centre?",
    answer:
      "Admission into postgraduate programmes is managed through the University of Jos. Applicants can visit the University's admission portal or contact the Centre directly for programme details, eligibility, and application guidelines.",
  },
  {
    question: "How is the Centre funded?",
    answer:
      "The Centre is primarily funded by the Tertiary Education Trust Fund (TETFund), with additional support from external partners, research grants, and collaborative projects.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-mist py-24 sm:py-32 lg:py-40">
      <div className="shell grid gap-x-12 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal y={12}>
              <Eyebrow index="08" className="mb-6">
                Frequently asked
              </Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text="Questions, *answered.*"
              className="display display-lg block"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xs text-[0.9875rem] leading-relaxed text-stone">
                Cannot find what you are looking for? The Centre's team will be
                glad to help.
              </p>
              <TextLink href="/contact" className="mt-6 text-pine">
                Ask the Centre
              </TextLink>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <ul className="border-b border-ink/20">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <Reveal as="li" key={faq.question} delay={i * 0.03} y={14}>
                  <div className="border-t border-ink/20">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-trigger-${i}`}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                      >
                        <span
                          className={`font-display text-[1.25rem] leading-snug tracking-[-0.01em] transition-colors duration-300 sm:text-[1.4rem] ${
                            isOpen ? "text-pine" : "text-ink group-hover:text-pine"
                          }`}
                        >
                          {faq.question}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`relative mt-1 grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${
                            isOpen
                              ? "border-pine bg-pine text-paper"
                              : "border-ink/25 group-hover:border-pine"
                          }`}
                        >
                          <span className="absolute h-px w-3 bg-current" />
                          <span
                            className={`absolute h-3 w-px bg-current transition-transform duration-500 ease-expo ${
                              isOpen ? "rotate-90 scale-y-0" : ""
                            }`}
                          />
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          role="region"
                          aria-labelledby={`faq-trigger-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.6, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="max-w-2xl pb-8 pr-10 text-[1rem] leading-relaxed text-stone">
                            <p>{faq.answer}</p>
                            {faq.points && (
                              <ul className="mt-4 space-y-2.5">
                                {faq.points.map((point) => (
                                  <li key={point} className="flex gap-3">
                                    <span
                                      aria-hidden="true"
                                      className="mt-[0.65em] h-px w-4 shrink-0 bg-wheat-deep"
                                    />
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
