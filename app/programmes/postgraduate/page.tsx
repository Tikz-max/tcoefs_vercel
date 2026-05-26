"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";

// ─── Data ─────────────────────────────────────────────────────────────────────

const clusters = [
  {
    id: "cluster-1",
    number: "01",
    name: "Environment, Disaster Risk Management and Gender",
    focus:
      "Addressing climate change, disaster resilience, and inclusive agricultural development.",
    programmes: [
      {
        title: "Climate Change & Sustainable Food Security",
        degrees: ["PGD", "MSc", "PhD"],
      },
      {
        title: "Disaster Risk Management in Agriculture & Food Security",
        degrees: ["PGD", "MSc", "PhD"],
      },
      {
        title: "Gender, Agriculture & Rural Development",
        degrees: ["PGD", "MSc", "PhD"],
      },
    ],
  },
  {
    id: "cluster-2",
    number: "02",
    name: "Agricultural Economics, Extension, Innovation and Communication",
    focus:
      "Strengthening agribusiness systems, market innovation, policy analysis, and agricultural communication.",
    programmes: [
      {
        title: "Agricultural Economics & Food Systems Innovation",
        degrees: ["MSc", "PhD"],
      },
      {
        title: "MBA: Agribusiness",
        degrees: ["MBA"],
      },
      {
        title: "Agricultural Communication Innovations",
        degrees: ["PGD", "MSc", "PhD"],
      },
    ],
  },
  {
    id: "cluster-3",
    number: "03",
    name: "Livestock Production and Animal Health",
    focus:
      "Advancing livestock productivity, climate resilience, and animal health systems.",
    programmes: [
      {
        title: "Livestock Science & Climate Resilience",
        degrees: ["PGD", "MSc", "PhD"],
      },
      {
        title: "Livestock Production & Animal Health",
        degrees: ["PGD", "MSc", "PhD"],
      },
    ],
  },
  {
    id: "cluster-4",
    number: "04",
    name: "Crop and Biotechnology",
    focus:
      "Enhancing crop protection, seed systems, and biotechnology-driven agricultural productivity.",
    programmes: [
      {
        title: "Crop Protection",
        degrees: ["PGD", "MSc", "PhD"],
      },
      {
        title: "Seed Science & Technology",
        degrees: ["PGD", "MSc", "PhD"],
      },
    ],
  },
];

// Tinted pill per degree level — all within the established green palette
const degreeStyle: Record<string, string> = {
  PGD: "bg-[#2d5a2d]/10 text-[#2d5a2d]",
  MSc: "bg-[#4a5b4a]/10 text-[#4a5b4a]",
  PhD: "bg-[#2f3e2f]/10 text-[#2f3e2f]",
  MBA: "bg-[#5a7c65]/10 text-[#5a7c65]",
};

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PostgraduateProgrammesPage() {
  // First cluster open by default — establishes the pattern before users interact
  const [openCluster, setOpenCluster] = useState<string>("cluster-1");

  const toggle = (id: string) => {
    setOpenCluster((prev) => (prev === id ? "" : id));
  };

  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <AnimatedSection animation="fade">
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          {/* Background photo */}
          <Image
            src="/agricultural-research-lab.png"
            alt="Laboratory research at TCoEFS"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* Layered white veil — text legibility over any image */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/97" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-white/82 to-white/98" />

          {/* Content */}
          <div className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight mb-6">
                Postgraduate Programmes in Food Security and Sustainable
                Agriculture
              </h1>

              {/* Decorative rule */}
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#2d5a2d]/40 to-transparent mx-auto mb-6" />

              <p className="text-xl text-[#4a5b4a] leading-relaxed max-w-2xl mx-auto">
                Advanced academic pathways aligned with climate resilience,
                agricultural innovation, and food systems transformation.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Section 1: Introduction ──────────────────────────────────────────── */}
      <AnimatedSection animation="slide-right">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            {/* Section opening */}
            <div className="mb-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Overview
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight max-w-2xl">
                A Comprehensive Academic Framework
              </h2>
            </div>

            {/* Body */}
            <div className="space-y-5">
              <p className="text-lg text-[#4a5b4a] leading-relaxed">
                The TETFund Centre of Excellence in Food Security has developed
                a comprehensive suite of postgraduate programmes aligned with
                national priorities and TETFund thematic expectations.
              </p>
              <p className="text-[#4a5b4a] leading-relaxed border-l-4 border-[#2d5a2d] pl-6">
                These programmes have been approved by the University of Jos
                Postgraduate Board and submitted for final institutional
                processes. They are structured to strengthen interdisciplinary
                expertise, research capacity, and enterprise-oriented
                agricultural transformation.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Section 2: Programme Structure ───────────────────────────────────── */}
      <AnimatedSection animation="slide-up" delay={100}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
          <div className="max-w-4xl mx-auto">
            {/* Section opening */}
            <div className="mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Programme Structure
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight max-w-xl">
                Four Thematic Clusters
              </h2>
              <p className="text-lg text-[#4a5b4a] leading-relaxed mt-4 max-w-2xl">
                Programmes are organised across four interdisciplinary clusters,
                each aligned to a strategic thematic area within the TCoEFS
                mandate.
              </p>
            </div>

            {/* Accordion */}
            <div className="space-y-3">
              {clusters.map((cluster) => {
                const isOpen = openCluster === cluster.id;

                return (
                  <div
                    key={cluster.id}
                    className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl"
                  >
                    {/* Trigger */}
                    <button
                      onClick={() => toggle(cluster.id)}
                      className="w-full px-6 py-5 text-left flex items-start gap-5 hover:bg-white/50 transition-colors duration-200"
                      aria-expanded={isOpen}
                    >
                      {/* Cluster ordinal */}
                      <span className="flex-shrink-0 text-xs font-bold text-[#2d5a2d]/40 uppercase tracking-widest pt-0.5 w-5">
                        {cluster.number}
                      </span>

                      {/* Label + focus */}
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-[#2f3e2f] leading-snug mb-1">
                          {cluster.name}
                        </p>
                        <p className="text-sm text-[#4a5b4a] leading-relaxed">
                          {cluster.focus}
                        </p>
                      </div>

                      {/* Chevron */}
                      <ChevronDown
                        className="flex-shrink-0 w-5 h-5 text-[#2d5a2d] transition-transform duration-300 mt-0.5"
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </button>

                    {/* Expanded content */}
                    {isOpen && (
                      <div className="px-6 pb-5 border-t border-gray-100">
                        <div className="divide-y divide-gray-50">
                          {cluster.programmes.map((programme) => (
                            <div
                              key={programme.title}
                              className="flex items-center justify-between gap-4 py-3.5"
                            >
                              {/* Programme name */}
                              <div className="flex items-center gap-3 min-w-0">
                                <span className="flex-shrink-0 w-1 h-1 rounded-full bg-[#2d5a2d]/40" />
                                <span className="text-sm font-medium text-[#2f3e2f] leading-snug">
                                  {programme.title}
                                </span>
                              </div>

                              {/* Degree pills */}
                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                {programme.degrees.map((degree) => (
                                  <span
                                    key={degree}
                                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                      degreeStyle[degree] ??
                                      "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    {degree}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Horizontal Strip ─────────────────────────────────────────────────── */}
      <div className="border-y border-[#2d5a2d]/10 bg-[#2d5a2d]/[0.04] py-10 px-4 sm:px-6 lg:px-8">
        <p className="text-base md:text-lg font-medium text-[#2f3e2f] leading-relaxed text-center max-w-3xl mx-auto">
          Interdisciplinary research integration, enterprise alignment, and
          climate-smart innovation form the foundation of all postgraduate
          programmes at TCoEFS.
        </p>
      </div>

      {/* ── Section 3: Admission & Enquiries ─────────────────────────────────── */}
      <AnimatedSection animation="fade" delay={100}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-[#4a5b4a] leading-relaxed mb-8">
              Prospective applicants are encouraged to contact the Centre for
              updates on programme rollout timelines, admission procedures, and
              detailed curriculum information.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] hover:from-[#4a5b4a] hover:to-[#2d5a2d] text-white px-7 py-3.5 rounded-lg font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              Contact the Centre
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
