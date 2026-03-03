import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  FlaskConical,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";

const pathways = [
  {
    icon: GraduationCap,
    overline: "Academic Programmes",
    title: "Postgraduate Programmes",
    description:
      "Advanced academic programmes (PGD, MSc, PhD, and MBA) developed across four thematic areas to build high-level expertise in food systems, climate resilience, livestock systems, crop science, agribusiness, and inclusive agriculture.",
    cta: "Explore Postgraduate Programmes",
    href: "/programmes/postgraduate",
  },
  {
    icon: FlaskConical,
    overline: "Applied Research",
    title: "Research & Innovation",
    description:
      "Interdisciplinary research initiatives addressing climate-smart agriculture, livestock productivity, agroforestry systems, seed science, post-harvest management, and food systems innovation.",
    cta: "Explore Research Areas",
    href: "/programmes/research-innovation",
  },
  {
    icon: Users,
    overline: "Community Impact",
    title: "Training & Extension",
    description:
      "Farmer-focused training, short courses, extension clinics, and capacity-building workshops designed to translate research into measurable community impact.",
    cta: "View Training & Extension",
    href: "/programmes/training-extension",
  },
];

const standards = [
  "Aligned with TETFund Centres of Excellence expectations",
  "Approved by the University of Jos Postgraduate Board (where applicable)",
  "Designed to strengthen enterprise integration and institutional sustainability",
  "Structured to deliver measurable research and training outputs",
];

export default function ProgrammesPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <AnimatedSection animation="fade">
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          {/* Background photo */}
          <Image
            src="/hero/compressed/5.jpg"
            alt="Postgraduate education and research at TCoEFS"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* Layered white veil — keeps text fully legible on any image */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/97" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-white/82 to-white/98" />

          {/* Content */}
          <div className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#2f3e2f] leading-none tracking-tight mb-6">
                Programmes
              </h1>

              {/* Decorative rule */}
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#2d5a2d]/40 to-transparent mx-auto mb-6" />

              <p className="text-xl text-[#4a5b4a] leading-relaxed max-w-2xl mx-auto">
                Academic excellence, applied research, and capacity development
                for sustainable food systems transformation.
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
                Integrated for Impact
              </h2>
            </div>

            {/* Body */}
            <div className="space-y-5">
              <p className="text-lg text-[#4a5b4a] leading-relaxed">
                The TETFund Centre of Excellence in Food Security delivers
                integrated academic, research, and training programmes aligned
                with national priorities and global best practices in
                sustainable agriculture.
              </p>
              <p className="text-[#4a5b4a] leading-relaxed border-l-4 border-[#2d5a2d] pl-6">
                Our programmes are structured to strengthen postgraduate
                education, advance interdisciplinary research, and translate
                knowledge into practical agricultural impact.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Section 2: Programme Pathways ────────────────────────────────────── */}
      <AnimatedSection animation="slide-up" delay={100}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
          <div className="max-w-6xl mx-auto">
            {/* Section opening */}
            <div className="mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Programme Pathways
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight max-w-xl">
                Three Pathways, One Mission
              </h2>
            </div>

            {/* ── Desktop: horizontal pathway with connectors ─────────────────── */}
            <div className="hidden lg:grid lg:grid-cols-[1fr_52px_1fr_52px_1fr] items-stretch">
              {pathways.flatMap((pathway, i) => {
                const Icon = pathway.icon;
                const elements = [];

                if (i > 0) {
                  elements.push(
                    <div
                      key={`connector-${i}`}
                      className="flex items-center justify-center"
                    >
                      <div className="flex items-center gap-1 text-[#2d5a2d]/30">
                        <div className="w-3 h-px bg-[#2d5a2d]/20" />
                        <ArrowRight className="w-4 h-4" />
                        <div className="w-3 h-px bg-[#2d5a2d]/20" />
                      </div>
                    </div>,
                  );
                }

                elements.push(
                  <Link
                    key={pathway.title}
                    href={pathway.href}
                    className="group relative overflow-hidden flex flex-col bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#5a7c65]/30 hover:-translate-y-1"
                  >
                    {/* Signature hover accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl" />

                    {/* Overline + step number */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-bold text-[#4a5b4a]/55 uppercase tracking-widest">
                        {pathway.overline}
                      </span>
                      <span className="text-3xl font-bold text-[#2d5a2d]/[0.07] tabular-nums leading-none select-none">
                        0{i + 1}
                      </span>
                    </div>

                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#2d5a2d] to-[#4a5b4a] mb-5 group-hover:scale-110 group-hover:rotate-1 transition-all duration-300">
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-[#2f3e2f] mb-3 leading-tight">
                      {pathway.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#4a5b4a] leading-relaxed flex-1 mb-6">
                      {pathway.description}
                    </p>

                    {/* CTA ghost link */}
                    <div className="flex items-center gap-1.5 text-[#2d5a2d] text-sm font-medium pt-4 border-t border-gray-100">
                      {pathway.cta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0" />
                    </div>
                  </Link>,
                );

                return elements;
              })}
            </div>

            {/* ── Mobile: vertical pathway with track line ────────────────────── */}
            <div className="lg:hidden relative">
              {/* Vertical track line */}
              <div className="absolute left-[18px] top-8 bottom-8 w-px bg-[#2d5a2d]/15" />

              <div className="space-y-4">
                {pathways.map((pathway, i) => {
                  const Icon = pathway.icon;
                  return (
                    <div key={pathway.title} className="flex items-start gap-5">
                      {/* Track node */}
                      <div className="flex-shrink-0 w-9 flex justify-center pt-8">
                        <div className="w-2.5 h-2.5 rounded-full border-2 border-[#2d5a2d]/45 bg-white z-10" />
                      </div>

                      {/* Card */}
                      <Link
                        href={pathway.href}
                        className="flex-1 group relative overflow-hidden flex flex-col bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#5a7c65]/30"
                      >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl" />

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold text-[#4a5b4a]/55 uppercase tracking-widest">
                            {pathway.overline}
                          </span>
                          <span className="text-xl font-bold text-[#2d5a2d]/[0.08] tabular-nums leading-none select-none">
                            0{i + 1}
                          </span>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#2d5a2d] to-[#4a5b4a] group-hover:scale-110 transition-all duration-300">
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-[#2f3e2f] mb-2 leading-tight">
                              {pathway.title}
                            </h3>
                            <p className="text-sm text-[#4a5b4a] leading-relaxed mb-4">
                              {pathway.description}
                            </p>
                            <div className="flex items-center gap-1.5 text-[#2d5a2d] text-sm font-medium pt-3 border-t border-gray-100">
                              {pathway.cta}
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Section 3: Alignment & Standards ────────────────────────────────── */}
      <AnimatedSection animation="fade" delay={100}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            {/* Section opening */}
            <div className="mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Standards & Alignment
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight max-w-xl">
                Designed to Deliver
              </h2>
            </div>

            {/* Two-column split: editorial lead-in + standards grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Left: prose lead */}
              <div className="space-y-5">
                <p className="text-lg text-[#4a5b4a] leading-relaxed">
                  Our programmes are developed and delivered in accordance with
                  the highest academic and institutional standards — ensuring
                  quality, accountability, and measurable outcomes at every
                  level of engagement.
                </p>
                <p className="text-[#4a5b4a] leading-relaxed">
                  Every programme pathway — from postgraduate research to
                  community-facing extension — is held to a consistent framework
                  that aligns with national policy, institutional governance,
                  and the Centre&apos;s disbursement-linked performance
                  indicators.
                </p>
              </div>

              {/* Right: standards list */}
              <div className="space-y-4">
                {standards.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow-sm"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2d5a2d]/10 text-[#2d5a2d] flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <p className="text-[#4a5b4a] text-base leading-relaxed pt-1">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
