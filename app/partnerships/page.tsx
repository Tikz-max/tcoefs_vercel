"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Microscope,
  TrendingUp,
  GraduationCap,
  Leaf,
  Building2,
  HandCoins,
  ArrowRight,
  Download,
  Mail,
  CheckCircle2,
  ShieldCheck,
  HeartHandshake,
  CalendarCheck,
  Sprout,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";

// ─── Data ────────────────────────────────────────────────────────────────────

const opportunityCards = [
  {
    icon: Microscope,
    title: "Research Collaboration",
    description:
      "Joint research projects, grant applications, field trials, laboratory partnerships, data sharing, and postgraduate supervision.",
  },
  {
    icon: TrendingUp,
    title: "Enterprise & Agribusiness Development",
    description:
      "Co-investment in poultry, greenhouse expansion, value addition, seed systems, livestock systems, and processing units.",
  },
  {
    icon: GraduationCap,
    title: "Curriculum & Capacity Development",
    description:
      "Joint curriculum design, technical training, innovation modules, and institutional strengthening for sustainable impact.",
  },
  {
    icon: Leaf,
    title: "Demonstration & Pilot Projects",
    description:
      "Climate-smart agriculture pilots, agroforestry systems, livestock genetics trials, and post-harvest systems.",
  },
  {
    icon: Building2,
    title: "Infrastructure Support",
    description:
      "Laboratory equipment, greenhouse expansion, fencing of farmland, research tools, and technology support.",
  },
  {
    icon: HandCoins,
    title: "Funding & Philanthropic Support",
    description:
      "Direct institutional support, enterprise scale-up, student scholarships, and infrastructure investment.",
  },
];

const partners = [
  {
    src: "/partners/color/tetfund.png",
    name: "Tertiary Education Trust Fund (TETFund)",
    tag: "Funding Partner",
    description:
      "The Tertiary Education Trust Fund is a federal government agency established to provide funding support for public tertiary institutions in Nigeria. Through strategic investments in infrastructure, research, academic development, and capacity building, TETFund strengthens institutional performance and promotes innovation across higher education.",
  },
  {
    src: "/partners/color/university-of-jos.png",
    name: "University of Jos",
    tag: "Host Institution",
    description:
      "The University of Jos is a leading public university in Nigeria committed to academic excellence, research advancement, and national development. With strong interdisciplinary capacity across science, technology, social sciences, and policy research, the institution serves as a hub for innovation, capacity development, and strategic partnerships.",
  },
  {
    src: "/partners/color/saa.png",
    name: "Sasakawa Africa Association (SAA)",
    tag: "Development Partner",
    description:
      "Sasakawa Africa Association is an international non-profit organization dedicated to strengthening agricultural systems across Africa. It promotes sustainable farming practices, capacity development for extension services, and nutrition-sensitive agricultural interventions aimed at improving productivity, food security, and rural livelihoods.",
  },
  {
    src: "/partners/color/giz.png",
    name: "GIZ",
    tag: "Development Partner",
    description:
      "GIZ (Deutsche Gesellschaft für Internationale Zusammenarbeit) works on behalf of the German government in Nigeria, supporting development projects in agriculture, rural development, and institutional capacity building.",
  },
  {
    src: "/partners/color/plsg.png",
    name: "Plateau State Government (PLSG)",
    tag: "Government Partner",
    description:
      "The Plateau State Government is the governing authority responsible for public administration, policy development, and socio-economic advancement within Plateau State, Nigeria. It drives initiatives in infrastructure, education, digital innovation, security, and economic growth, fostering an enabling environment for institutional excellence and strategic development partnerships.",
  },
  {
    src: "/partners/color/uslge.png",
    name: "U.S. Livestock Genetics Export, Inc. (USLGE)",
    tag: "SRDEP Partner",
    description:
      "U.S. Livestock Genetics Export, Inc. facilitates the global exchange of advanced livestock genetics and reproductive technologies. The organization supports genetic improvement, herd productivity, and sustainable livestock development through international collaboration and technical expertise.",
  },
  {
    src: "/partners/color/ecofarms-agro.png",
    name: "Ecofarms and Agroservices Ltd",
    tag: "Enterprise Partner",
    description:
      "Ecofarms and Agroservices Ltd is an agribusiness enterprise engaged in modern farming operations, agricultural services, and value chain development. The company supports sustainable production systems and contributes to strengthening agricultural productivity and rural economic growth.",
  },
  {
    src: "/partners/color/reproduction-specialty-group.png",
    name: "Reproduction Specialty Group, Inc. (RSG)",
    tag: "Biotechnology Partner",
    description:
      "Reproduction Specialty Group, Inc. specializes in advanced reproductive technologies and breeding services for livestock systems. The organization provides expertise in genetic improvement, reproductive management, and technical support to enhance productivity and performance.",
  },
  {
    src: "/partners/color/lpres.png",
    name: "Livestock Productivity & Resilience Support Project (L-PRES)",
    tag: "Development Partner",
    description:
      "The Livestock Productivity and Resilience Support Project is a development initiative focused on enhancing livestock value chains, strengthening resilience in pastoral and agro-pastoral systems, and improving productivity through technical support, infrastructure development, and stakeholder collaboration.",
  },
  {
    src: "/partners/color/dajrhas.png",
    name: "Dajrhas Health and Agric Development Ltd",
    tag: "Health & Agriculture",
    description:
      "Dajrhas Health and Agric Development Ltd operates at the intersection of agriculture and community development, delivering services that promote food production, health integration, and sustainable livelihood enhancement within rural and peri-urban communities.",
  },
  {
    src: "/partners/color/datacraft.png",
    name: "Data-craft Analytics Solutions Inc.",
    tag: "Technology Partner",
    description:
      "Data-craft Analytics Solutions Inc. is a technology and data analytics firm providing advanced analytical services, digital solutions, and decision-support systems. The company leverages data science and technological innovation to support institutional efficiency and strategic growth.",
  },
];

const priorityNeeds = [
  "Laboratory equipment upgrade",
  "Greenhouse enterprise expansion",
  "Farmland fencing and irrigation systems",
  "Livestock genetics and feed systems",
  "Processing and value-addition equipment",
  "Student research grants",
];

const supportAreas = [
  "Infrastructure expansion",
  "Research funding",
  "Enterprise development",
  "Training sponsorship",
  "Student scholarships",
];

// ─── Form: Partnership Enquiry ────────────────────────────────────────────────

function PartnershipEnquiryForm() {
  const [form, setForm] = useState({
    orgName: "",
    contactPerson: "",
    email: "",
    interestType: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-lg bg-white/70 backdrop-blur-sm text-[#2f3e2f] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30 transition-all text-sm";
  const labelClass = "block text-sm font-semibold text-[#2f3e2f] mb-1.5";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Replace with your actual form submission endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#2d5a2d]/10 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-[#2d5a2d]" />
        </div>
        <h4 className="text-xl font-bold text-[#2f3e2f]">Enquiry Received</h4>
        <p className="text-sm text-[#4a5b4a] leading-relaxed max-w-xs">
          Thank you for your interest in partnering with TCoEFS. A member of our
          team will be in touch within five working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClass} htmlFor="pe-orgName">
          Organisation Name
        </label>
        <input
          id="pe-orgName"
          name="orgName"
          type="text"
          required
          value={form.orgName}
          onChange={handleChange}
          placeholder="Enter your organisation name"
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="pe-contactPerson">
          Contact Person
        </label>
        <input
          id="pe-contactPerson"
          name="contactPerson"
          type="text"
          required
          value={form.contactPerson}
          onChange={handleChange}
          placeholder="Full name"
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="pe-email">
          Email Address
        </label>
        <input
          id="pe-email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="you@organisation.com"
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="pe-interestType">
          Partnership Interest Type
        </label>
        <select
          id="pe-interestType"
          name="interestType"
          required
          value={form.interestType}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select an area of interest</option>
          <option value="research">Research Collaboration</option>
          <option value="enterprise">
            Enterprise & Agribusiness Development
          </option>
          <option value="curriculum">Curriculum & Capacity Development</option>
          <option value="demonstration">Demonstration & Pilot Projects</option>
          <option value="infrastructure">Infrastructure Support</option>
          <option value="funding">Funding & Philanthropic Support</option>
        </select>
      </div>
      <div>
        <label className={labelClass} htmlFor="pe-message">
          Message
        </label>
        <textarea
          id="pe-message"
          name="message"
          rows={4}
          required
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your organisation and how you'd like to partner with TCoEFS…"
          className={`${inputClass} resize-none`}
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] hover:from-[#4a5b4a] hover:to-[#2d5a2d] text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Submit Enquiry"}
      </button>
    </form>
  );
}

// ─── Form: Funding & Support ──────────────────────────────────────────────────

function FundingSupportForm() {
  const [form, setForm] = useState({
    supportType: "",
    amount: "",
    preferredArea: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-lg bg-white/70 backdrop-blur-sm text-[#2f3e2f] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30 transition-all text-sm";
  const labelClass = "block text-sm font-semibold text-[#2f3e2f] mb-1.5";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#2d5a2d]/10 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-[#2d5a2d]" />
        </div>
        <h4 className="text-xl font-bold text-[#2f3e2f]">
          Support Request Received
        </h4>
        <p className="text-sm text-[#4a5b4a] leading-relaxed max-w-xs">
          Thank you for your commitment to TCoEFS. Our partnerships team will
          respond with a full funding framework within five working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClass} htmlFor="fs-supportType">
          Type of Support
        </label>
        <select
          id="fs-supportType"
          name="supportType"
          required
          value={form.supportType}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select type of support</option>
          <option value="infrastructure">Infrastructure</option>
          <option value="research">Research Funding</option>
          <option value="enterprise">Enterprise Development</option>
          <option value="training">Training Sponsorship</option>
          <option value="scholarships">Student Scholarships</option>
        </select>
      </div>
      <div>
        <label className={labelClass} htmlFor="fs-preferredArea">
          Preferred Area of Support
        </label>
        <select
          id="fs-preferredArea"
          name="preferredArea"
          required
          value={form.preferredArea}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select an area</option>
          <option value="lab">Laboratory Equipment</option>
          <option value="greenhouse">Greenhouse Expansion</option>
          <option value="farmland">Farmland Fencing & Irrigation</option>
          <option value="livestock">Livestock Genetics & Feed</option>
          <option value="processing">Processing & Value Addition</option>
          <option value="grants">Student Research Grants</option>
        </select>
      </div>
      <div>
        <label className={labelClass} htmlFor="fs-amount">
          Indicative Amount (Optional)
        </label>
        <input
          id="fs-amount"
          name="amount"
          type="text"
          value={form.amount}
          onChange={handleChange}
          placeholder="e.g. ₦5,000,000 or USD 10,000"
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="fs-contactName">
            Contact Name
          </label>
          <input
            id="fs-contactName"
            name="contactName"
            type="text"
            required
            value={form.contactName}
            onChange={handleChange}
            placeholder="Full name"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="fs-contactPhone">
            Phone (Optional)
          </label>
          <input
            id="fs-contactPhone"
            name="contactPhone"
            type="tel"
            value={form.contactPhone}
            onChange={handleChange}
            placeholder="+234 000 000 0000"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="fs-contactEmail">
          Email Address
        </label>
        <input
          id="fs-contactEmail"
          name="contactEmail"
          type="email"
          required
          value={form.contactEmail}
          onChange={handleChange}
          placeholder="you@organisation.com"
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] hover:from-[#4a5b4a] hover:to-[#2d5a2d] text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Submit Support Request"}
      </button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PartnershipsPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <AnimatedSection animation="fade">
        <section className="relative min-h-[520px] flex items-end overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero/compressed/6.jpg"
              alt="TCoEFS strategic partnerships and high-level engagement"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Dark gradient overlay — legibility without washing the photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1a]/88 via-[#2f3e2f]/50 to-[#2f3e2f]/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e1a]/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-20 pt-40">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/15 border border-white/25 text-white text-sm font-medium mb-6 backdrop-blur-sm">
                Partnerships & Strategic Engagement
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Partnerships and Strategic Engagement
              </h1>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-6" />
              <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl mx-auto">
                Collaborating to advance sustainable food systems, innovation,
                and measurable impact.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── SECTION 1: WHY PARTNER ───────────────────────────────────────────── */}
      <AnimatedSection animation="slide-right">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
              {/* Left — heading block */}
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-6">
                  Why Partner With TCoEFS
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight mb-6">
                  A Structured Platform for Lasting Impact
                </h2>
                <p className="text-lg text-[#4a5b4a] leading-relaxed mb-8">
                  The TETFund Centre of Excellence in Food Security provides a
                  structured platform for research collaboration, enterprise
                  development, capacity building, and policy engagement. Our
                  integrated model is designed for partnerships that are not
                  transactional — they are institutional, measurable, and built
                  for the long term.
                </p>
                <Link
                  href="/contact"
                  className="block sm:inline-block w-full sm:w-auto"
                >
                  <button className="w-full inline-flex items-center justify-center gap-2 group bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] hover:from-[#4a5b4a] hover:to-[#2d5a2d] text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    Begin a Conversation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </Link>
              </div>

              {/* Right — integrated model list */}
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
                  Our Integrated Model Combines
                </p>
                <ul className="space-y-4">
                  {[
                    {
                      icon: Microscope,
                      text: "Research infrastructure — greenhouse, laboratory, and farmland",
                    },
                    {
                      icon: GraduationCap,
                      text: "Postgraduate programme development",
                    },
                    {
                      icon: TrendingUp,
                      text: "Enterprise-driven sustainability",
                    },
                    {
                      icon: Sprout,
                      text: "Farmer-focused training and extension",
                    },
                    {
                      icon: HeartHandshake,
                      text: "Policy-level engagement",
                    },
                    {
                      icon: ShieldCheck,
                      text: "Institutional accountability aligned with TETFund standards",
                    },
                  ].map(({ icon: Icon, text }, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center bg-[#2d5a2d]/10">
                        <Icon className="w-4 h-4 text-[#2d5a2d]" />
                      </div>
                      <span className="text-[#4a5b4a] leading-relaxed pt-1.5 text-sm">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── SECTION 2: PARTNERSHIP OPPORTUNITIES ────────────────────────────── */}
      <AnimatedSection animation="slide-up">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
          <div className="max-w-6xl mx-auto">
            {/* Section opening */}
            <div className="text-center mb-14">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Partnership Opportunities
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight mb-4">
                How We Collaborate
              </h2>
              <p className="text-lg text-[#4a5b4a] leading-relaxed max-w-2xl mx-auto">
                TCoEFS offers six structured partnership modalities, each
                designed to create mutual value and measurable development
                outcomes.
              </p>
            </div>

            {/* 3-col icon card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {opportunityCards.map(({ icon: Icon, title, description }, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-7 flex flex-col"
                >
                  {/* Signature hover bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />

                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#2d5a2d]/10 mb-5 group-hover:scale-110 group-hover:rotate-1 transition-all duration-300">
                    <Icon className="w-5 h-5 text-[#2d5a2d]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#2f3e2f] mb-2 leading-snug">
                    {title}
                  </h3>
                  <p className="text-sm text-[#4a5b4a] leading-relaxed flex-1">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── SECTION 3: CURRENT & PAST COLLABORATIONS ────────────────────────── */}
      <AnimatedSection animation="slide-left">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            {/* Section opening */}
            <div className="mb-14">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Current and Past Collaborations
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight max-w-xl">
                Partners in Food Systems Transformation
              </h2>
            </div>

            {/* Partner grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col"
                >
                  {/* Signature hover bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />

                  {/* Logo container */}
                  <div className="h-16 mb-5 flex items-center">
                    <div className="relative h-full w-full">
                      <Image
                        src={partner.src}
                        alt={partner.name}
                        fill
                        sizes="280px"
                        className="object-contain object-left"
                      />
                    </div>
                  </div>

                  {/* Tag pill */}
                  <span className="inline-flex self-start px-3 py-1 rounded-full bg-[#2d5a2d] text-white text-xs font-medium mb-3">
                    {partner.tag}
                  </span>

                  <h3 className="text-base font-semibold text-[#2f3e2f] mb-2 leading-snug">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-[#4a5b4a] leading-relaxed flex-1">
                    {partner.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── SECTION 4: INVESTMENT & SUPPORT OPPORTUNITIES ───────────────────── */}
      <AnimatedSection animation="slide-up">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
              {/* Left */}
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-6">
                  Investment & Support Opportunities
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight mb-6">
                  Where Your Investment Lands
                </h2>
                <p className="text-lg text-[#4a5b4a] leading-relaxed mb-8">
                  TCoEFS has identified critical infrastructure and programme
                  gaps that, when addressed by development partners and
                  investors, will unlock the Centre's full operational and
                  research capacity.
                </p>

                {/* Priority needs */}
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-5">
                  Current Priority Needs
                </p>
                <ul className="space-y-3 mb-10">
                  {priorityNeeds.map((need, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a2d] flex-shrink-0" />
                      <span className="text-[#4a5b4a] text-sm leading-relaxed">
                        {need}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/TCoEFS_Quarterly_Newsletter.pdf"
                    download
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 group bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] hover:from-[#4a5b4a] hover:to-[#2d5a2d] text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    Download Concept Note
                  </a>
                  <a
                    href="#funding-form"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 group border-2 border-[#2d5a2d] text-[#2d5a2d] font-semibold px-6 py-3 rounded-xl hover:bg-[#2d5a2d] hover:text-white transition-all duration-300"
                  >
                    Request Detailed Proposal
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>

              {/* Right — accent card */}
              <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg p-8 md:p-10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] rounded-t-2xl" />

                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#2d5a2d] to-[#4a5b4a] mb-7">
                  <Building2 className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-[#2f3e2f] mb-4">
                  Structured for Accountability
                </h3>
                <p className="text-[#4a5b4a] leading-relaxed mb-6 text-sm">
                  Every investment in TCoEFS is supported by a documented
                  concept note, a detailed proposal with cost structures, and
                  performance milestones tied to institutional reporting
                  frameworks.
                </p>
                <p className="text-[#4a5b4a] leading-relaxed text-sm">
                  Proposals are available for individual priority areas — from
                  pack machine infrastructure to greenhouse enterprise
                  expansion. Request a proposal to receive a bespoke investment
                  case.
                </p>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#2d5a2d]" />
                    <a
                      href="mailto:partnerships@tcoefs-unijos.org"
                      className="text-sm text-[#2d5a2d] font-medium hover:text-[#1e4a1e] transition-colors duration-200"
                    >
                      partnerships@tcoefs-unijos.org
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── SECTION 5: DONATION & SUPPORT ───────────────────────────────────── */}
      <AnimatedSection animation="fade">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            {/* Section opening */}
            <div className="text-center mb-14">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Support the Centre
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight mb-4">
                Invest in Food Systems Transformation
              </h2>
              <p className="text-lg text-[#4a5b4a] leading-relaxed max-w-2xl mx-auto">
                TCoEFS welcomes institutional support from development partners,
                corporate organisations, alumni, and philanthropic donors
                committed to sustainable food systems transformation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Support areas */}
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
                  Support May Be Directed Toward
                </p>
                <div className="space-y-3 mb-10">
                  {supportAreas.map((area, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center bg-[#2d5a2d]/10">
                        <CheckCircle2 className="w-4 h-4 text-[#2d5a2d]" />
                      </div>
                      <span className="text-[#4a5b4a] text-sm font-medium">
                        {area}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Three action buttons */}
                <div className="flex flex-col gap-3">
                  <a
                    href="#funding-form"
                    className="w-full inline-flex items-center justify-center gap-2 group bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] hover:from-[#1e4a1e] hover:to-[#2d5a2d] text-white font-medium px-7 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <HeartHandshake className="w-4 h-4" />
                    Donate Now
                  </a>
                  <a
                    href="#funding-form"
                    className="w-full inline-flex items-center justify-center gap-2 group border-2 border-[#2d5a2d] text-[#2d5a2d] font-semibold px-7 py-3 rounded-xl hover:bg-[#2d5a2d] hover:text-white transition-all duration-300"
                  >
                    Request Funding Framework
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                  <a
                    href="#partnership-form"
                    className="w-full inline-flex items-center justify-center gap-2 group text-[#2d5a2d] font-medium px-7 py-3 rounded-xl hover:text-[#1e4a1e] transition-all duration-300"
                  >
                    Partner With Us
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>

              {/* Institutional note */}
              <div
                className="rounded-2xl p-8 md:p-10"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(45,90,45,0.05) 0%, rgba(45,90,45,0.02) 100%)",
                  border: "1px solid rgba(45,90,45,0.12)",
                }}
              >
                <div className="border-l-4 border-[#2d5a2d] pl-6 mb-8">
                  <p className="text-xl font-medium text-[#2f3e2f] leading-relaxed">
                    "Every contribution — whether in equipment, expertise, or
                    funding — directly strengthens a Centre that serves farmers,
                    students, and food systems at scale."
                  </p>
                </div>
                <p className="text-sm text-[#4a5b4a] leading-relaxed">
                  TCoEFS provides formal receipts, institutional
                  acknowledgement, and progress reporting for all support
                  received, in line with University of Jos governance standards
                  and TETFund accountability frameworks.
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── SECTION 6: FORMS ────────────────────────────────────────────────── */}
      <AnimatedSection animation="slide-up">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
          <div className="max-w-6xl mx-auto">
            {/* Section opening */}
            <div className="text-center mb-14">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Get In Touch
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight mb-4">
                Start the Conversation
              </h2>
              <p className="text-lg text-[#4a5b4a] leading-relaxed max-w-2xl mx-auto">
                Whether you are exploring a research partnership or considering
                a funding commitment, the right form is below.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Partnership Enquiry Form */}
              <div
                id="partnership-form"
                className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg p-8"
              >
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#2d5a2d] to-[#4a5b4a]">
                    <HeartHandshake className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#2f3e2f] leading-tight">
                      Partnership Enquiry
                    </h3>
                    <p className="text-xs text-[#4a5b4a] mt-0.5">
                      Research, enterprise, curriculum, and more
                    </p>
                  </div>
                </div>
                <PartnershipEnquiryForm />
              </div>

              {/* Funding & Support Form */}
              <div
                id="funding-form"
                className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg p-8"
              >
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#2d5a2d] to-[#4a5b4a]">
                    <HandCoins className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#2f3e2f] leading-tight">
                      Funding & Support
                    </h3>
                    <p className="text-xs text-[#4a5b4a] mt-0.5">
                      Infrastructure, research grants, scholarships
                    </p>
                  </div>
                </div>
                <FundingSupportForm />
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── SECTION 7: GOVERNANCE & ACCOUNTABILITY ──────────────────────────── */}
      <AnimatedSection animation="slide-right">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              {/* Text */}
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-6">
                  Governance & Accountability
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight mb-6">
                  Built on Institutional Trust
                </h2>
                <p className="text-lg text-[#4a5b4a] leading-relaxed mb-6">
                  TCoEFS operates within the University of Jos governance
                  framework and under TETFund oversight. The Centre maintains
                  structured documentation, reporting systems, and performance
                  tracking aligned with institutional and national standards.
                </p>
                <p className="text-[#4a5b4a] leading-relaxed">
                  This ensures transparency, accountability, and measurable
                  impact — giving every partner and funder the confidence that
                  their investment is managed with rigor and purpose.
                </p>
              </div>

              {/* Governance pillars */}
              <div className="space-y-4">
                {[
                  {
                    icon: ShieldCheck,
                    title: "University of Jos Governance Framework",
                    desc: "All operations, expenditure, and reporting align with University of Jos institutional governance standards.",
                  },
                  {
                    icon: CalendarCheck,
                    title: "TETFund Oversight & Reporting",
                    desc: "The Centre submits regular performance and financial reports to TETFund, ensuring accountability at the national level.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Structured Documentation",
                    desc: "Concept notes, proposals, and progress reports are maintained for all partnership agreements and funded activities.",
                  },
                ].map(({ icon: Icon, title, desc }, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden flex items-start gap-5 bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5"
                  >
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />
                    <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center bg-[#2d5a2d]/10">
                      <Icon className="w-5 h-5 text-[#2d5a2d]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#2f3e2f] mb-1">
                        {title}
                      </h4>
                      <p className="text-sm text-[#4a5b4a] leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── FINAL CTA STRIP ─────────────────────────────────────────────────── */}
      <AnimatedSection animation="fade">
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#2d5a2d]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Collaborate. Invest. Partner.{" "}
              <span className="text-white/80 font-normal">
                Transform Food Systems.
              </span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-8" />
            <p className="text-white/75 text-lg leading-relaxed max-w-xl mx-auto mb-12">
              The work of building resilient food systems is too important to do
              alone. TCoEFS is ready to formalise a partnership with you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#partnership-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 group bg-white text-[#2d5a2d] font-semibold px-7 py-3.5 rounded-lg shadow-lg hover:bg-white/90 transition-all duration-300"
              >
                Start a Partnership
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <Link
                href="/contact"
                className="block sm:inline-block w-full sm:w-auto"
              >
                <button className="w-full inline-flex items-center justify-center gap-2 group border-2 border-white/60 text-white font-semibold px-7 py-3 rounded-xl hover:border-white hover:bg-white/10 transition-all duration-300">
                  <CalendarCheck className="w-4 h-4" />
                  Schedule a Meeting
                </button>
              </Link>
              <a
                href="#funding-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 group border-2 border-white/40 text-white/85 font-medium px-7 py-3 rounded-xl hover:border-white/70 hover:text-white transition-all duration-300"
              >
                Support an Initiative
              </a>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
