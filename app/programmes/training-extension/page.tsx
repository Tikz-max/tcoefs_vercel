import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";

// ─── Data ──────────────────────────────────────────────────────────────────────

const shortCourses = [
  "Wholesome Animal Products Processing (Meat, Egg, Milk)",
  "Agribusiness Development and Enterprise Management",
  "Climate-Smart Agricultural Practices",
  "Livestock Production and Feed Optimization",
  "Seed Systems and Crop Protection",
  "Food Processing and Value Addition",
];

const workshopPoints = [
  "Measurable performance outputs",
  "Enterprise sustainability",
  "Postgraduate programme readiness",
  "Infrastructure utilization",
  "Documentation and visibility",
];

const communityItems = [
  "Farmer-centered training and extension clinics",
  "Youth-focused agripreneurship initiatives",
  "Women-inclusive agricultural development",
  "Community demonstration projects",
  "Institutional and stakeholder engagement",
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function TrainingExtensionPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <Navbar />

      {/* ── Hero — split panel: content left, image right ────────────────────── */}
      <section className="relative min-h-[65vh] grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left: content */}
        <div className="relative flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 pt-28 pb-16 bg-white z-10">
          {/* Breadcrumb-style overline */}
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2d5a2d]/55 mb-6">
            Programmes / Training & Extension
          </p>

          <h1 className="text-5xl md:text-6xl font-bold text-[#2f3e2f] leading-none tracking-tight mb-2">
            Training
          </h1>
          <h1 className="text-5xl md:text-6xl font-normal text-[#4a5b4a] leading-none tracking-tight mb-8">
            & Extension.
          </h1>

          {/* Left-anchored rule */}
          <div className="w-10 h-px bg-gradient-to-r from-[#2d5a2d]/50 to-transparent mb-8" />

          <p className="text-lg text-[#4a5b4a] leading-relaxed max-w-md">
            Translating research into practical skills, enterprise development,
            and community impact.
          </p>
        </div>

        {/* Right: image panel — visible, no veil ─────────────────────────── */}
        <div className="relative hidden lg:block">
          <Image
            src="/agricultural-training-workshop.jpg"
            alt="Training workshop at TCoEFS"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
          {/* Subtle left-edge fade to blend with white content panel */}
          <div
            className="absolute inset-y-0 left-0 w-20 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.9), transparent)",
            }}
          />
        </div>

        {/* Mobile: faint image background */}
        <div className="lg:hidden absolute inset-0 z-0" aria-hidden="true">
          <Image
            src="/agricultural-training-workshop.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-10"
          />
        </div>
      </section>

      {/* ── Section 1: Introduction — centered lead, no heading ──────────────── */}
      <AnimatedSection animation="fade">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2d5a2d]/55 mb-8">
              Overview
            </p>
            <p className="text-xl text-[#4a5b4a] leading-relaxed mb-5">
              The TETFund Centre of Excellence in Food Security delivers
              structured training programmes, farmer-focused extension clinics,
              and capacity-building workshops designed to translate research
              into measurable field-level impact.
            </p>
            <p className="text-[#4a5b4a] leading-relaxed">
              Our training initiatives bridge academic knowledge and practical
              application, strengthening productivity, enterprise development,
              and sustainable agricultural practices across value chains.
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Section 2: Featured Training Initiative — event card ─────────────── */}
      <AnimatedSection animation="slide-up" delay={100}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
          <div className="max-w-6xl mx-auto">
            {/* Section opening */}
            <div className="mb-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Current & Recent Training
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight max-w-xl">
                Training Initiatives
              </h2>
            </div>

            {/* Event card */}
            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
              {/* Date panel */}
              <div className="lg:w-52 bg-[#2d5a2d]/[0.06] border-b lg:border-b-0 lg:border-r border-[#2d5a2d]/[0.08] p-8 flex flex-col justify-center flex-shrink-0">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2d5a2d]/55 mb-4">
                  Short Course
                </p>
                <p className="text-3xl font-bold text-[#2f3e2f] leading-tight">
                  16 Feb —
                </p>
                <p className="text-3xl font-bold text-[#2f3e2f] leading-tight">
                  1 Mar
                </p>
                <p className="text-base font-medium text-[#4a5b4a] mt-2">
                  2026
                </p>
              </div>

              {/* Content */}
              <div className="flex-1 p-8 lg:p-10">
                <h3 className="text-2xl font-bold text-[#2f3e2f] leading-tight mb-5">
                  Post-Harvest Management of Fresh Produce
                </h3>
                <div className="space-y-4">
                  <p className="text-[#4a5b4a] leading-relaxed">
                    A structured short course focused on reducing post-harvest
                    losses, improving produce handling, value addition,
                    packaging systems, and market readiness.
                  </p>
                  <p className="text-[#4a5b4a] leading-relaxed border-l-4 border-[#2d5a2d] pl-5">
                    Participants engaged in both theoretical sessions and
                    hands-on practical demonstrations designed to enhance
                    product quality and shelf-life management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Section 3: Short Courses — 2-col flat list ───────────────────────── */}
      <AnimatedSection animation="slide-right">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            {/* Section opening */}
            <div className="mb-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Short Courses
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight max-w-xl">
                Specialized Training Areas
              </h2>
              <p className="text-lg text-[#4a5b4a] leading-relaxed mt-4 max-w-2xl">
                The Centre offers and continues to develop specialized training
                in the following areas:
              </p>
            </div>

            {/* 2-col course list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 mb-8">
              {shortCourses.map((course, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 py-4 border-b border-gray-100"
                >
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#2d5a2d] mt-2" />
                  <span className="text-[#2f3e2f] font-medium text-sm leading-relaxed">
                    {course}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-sm text-[#4a5b4a] leading-relaxed border-l-4 border-[#2d5a2d]/30 pl-5">
              Each programme is designed to integrate theory, demonstration, and
              enterprise application.
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Section 4: Capacity Workshop — tinted, no badge+H2 ───────────────── */}
      <AnimatedSection animation="slide-left" delay={100}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#2d5a2d]/[0.05]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left: narrative */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2d5a2d] mb-2">
                  September 2025
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2d5a2d]/55 mb-6">
                  Capacity-Building Workshop
                </p>
                <p className="text-3xl md:text-4xl font-bold text-[#2f3e2f] leading-tight mb-6">
                  Four days of institutional realignment and delivery.
                </p>
                <p className="text-[#4a5b4a] leading-relaxed mb-4">
                  In September 2025, the Centre convened a four-day
                  capacity-building workshop to strengthen institutional
                  alignment, enterprise activation, and research integration.
                </p>
                <p className="text-sm text-[#4a5b4a] leading-relaxed border-l-4 border-[#2d5a2d] pl-5">
                  This initiative marked a strategic step in enhancing
                  institutional delivery.
                </p>
              </div>

              {/* Right: emphasis points */}
              <div>
                <p className="text-sm font-semibold text-[#2f3e2f] mb-6">
                  The workshop emphasised:
                </p>
                <div className="space-y-4">
                  {workshopPoints.map((point, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-8 h-px bg-gradient-to-r from-[#2d5a2d]/50 to-transparent" />
                      <p className="text-[#4a5b4a] text-base leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Section 5: Extension & Community — stacked accent strips ─────────── */}
      <AnimatedSection animation="fade" delay={100}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            {/* Section opening */}
            <div className="mb-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Community Engagement
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight max-w-xl">
                Extension & Community Impact
              </h2>
            </div>

            {/* Stacked community strips */}
            <div className="divide-y divide-gray-100 mb-10">
              {communityItems.map((item, i) => (
                <div key={i} className="flex items-center gap-5 py-5">
                  {/* Gradient vertical accent */}
                  <div className="flex-shrink-0 w-1 h-8 rounded-full bg-gradient-to-b from-[#2d5a2d] to-[#5a7c65]" />
                  <p className="text-base font-medium text-[#2f3e2f] leading-snug">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-[#4a5b4a] leading-relaxed max-w-2xl border-l-4 border-[#2d5a2d] pl-6">
              The Centre integrates participatory approaches to ensure farmers
              are co-creators and beneficiaries of innovation.
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Section 6: Upcoming Training — minimal CTA close ─────────────────── */}
      <AnimatedSection animation="fade" delay={100}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-6">
              Upcoming Opportunities
            </div>
            <p className="text-lg text-[#4a5b4a] leading-relaxed mb-8">
              Visitors are encouraged to check regularly for updates on upcoming
              short courses, specialized workshops, and farmer training
              sessions.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] hover:from-[#4a5b4a] hover:to-[#2d5a2d] text-white px-7 py-3.5 rounded-lg font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              Enquire About Training
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
