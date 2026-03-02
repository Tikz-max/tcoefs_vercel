"use client";

import Link from "next/link";
import { ArrowUp, ArrowRight, MapPin, Phone, Mail } from "lucide-react";

export { Footer };

// ─── Social icon SVGs (Lucide does not ship all of these) ────────────────────

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

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

// ─── Data ────────────────────────────────────────────────────────────────────

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programmes", href: "/programmes" },
  {
    label: "Enterprise & Demonstration",
    href: "/enterprise/agricultural-enterprise",
  },
  { label: "Partnerships", href: "/partnerships" },
  { label: "News & Events", href: "/news/newsletters-events" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

const programmeLinks = [
  { label: "Postgraduate Programmes", href: "/programmes/postgraduate" },
  { label: "Research & Innovation", href: "/programmes/research-innovation" },
  { label: "Training & Extension", href: "/programmes/training-extension" },
  { label: "Upcoming Training", href: "/news/newsletters-events" },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/tetfund-centre-of-excellence-in-food-security-tcoefs-university-of-jos/",
    Icon: LinkedinIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/19vqPg5CmF/",
    Icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/tcoefs?igsh=MXQwNjlvN3AwN2JyYw==",
    Icon: InstagramIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@TETFund_TCoEFS",
    Icon: YoutubeIcon,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2d5a2d] text-white">
      {/* ── MAIN FOOTER GRID ─────────────────────────────────────────────────── */}
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* ── Column 1: Brand ─────────────────────────────────────────────── */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-white leading-none mb-1">
                TCoEFS
              </h2>
              <p className="text-white/50 text-xs font-medium uppercase tracking-widest mt-1">
                University of Jos
              </p>
            </div>

            <p className="text-white/75 text-sm leading-relaxed">
              A research-driven Centre advancing sustainable food systems
              through postgraduate education, applied research,
              enterprise-driven demonstration, and strategic partnerships.
            </p>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/25 hover:border-white/50 rounded-lg text-xs font-medium text-white/70 hover:text-white transition-all duration-200 group"
            >
              <ArrowUp
                size={13}
                className="group-hover:-translate-y-0.5 transition-transform duration-200"
              />
              Back to Top
            </button>
          </div>

          {/* ── Column 2: Quick Links ────────────────────────────────────────── */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/65 hover:text-white text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Programmes ─────────────────────────────────────────── */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">
              Programmes
            </h3>
            <ul className="space-y-3">
              {programmeLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/65 hover:text-white text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Contact + Socials ──────────────────────────────────── */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">
              Contact
            </h3>

            <div className="space-y-3">
              <a
                href="mailto:tcoefs@unijos.edu.ng"
                className="flex items-center gap-3 group"
              >
                <Mail className="w-4 h-4 text-white/40 flex-shrink-0" />
                <span className="text-white/65 hover:text-white text-sm transition-colors duration-200">
                  tcoefs@unijos.edu.ng
                </span>
              </a>

              <a
                href="tel:+2348034390119"
                className="flex items-center gap-3 group"
              >
                <Phone className="w-4 h-4 text-white/40 flex-shrink-0" />
                <span className="text-white/65 hover:text-white text-sm transition-colors duration-200">
                  +234 803 439 0119
                </span>
              </a>

              <a
                href="tel:+2348034377953"
                className="flex items-center gap-3 group"
              >
                <Phone className="w-4 h-4 text-white/40 flex-shrink-0" />
                <span className="text-white/65 hover:text-white text-sm transition-colors duration-200">
                  +234 803 437 7953
                </span>
              </a>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white/40 flex-shrink-0 mt-0.5" />
                <span className="text-white/65 text-sm leading-relaxed">
                  University of Jos, Naraguta Campus,
                  <br />
                  Plateau State, Nigeria
                </span>
              </div>
            </div>

            {/* Social icons */}
            <div>
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">
                Connect
              </p>
              <div className="flex items-center gap-2">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
              <p className="text-white/40 text-xs mt-2">
                @tcoefs &nbsp;·&nbsp; YouTube: @TETFund_TCoEFS
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA STRIP ───────────────────────────────────────────────────────── */}
      <div className="border-t border-white/10 border-b border-b-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/80 text-sm leading-relaxed text-center sm:text-left">
            Partner with TCoEFS to advance research-driven food security
            solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href="/partnerships"
              className="block w-full sm:inline-block sm:w-auto"
            >
              <button className="w-full inline-flex items-center justify-center gap-1.5 group bg-white text-[#2d5a2d] font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-white/90 transition-all duration-200">
                Partner With Us
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </Link>
            <Link
              href="/contact"
              className="block w-full sm:inline-block sm:w-auto"
            >
              <button className="w-full inline-flex items-center justify-center gap-1.5 border border-white/40 hover:border-white/70 text-white/80 hover:text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-all duration-200">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ──────────────────────────────────────────────────────── */}
      <div className="px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/50 text-xs text-center md:text-left">
            &copy; {year} TETFund Centre of Excellence in Food Security
            (TCoEFS), University of Jos. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-white/50 hover:text-white/80 text-xs transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/50 hover:text-white/80 text-xs transition-colors duration-200"
            >
              Terms of Use
            </a>
            <a
              href="#"
              className="text-white/50 hover:text-white/80 text-xs transition-colors duration-200"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
