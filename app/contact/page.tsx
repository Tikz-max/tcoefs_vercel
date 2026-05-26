"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Send,
  ArrowRight,
  CheckCircle2,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";

// ─── YouTube icon (Lucide does not ship one) ─────────────────────────────────
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

// ─── Contact detail cards data ───────────────────────────────────────────────
const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    lines: ["tcoefs@unijos.edu.ng"],
    href: "mailto:tcoefs@unijos.edu.ng",
    hrefLabel: "tcoefs@unijos.edu.ng",
  },
  {
    icon: Phone,
    label: "Phone",
    lines: ["+234 803 437 7953"],
    href: "tel:+2348034377953",
    hrefLabel: "+234 803 437 7953",
  },
  {
    icon: Globe,
    label: "Website",
    lines: ["www.tcoefs-unijos.org"],
    href: "https://www.tcoefs-unijos.org",
    hrefLabel: "www.tcoefs-unijos.org",
  },
  {
    icon: MapPin,
    label: "Location",
    lines: [
      "TETFund Centre of Excellence in Food Security (TCoEFS)",
      "University of Jos, Naraguta Campus",
      "Plateau State, Nigeria",
    ],
    href: "https://maps.app.goo.gl/TB3bqphYLNCMVNGq8",
    hrefLabel: "View on map",
  },
];

// ─── Social channels data ────────────────────────────────────────────────────
const socials = [
  {
    platform: "LinkedIn",
    handle: "TETFund Centre of Excellence in Food Security (TCoEFS)",
    url: "https://www.linkedin.com/company/tetfund-centre-of-excellence-in-food-security-tcoefs-university-of-jos/",
    Icon: Linkedin,
  },
  {
    platform: "Facebook",
    handle: "TCoEFS (Official)",
    url: "https://www.facebook.com/share/19vqPg5CmF/",
    Icon: Facebook,
  },
  {
    platform: "Instagram",
    handle: "@tcoefs",
    url: "https://www.instagram.com/tcoefs?igsh=MXQwNjlvN3AwN2JyYw==",
    Icon: Instagram,
  },
  {
    platform: "YouTube",
    handle: "@TETFund_TCoEFS",
    url: "https://www.youtube.com/@TETFund_TCoEFS",
    Icon: YoutubeIcon,
  },
];

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
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
    // Replace with your actual submission endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-5">
        <div className="w-14 h-14 rounded-full bg-[#2d5a2d]/10 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-[#2d5a2d]" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-[#2f3e2f] mb-2">
            Message Received
          </h4>
          <p className="text-sm text-[#4a5b4a] leading-relaxed max-w-sm">
            Thank you. Your message has been received. A member of our team will
            respond promptly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone Number{" "}
            <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+234 000 000 0000"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="subject">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={form.subject}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select a subject</option>
            <option value="general">General Enquiry</option>
            <option value="partnership">Partnership &amp; Collaboration</option>
            <option value="research">Research Engagement</option>
            <option value="training">Training &amp; Short Courses</option>
            <option value="enterprise">Enterprise &amp; Investment</option>
            <option value="media">Media &amp; Communications</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us how we can help…"
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] hover:from-[#4a5b4a] hover:to-[#2d5a2d] text-white font-medium py-3.5 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Send className="w-4 h-4" />
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <AnimatedSection animation="fade">
        <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-green-50/30 to-green-100/20">
          <div className="max-w-4xl mx-auto text-center">
            {/* H1 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2f3e2f] leading-tight mb-6">
              Contact Us
            </h1>

            {/* Divider */}
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#2d5a2d]/40 to-transparent mx-auto mb-6" />

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-[#4a5b4a] leading-relaxed max-w-2xl mx-auto mb-10">
              For enquiries, partnerships, research collaboration, training, and
              institutional engagement.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/about"
                className="block sm:inline-block w-full sm:w-auto"
              >
                <button className="w-full border-2 border-[#2d5a2d] text-[#2d5a2d] font-semibold px-7 py-3 rounded-xl hover:bg-[#2d5a2d] hover:text-white transition-all duration-300">
                  Learn More
                </button>
              </Link>
              <a
                href="#contact-form"
                className="block w-full sm:inline-flex sm:w-auto items-center justify-center gap-2 group bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] hover:from-[#1e4a1e] hover:to-[#2d5a2d] text-white font-medium px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  Contact Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </a>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── SECTION 1: CONTACT DETAILS ───────────────────────────────────────── */}
      <AnimatedSection animation="slide-up">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            {/* Section opening */}
            <div className="mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Contact Details
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight">
                How to Reach Us
              </h2>
            </div>

            {/* 2×2 card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactDetails.map(
                ({ icon: Icon, label, lines, href, hrefLabel }) => (
                  <div
                    key={label}
                    className="group relative overflow-hidden bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6"
                  >
                    {/* Signature hover bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />

                    <div className="flex items-start gap-5">
                      <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#2d5a2d] to-[#4a5b4a] group-hover:scale-110 group-hover:rotate-1 transition-all duration-300">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                          {label}
                        </p>
                        <div className="space-y-0.5 mb-3">
                          {lines.map((line, i) => (
                            <p
                              key={i}
                              className="text-sm text-[#4a5b4a] leading-relaxed"
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                        <a
                          href={href}
                          target={
                            href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="text-sm text-[#2d5a2d] font-medium hover:text-[#1e4a1e] transition-colors duration-200 inline-flex items-center gap-1 group/link"
                        >
                          {hrefLabel}
                          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform duration-200" />
                        </a>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── SECTION 2: SEND A MESSAGE ────────────────────────────────────────── */}
      <AnimatedSection animation="slide-left">
        <section
          id="contact-form"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              {/* Left — heading block */}
              <div className="lg:col-span-2">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-6">
                  Send a Message
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight mb-6">
                  We Are Listening
                </h2>
                <p className="text-lg text-[#4a5b4a] leading-relaxed mb-8">
                  Whether you are a researcher, a prospective student, a
                  development partner, or a member of the press — complete the
                  form and the right team member will respond.
                </p>

                {/* Quick contact reference */}
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#2d5a2d] flex-shrink-0" />
                    <a
                      href="mailto:tcoefs@unijos.edu.ng"
                      className="text-sm text-[#4a5b4a] hover:text-[#2d5a2d] transition-colors duration-200"
                    >
                      tcoefs@unijos.edu.ng
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#2d5a2d] flex-shrink-0" />
                    <a
                      href="tel:+2348034377953"
                      className="text-sm text-[#4a5b4a] hover:text-[#2d5a2d] transition-colors duration-200"
                    >
                      +234 803 437 7953
                    </a>
                  </div>
                </div>
              </div>

              {/* Right — form card */}
              <div className="lg:col-span-3">
                <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg p-8">
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#2d5a2d] to-[#4a5b4a]">
                      <Send className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#2f3e2f] leading-tight">
                        Send a Message
                      </h3>
                      <p className="text-xs text-[#4a5b4a] mt-0.5">
                        We respond within one working day
                      </p>
                    </div>
                  </div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── SECTION 3: CONNECT WITH US ───────────────────────────────────────── */}
      <AnimatedSection animation="slide-up">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            {/* Section opening */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Connect With Us
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight mb-4">
                Follow Our Work
              </h2>
              <p className="text-lg text-[#4a5b4a] leading-relaxed max-w-xl mx-auto">
                Stay informed on research updates, training announcements, and
                institutional news across our official channels.
              </p>
            </div>

            {/* Social cards — 4-col */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {socials.map(({ platform, handle, url, Icon }) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col items-center text-center"
                >
                  {/* Signature hover bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />

                  <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#2d5a2d]/10 mb-4 group-hover:scale-110 group-hover:rotate-1 transition-all duration-300">
                    <Icon className="w-7 h-7 text-[#2d5a2d]" />
                  </div>

                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                    {platform}
                  </p>
                  <p className="text-sm font-medium text-[#2f3e2f] leading-snug">
                    {handle}
                  </p>
                </a>
              ))}
            </div>

            {/* Universal handle note */}
            <p className="text-center text-sm text-[#4a5b4a] mt-8">
              All platforms:{" "}
              <span className="font-semibold text-[#2d5a2d]">@tcoefs</span>
              {"  ·  "}YouTube:{" "}
              <span className="font-semibold text-[#2d5a2d]">
                @TETFund_TCoEFS
              </span>
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* ── SECTION 4: MAP ───────────────────────────────────────────────────── */}
      <AnimatedSection animation="fade">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
          <div className="max-w-6xl mx-auto">
            {/* Section opening */}
            <div className="mb-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                Location
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight mb-3">
                Find Us
              </h2>
              <p className="text-lg text-[#4a5b4a] leading-relaxed max-w-xl">
                University of Jos, Naraguta Campus, Plateau State, Nigeria.
              </p>
            </div>

            {/* Map embed */}
            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://maps.google.com/maps?q=9.964017,8.880296&z=16&output=embed&hl=en"
                width="600"
                height="480"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TCoEFS location — University of Jos Naraguta Campus"
                className="w-full"
              />
            </div>

            {/* Address strip below map */}
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#2d5a2d] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#4a5b4a] leading-relaxed">
                  TETFund Centre of Excellence in Food Security (TCoEFS),
                  University of Jos, Naraguta Campus, Plateau State, Nigeria
                </p>
              </div>
              <a
                href="https://maps.app.goo.gl/TB3bqphYLNCMVNGq8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 group text-sm text-[#2d5a2d] font-medium hover:text-[#1e4a1e] transition-colors duration-200 whitespace-nowrap flex-shrink-0"
              >
                Open in Google Maps
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
