"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";
import TeamSection from "@/components/team-section";
import {
  FlaskConical,
  GraduationCap,
  Target,
  Users,
  Building2,
  Handshake,
  Leaf,
  Beef,
  Wheat,
  TrendingUp,
  Package,
  UserCheck,
  Eye,
  Lightbulb,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const mandates = [
  {
    icon: FlaskConical,
    text: "Advancing interdisciplinary research in food security and sustainable agriculture",
  },
  {
    icon: GraduationCap,
    text: "Developing high-quality postgraduate programmes aligned with national priorities",
  },
  {
    icon: Target,
    text: "Strengthening institutional performance in line with TETFund expectations",
  },
  {
    icon: Users,
    text: "Delivering farmer-focused training and extension services",
  },
  {
    icon: Building2,
    text: "Promoting enterprise-based demonstration for sustainability",
  },
  {
    icon: Handshake,
    text: "Building strategic partnerships for innovation and impact",
  },
];

const focusAreas = [
  {
    icon: Leaf,
    title: "Climate-Smart Agriculture",
    description:
      "Promoting resilient agricultural production systems that respond to climate variability through adaptive technologies, water-efficient practices, agroforestry integration, and sustainable land management.",
    colorClass: "bg-[#2d5a2d]/10 text-[#2d5a2d]",
  },
  {
    icon: Beef,
    title: "Livestock Production & Animal Health",
    description:
      "Advancing livestock productivity, pasture systems, animal health management, genetics improvement, and sustainable value chain development to enhance food security and rural livelihoods.",
    colorClass: "bg-[#5a7c65]/10 text-[#2f3e2f]",
  },
  {
    icon: Wheat,
    title: "Crop Systems, Seed Science & Biotechnology",
    description:
      "Strengthening crop protection, seed systems development, biotechnology applications, and sustainable crop productivity to improve agricultural performance and resilience.",
    colorClass: "bg-[#4a5b4a]/10 text-[#2f3e2f]",
  },
  {
    icon: TrendingUp,
    title: "Agricultural Economics & Food Systems Innovation",
    description:
      "Driving agribusiness development, market systems transformation, policy analysis, and innovation-driven food system competitiveness across value chains.",
    colorClass: "bg-[#f4c542]/15 text-[#2f3e2f]",
  },
  {
    icon: Package,
    title: "Post-Harvest Systems & Value Addition",
    description:
      "Improving storage, processing, preservation, cold-chain integration, and value addition systems to reduce losses and enhance agricultural profitability.",
    colorClass: "bg-[#2d5a2d]/10 text-[#2d5a2d]",
  },
  {
    icon: UserCheck,
    title: "Gender, Extension & Inclusive Food Systems",
    description:
      "Promoting inclusive agricultural development through gender-responsive programming, farmer-centered extension services, communication innovation, and community-based capacity strengthening.",
    colorClass: "bg-[#5a7c65]/10 text-[#2f3e2f]",
  },
];

const metrics = [
  {
    target: 20,
    suffix: "+",
    label: "Scientific Team Members",
    numeric: true,
  },
  {
    target: 4,
    suffix: "",
    label: "Hectares of Research Farmland",
    numeric: true,
  },
  {
    target: 1550,
    suffix: "",
    label: "Broilers Successfully Produced",
    numeric: true,
  },
  {
    target: 0,
    suffix: "",
    label: "Postgraduate Programmes Developed",
    numeric: false,
    display: "Multiple",
  },
];

// ─── Animated metric counter ─────────────────────────────────────────────────

function MetricStrip() {
  const [counts, setCounts] = useState<number[]>(metrics.map(() => 0));
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;
    const duration = 2000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(
        metrics.map((m) => (m.numeric ? Math.floor(m.target * eased) : 0)),
      );

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [triggered]);

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
      {metrics.map((m, i) => (
        <div
          key={m.label}
          className="text-center"
          style={{ animationDelay: `${i * 150}ms` }}
        >
          <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-[#5a7c65] to-[#6b8570] bg-clip-text text-transparent leading-none mb-3">
            {m.numeric ? counts[i].toLocaleString() + m.suffix : m.display}
          </div>
          <div className="text-sm font-semibold text-[#2f3e2f] leading-snug">
            {m.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <Navbar />

      {/* ── Hero banner ──────────────────────────────────────────────────────── */}
      <AnimatedSection animation="fade">
        <section
          className="pt-24 pb-20 px-4 sm:px-6 lg:px-8"
          style={{
            background:
              "linear-gradient(to bottom, rgba(45,90,45,0.07) 0%, rgba(45,90,45,0.03) 40%, #ffffff 100%)",
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-6">
              About TCoEFS
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2f3e2f] leading-tight mb-6">
              About the TETFund Centre of Excellence in Food Security
            </h1>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#2d5a2d]/40 to-transparent mx-auto mb-6" />

            <p className="text-xl text-[#4a5b4a] leading-relaxed max-w-2xl mx-auto">
              Advancing sustainable food systems through research, postgraduate
              education, and enterprise-driven innovation.
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Who We Are ───────────────────────────────────────────────────────── */}
      <AnimatedSection animation="slide-right">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            {/* Section opening */}
            <div className="mb-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Who We Are
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight max-w-2xl">
                A Centre Built for Impact
              </h2>
            </div>

            {/* Body paragraphs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
              <div className="space-y-6">
                <p className="text-lg text-[#4a5b4a] leading-relaxed">
                  The TETFund Centre of Excellence in Food Security (TCoEFS),
                  University of Jos, is a multidisciplinary research and
                  training institution established to strengthen sustainable
                  food systems in Nigeria and across Africa.
                </p>
                <p className="text-[#4a5b4a] leading-relaxed">
                  The Centre operates under the mandate of the Tertiary
                  Education Trust Fund (TETFund) to deliver measurable impact in
                  research excellence, postgraduate education, institutional
                  sustainability, and agricultural innovation.
                </p>
              </div>
              <div>
                <p className="text-[#4a5b4a] leading-relaxed">
                  TCoEFS integrates climate-smart agriculture, livestock
                  productivity, crop systems development, agribusiness
                  innovation, post-harvest management, and inclusive food
                  systems transformation to address evolving food security
                  challenges across the continent.
                </p>
              </div>
            </div>

            {/* Vision & Mission cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vision */}
              <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#5a7c65]/30">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#2d5a2d] to-[#4a5b4a] flex items-center justify-center mb-5">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#2f3e2f] mb-3">
                  Our Vision
                </h3>
                <p className="text-[#4a5b4a] text-sm leading-relaxed">
                  To be a Centre of Excellence for training and applied research
                  that enhances household food security and improves livelihoods
                  in Nigeria and Africa.
                </p>
              </div>

              {/* Mission */}
              <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#5a7c65]/30">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#2d5a2d] to-[#4a5b4a] flex items-center justify-center mb-5">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#2f3e2f] mb-3">
                  Our Mission
                </h3>
                <p className="text-[#4a5b4a] text-sm leading-relaxed">
                  To enhance access by all people to safe and nutritious food
                  needed to maintain a healthy and active life, ensuring they
                  are not at risk of losing such access.
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Our Mandate ──────────────────────────────────────────────────────── */}
      <AnimatedSection animation="slide-up" delay={100}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
          <div className="max-w-6xl mx-auto">
            {/* Section opening */}
            <div className="mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Our Mandate
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight max-w-xl">
                What TCoEFS Is Committed To
              </h2>
            </div>

            {/* 2-column icon grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {mandates.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text}
                    className="flex items-start gap-4 bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow-sm"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2d5a2d]/10 text-[#2d5a2d] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-[#4a5b4a] text-base leading-relaxed pt-1">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Strategic Focus Areas ────────────────────────────────────────────── */}
      <AnimatedSection animation="fade" delay={100}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Section opening */}
            <div className="mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Focus Areas
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight max-w-2xl">
                Our Strategic Focus Areas
              </h2>
            </div>

            {/* 3-col card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {focusAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <div
                    key={area.title}
                    className="group relative overflow-hidden bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#5a7c65]/30 flex flex-col"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />

                    <div
                      className={`w-11 h-11 rounded-lg flex items-center justify-center mb-5 ${area.colorClass}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-lg font-semibold text-[#2f3e2f] mb-3 leading-tight">
                      {area.title}
                    </h3>

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

      {/* ── Our Approach ─────────────────────────────────────────────────────── */}
      <AnimatedSection animation="slide-left" delay={100}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
          <div className="max-w-4xl mx-auto">
            {/* Section opening */}
            <div className="mb-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Our Approach
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight">
                How We Work
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-[#4a5b4a] leading-relaxed">
                TCoEFS bridges research, postgraduate education, enterprise
                initiatives, and field-level application. The Centre integrates
                laboratory research, greenhouse experimentation, demonstration
                farmland, and enterprise-based production systems to translate
                knowledge into measurable impact.
              </p>

              <p className="text-[#4a5b4a] leading-relaxed border-l-4 border-[#2d5a2d] pl-6">
                Through structured governance, scientific capacity
                strengthening, and performance-driven reforms, the Centre
                continues to reposition itself as a leading hub for food
                security innovation in Nigeria — advancing in alignment with
                TETFund expectations and Disbursement-Linked Indicators.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Performance & Impact Snapshot ────────────────────────────────────── */}
      <AnimatedSection animation="slide-up" delay={100}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            {/* Section opening */}
            <div className="mb-14 text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Performance & Impact
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight">
                Progress in Numbers
              </h2>
            </div>

            <div className="bg-gradient-to-br from-white/90 to-gray-50/60 backdrop-blur-sm rounded-xl p-10 shadow-lg border border-white/20">
              <MetricStrip />
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Team ─────────────────────────────────────────────────────────────── */}
      <TeamSection />

      <Footer />
    </div>
  );
}
