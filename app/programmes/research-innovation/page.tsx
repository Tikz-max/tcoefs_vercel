"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sprout,
  Beef,
  Wheat,
  TrendingUp,
  Package,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";

// ─── Data ──────────────────────────────────────────────────────────────────────

const researchAreas = [
  {
    number: "01",
    icon: Sprout,
    title: "Climate-Smart Agriculture",
    description:
      "Research on adaptive production systems, water-efficient technologies, agroforestry integration, and climate-resilient cropping models.",
  },
  {
    number: "02",
    icon: Beef,
    title: "Livestock Productivity & Resilience",
    description:
      "Studies on animal nutrition, low-cost feed formulation, greenhouse gas mitigation, livestock genetics, disease management, and sustainable value chains.",
  },
  {
    number: "03",
    icon: Wheat,
    title: "Crop Protection & Seed Systems",
    description:
      "Research in crop protection, seed science, biotechnology applications, seed quality management, and sustainable crop productivity.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Agricultural Economics & Food Systems Innovation",
    description:
      "Policy analysis, agribusiness models, value chain optimisation, extension systems, food systems transformation, and market integration strategies.",
  },
  {
    number: "05",
    icon: Package,
    title: "Post-Harvest Systems & Value Addition",
    description:
      "Improving storage systems, processing technologies, loss reduction strategies, and commercialisation pathways.",
  },
  {
    number: "06",
    icon: Users,
    title: "Gender, Extension & Inclusive Systems",
    description:
      "Promoting inclusive agricultural development, gender-responsive research, participatory extension approaches, and community-centred innovation.",
  },
];

const capacityItems = [
  "Appointment of over 20 Scientific Team members",
  "Engagement of a dedicated Agricultural Data Analyst",
  "Expansion of laboratory and greenhouse infrastructure",
  "Activation of structured documentation and reporting systems",
  "Strategic partnerships with national and international institutions",
];

const enterprisePoints = [
  "Practical validation of research outputs",
  "Revenue sustainability",
  "Applied training integration",
  "Scalable production demonstration",
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ResearchInnovationPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <Navbar />

      {/* ── Hero — left-aligned, tinted background, no photo overlay ─────────── */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d5a2d]/[0.07] via-white to-[#4a5b4a]/[0.03]" />

        {/* Faint large letterform — typographic texture, not decoration */}
        <div
          className="absolute right-0 top-0 bottom-0 flex items-center pr-8 pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="text-[20rem] font-bold leading-none text-[#2f3e2f]/[0.025] tracking-tighter">
            R&I
          </span>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="max-w-2xl">
            {/* Left-anchored rule */}
            <div className="w-10 h-px bg-gradient-to-r from-[#2d5a2d]/50 to-transparent mb-8" />

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2f3e2f] leading-none tracking-tight mb-8">
              Research
              <br />
              <span className="text-[#4a5b4a] font-normal">& Innovation.</span>
            </h1>

            <p className="text-xl text-[#4a5b4a] leading-relaxed max-w-xl">
              Interdisciplinary research advancing resilient, inclusive, and
              enterprise-driven food systems.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 1: Introduction — 2-col, no heading ──────────────────────── */}
      <AnimatedSection animation="fade">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              <p className="text-lg text-[#4a5b4a] leading-relaxed">
                The TETFund Centre of Excellence in Food Security conducts
                applied, interdisciplinary research focused on strengthening
                sustainable agricultural systems, climate resilience, livestock
                productivity, seed systems, agribusiness innovation, and
                inclusive food system transformation.
              </p>
              <p className="text-[#4a5b4a] leading-relaxed border-l-4 border-[#2d5a2d] pl-6 self-start">
                Research activities are aligned with TETFund performance
                standards and national development priorities, integrating
                laboratory experimentation, greenhouse trials, field
                demonstrations, and enterprise-based production systems.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Section 2: Core Research Thematic Areas — 3×2 numbered grid ─────── */}
      <AnimatedSection animation="slide-up" delay={100}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
          <div className="max-w-6xl mx-auto">
            {/* Section opening */}
            <div className="mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Thematic Areas
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight max-w-xl">
                Core Research Areas
              </h2>
            </div>

            {/* 3×2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {researchAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <div
                    key={area.number}
                    className="group relative overflow-hidden bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#5a7c65]/30 flex flex-col"
                  >
                    {/* Signature hover accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />

                    {/* Ghost ordinal — typographic, not decorative */}
                    <span
                      className="absolute bottom-4 right-4 text-6xl font-bold text-[#2f3e2f]/[0.04] leading-none select-none pointer-events-none"
                      aria-hidden="true"
                    >
                      {area.number}
                    </span>

                    {/* Icon */}
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-[#2d5a2d]/10 text-[#2d5a2d] mb-5 group-hover:scale-110 group-hover:rotate-1 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold text-[#2f3e2f] mb-3 leading-snug">
                      {area.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#4a5b4a] leading-relaxed flex-1">
                      {area.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Section 3: Research Capacity — tinted strip, no badge+H2 ─────────── */}
      <AnimatedSection animation="slide-right">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#2d5a2d]/[0.05]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left: statement */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2d5a2d] mb-5">
                  Research Capacity
                </p>
                <p className="text-3xl md:text-4xl font-bold text-[#2f3e2f] leading-tight">
                  Strengthening delivery from the inside out.
                </p>
                <p className="text-[#4a5b4a] leading-relaxed mt-5">
                  The Centre has invested in people, infrastructure, and systems
                  to ensure research outputs meet the highest standards of
                  rigour and institutional accountability.
                </p>
              </div>

              {/* Right: capacity list */}
              <div className="space-y-4">
                {capacityItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] flex items-center justify-center text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-[#4a5b4a] text-base leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Section 4: Partnerships — centered statement + CTA ───────────────── */}
      <AnimatedSection animation="fade" delay={100}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-10 h-px bg-gradient-to-r from-transparent via-[#2d5a2d]/40 to-transparent mx-auto mb-10" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#2f3e2f] leading-tight mb-6">
              Collaborative Research & Partnerships
            </h2>
            <p className="text-lg text-[#4a5b4a] leading-relaxed mb-4">
              TCoEFS collaborates with academic institutions, development
              agencies, private-sector partners, and government bodies to
              promote research integration, knowledge transfer, and policy
              impact.
            </p>
            <p className="text-[#4a5b4a] leading-relaxed mb-10">
              Key collaborative engagements include partnerships related to
              agroforestry systems, livestock productivity, curriculum
              development, and sustainable agricultural transformation.
            </p>
            <Link
              href="/partnerships"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] hover:from-[#4a5b4a] hover:to-[#2d5a2d] text-white px-7 py-3.5 rounded-lg font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              Explore Partnerships
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Section 5: Enterprise-Integrated Research — split card ───────────── */}
      <AnimatedSection animation="slide-left" delay={100}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left: statement panel */}
                <div className="p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2d5a2d] mb-5">
                    Enterprise Integration
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#2f3e2f] leading-tight mb-5">
                    Research built to perform beyond the laboratory.
                  </h3>
                  <p className="text-[#4a5b4a] leading-relaxed">
                    Research at TCoEFS is integrated with enterprise-based
                    production models, strengthening the Centre's innovation
                    ecosystem and enabling outcomes that reach farmers, markets,
                    and policy.
                  </p>
                </div>

                {/* Right: enablers list */}
                <div className="p-10 lg:p-12">
                  <p className="text-sm font-semibold text-[#2f3e2f] mb-6">
                    This integration enables:
                  </p>
                  <div className="space-y-5">
                    {enterprisePoints.map((point, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-8 h-px bg-gradient-to-r from-[#2d5a2d]/40 to-transparent" />
                        <p className="text-[#4a5b4a] text-base leading-relaxed">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
