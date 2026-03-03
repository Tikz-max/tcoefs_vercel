"use client";

import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";
import {
  CheckCircle2,
  Leaf,
  Sprout,
  FlaskConical,
  TrendingUp,
  Users,
  Building2,
  Layers,
} from "lucide-react";

const bulletIcon = (
  <CheckCircle2 className="w-4 h-4 text-[#2d5a2d] flex-shrink-0 mt-0.5" />
);

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 mt-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          {bulletIcon}
          <span className="text-[#4a5b4a] text-base leading-relaxed">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

const sustainabilityItems = [
  "Financial sustainability",
  "Practical student training",
  "Research validation",
  "Community engagement",
  "Institutional competitiveness",
];

const poultryItems = [
  "Enterprise viability",
  "Revenue-generating capacity",
  "Integration of research and training",
  "Applied livestock management systems",
  "Alignment with TETFund Disbursement-Linked Indicators",
];

const greenhouseItems = [
  "Demonstrate controlled environment agriculture",
  "Strengthen enterprise-based learning",
  "Enhance internal revenue generation",
  "Promote scalable crop production systems",
];

const farmlandItems = [
  "Agroforestry demonstrations",
  "Crop production trials",
  "Livestock pasture development",
  "Postgraduate field research",
  "Farmer-focused demonstration activities",
];

const sustainabilityCards = [
  {
    icon: TrendingUp,
    title: "Financial Sustainability",
    desc: "Enterprise revenues support Centre operations and reduce dependence on external funding cycles.",
  },
  {
    icon: Users,
    title: "Practical Student Training",
    desc: "Students gain real-world agricultural enterprise experience embedded within academic programmes.",
  },
  {
    icon: FlaskConical,
    title: "Research Validation",
    desc: "Production systems provide live validation environments for applied research outputs.",
  },
  {
    icon: Layers,
    title: "Community Engagement",
    desc: "Demonstration farms serve as knowledge transfer hubs for local farmers and stakeholders.",
  },
  {
    icon: Building2,
    title: "Institutional Competitiveness",
    desc: "Enterprise models strengthen TCoEFS positioning as a self-sustaining centre of excellence.",
  },
];

export default function EnterpriseDemonstrationPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <AnimatedSection animation="fade">
        <section className="relative h-[480px] md:h-[540px] flex items-end overflow-hidden">
          {/* Background image */}
          <Image
            src="/ENTERPRISE_and_DEMONSTRATION/greenhouse-inspection-opt.webp"
            alt="Greenhouse production at TCoEFS"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f2010]/80 via-[#0f2010]/40 to-transparent" />

          {/* Hero text */}
          <div className="relative z-10 px-6 sm:px-10 lg:px-16 pb-14 max-w-5xl">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-xs sm:text-sm font-medium mb-5">
              TCoEFS — Enterprise & Demonstration
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Enterprise and Demonstration
            </h1>
            <div className="w-16 h-0.5 bg-[#f4c542] mb-5" />
            <p className="text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
              Integrating research, production, and sustainability through
              practical enterprise models.
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Section 1: Introduction ───────────────────────────────────────────── */}
      <AnimatedSection animation="slide-up">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Overview
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2f3e2f] leading-tight max-w-2xl">
                Driving Impact Through Enterprise
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <p className="text-lg text-[#4a5b4a] leading-relaxed">
                  The TETFund Centre of Excellence in Food Security integrates
                  enterprise-driven agricultural production into its operational
                  framework to promote sustainability, practical training, and
                  measurable impact.
                </p>
              </div>
              <div>
                <p className="text-[#4a5b4a] leading-relaxed text-base">
                  Through structured demonstration models, the Centre validates
                  research outputs, supports revenue generation, and provides
                  hands-on learning platforms for students and stakeholders.
                </p>
              </div>
            </div>

            {/* Intro stats bar */}
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  value: "1,550",
                  label: "Broilers Reared & Marketed",
                  icon: Leaf,
                },
                {
                  value: "4 ha",
                  label: "Allocated Demonstration Farmland",
                  icon: Sprout,
                },
                {
                  value: "3–4 kg",
                  label: "Average Maturity Weight per Bird",
                  icon: TrendingUp,
                },
              ].map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className="group relative overflow-hidden bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />
                  <div className="w-10 h-10 rounded-lg bg-[#2d5a2d]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#2d5a2d]" />
                  </div>
                  <div className="text-3xl font-bold text-[#2d5a2d] mb-1">
                    {value}
                  </div>
                  <div className="text-sm text-[#4a5b4a] leading-snug">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Section 2: Poultry Production ─────────────────────────────────────── */}
      <AnimatedSection animation="slide-right" delay={80}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/40">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image left */}
              <div className="relative pb-6 lg:pb-0">
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                  <Image
                    src="/ENTERPRISE_and_DEMONSTRATION/poultry-2-opt.webp"
                    alt="Broiler production enterprise at TCoEFS"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 right-3 sm:-right-4 bg-white rounded-xl shadow-lg px-5 py-3 border border-gray-100">
                  <span className="text-2xl font-bold text-[#2d5a2d]">
                    1,550
                  </span>
                  <p className="text-xs text-[#4a5b4a] mt-0.5">
                    Broilers — Dec 2025
                  </p>
                </div>
                {/* Second image thumbnail */}
                <div className="absolute -top-4 -left-4 w-24 h-24 rounded-xl overflow-hidden shadow-lg border-2 border-white hidden lg:block">
                  <Image
                    src="/ENTERPRISE_and_DEMONSTRATION/poultry-1-opt.webp"
                    alt="Poultry facility detail"
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              </div>

              {/* Text right */}
              <div>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                  Poultry Production Initiative
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#2f3e2f] leading-tight mb-5">
                  Broiler Production Enterprise
                </h2>
                <p className="text-[#4a5b4a] leading-relaxed mb-3">
                  In alignment with institutional sustainability objectives, the
                  Centre initiated a structured broiler production enterprise.
                </p>
                <p className="text-[#4a5b4a] leading-relaxed">
                  In December 2025, TCoEFS successfully reared and marketed{" "}
                  <span className="font-semibold text-[#2f3e2f]">
                    1,550 broiler chickens
                  </span>
                  , each averaging{" "}
                  <span className="font-semibold text-[#2f3e2f]">
                    3–4 kg at maturity
                  </span>
                  .
                </p>

                <p className="text-sm font-semibold text-[#2f3e2f] mt-6 mb-1">
                  This initiative demonstrated:
                </p>
                <BulletList items={poultryItems} />

                <p className="text-sm text-[#4a5b4a] mt-5 italic border-l-4 border-[#2d5a2d] pl-4">
                  The poultry initiative serves as a scalable demonstration
                  model for sustainable livestock production.
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Section 3: Greenhouse Enterprise ──────────────────────────────────── */}
      <AnimatedSection animation="slide-left" delay={80}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text left */}
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                  Greenhouse Enterprise Expansion
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#2f3e2f] leading-tight mb-5">
                  Greenhouse Crop Production Enterprise
                </h2>
                <p className="text-[#4a5b4a] leading-relaxed mb-3">
                  The Centre is expanding greenhouse-based commercial production
                  to strengthen enterprise sustainability and support
                  climate-smart agricultural systems.
                </p>
                <p className="text-[#4a5b4a] leading-relaxed">
                  Greenhouse bell pepper cultivation and additional high-value
                  crop production initiatives are underway to:
                </p>
                <BulletList items={greenhouseItems} />

                <p className="text-sm text-[#4a5b4a] mt-5 italic border-l-4 border-[#2d5a2d] pl-4">
                  This initiative complements research, training, and
                  postgraduate experimentation.
                </p>
              </div>

              {/* Image right */}
              <div className="order-1 lg:order-2 relative pb-6 lg:pb-0">
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                  <Image
                    src="/ENTERPRISE_and_DEMONSTRATION/greenhouse-1-opt.webp"
                    alt="Greenhouse crop production at TCoEFS"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Second greenhouse image thumbnail */}
                <div className="absolute -bottom-4 -left-4 w-28 h-20 rounded-xl overflow-hidden shadow-lg border-2 border-white hidden lg:block">
                  <Image
                    src="/ENTERPRISE_and_DEMONSTRATION/greenhouse-inspection-opt.webp"
                    alt="Greenhouse inspection"
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                {/* Badge */}
                <div className="absolute top-3 right-3 sm:-top-4 sm:-right-4 bg-[#2d5a2d] rounded-xl shadow-lg px-4 py-3 text-center">
                  <span className="text-white text-sm font-semibold leading-tight block">
                    Climate-Smart
                  </span>
                  <span className="text-[#f4c542] text-xs">Agriculture</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Section 4: Research & Demonstration Farmland ──────────────────────── */}
      <AnimatedSection animation="fade" delay={60}>
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background image */}
          <Image
            src="/ENTERPRISE_and_DEMONSTRATION/farm-land-opt.webp"
            alt="Demonstration farmland at TCoEFS"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#0f2010]/70" />

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-sm font-medium mb-4">
                  Research & Demonstration Farmland
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                  Integrated Field Demonstration Systems
                </h2>
                <p className="text-white/80 leading-relaxed">
                  The allocated{" "}
                  <span className="text-white font-semibold">
                    four hectares of farmland
                  </span>{" "}
                  provide a platform for multidisciplinary agricultural
                  research, demonstration, and training activities.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 sm:p-8">
                <p className="text-white/70 text-sm font-semibold uppercase tracking-wider mb-5">
                  This platform supports:
                </p>
                <ul className="space-y-3">
                  {farmlandItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#f4c542] flex-shrink-0 mt-0.5" />
                      <span className="text-white/85 text-base leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Section 5: Enterprise-Based Sustainability Model ──────────────────── */}
      <AnimatedSection animation="slide-up" delay={80}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            {/* Heading */}
            <div className="mb-12 text-center">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Enterprise-Based Sustainability Model
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2f3e2f] leading-tight max-w-2xl mx-auto">
                Sustainability Through Integrated Enterprise
              </h2>
              <p className="text-[#4a5b4a] mt-4 max-w-2xl mx-auto leading-relaxed">
                By integrating enterprise with academic and research activities,
                TCoEFS ensures operational resilience and long-term impact.
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
              {sustainabilityCards.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group relative overflow-hidden bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#2d5a2d] to-[#4a5b4a] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-[#2f3e2f] mb-2 leading-snug">
                    {title}
                  </h3>
                  <p className="text-sm text-[#4a5b4a] leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom CTA strip with tissue lab image */}
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/ENTERPRISE_and_DEMONSTRATION/tissue-lab-opt.webp"
                alt="TCoEFS tissue culture laboratory"
                width={1200}
                height={400}
                className="w-full h-56 object-cover"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f2010]/80 via-[#0f2010]/50 to-transparent flex items-center">
                <div className="px-5 sm:px-10 py-6 max-w-xl">
                  <p className="text-white/70 text-sm font-semibold uppercase tracking-wider mb-2">
                    The Centre's enterprise model supports:
                  </p>
                  <ul className="space-y-1.5">
                    {sustainabilityItems.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#f4c542] flex-shrink-0" />
                        <span className="text-white/85 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
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
