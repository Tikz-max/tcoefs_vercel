"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { site, socials } from "@/lib/site";
import { ButtonLink } from "@/components/site/ui";

const explore = [
  { label: "About the Centre", href: "/about" },
  { label: "Leadership", href: "/about/leadership" },
  { label: "Facilities", href: "/about/facilities" },
  { label: "Enterprise & Demonstration", href: "/enterprise-demonstration" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Resources", href: "/resources" },
];

const programmes = [
  { label: "All Programmes", href: "/programmes" },
  { label: "Postgraduate Programmes", href: "/programmes/postgraduate" },
  { label: "Research & Innovation", href: "/programmes/research-innovation" },
  { label: "Training & Extension", href: "/programmes/training-extension" },
  { label: "Newsletters & Events", href: "/news/newsletters-events" },
];

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-[0.9375rem] text-white/75 transition-colors duration-200 hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}

export { Footer };

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest text-white">
      {/* Call to action */}
      <div className="border-b border-line-inverse">
        <div className="shell flex flex-col gap-6 py-12 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="display display-md max-w-2xl text-white">
            Partner with TCoEFS to advance research-driven food security
            solutions.
          </h2>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/partnerships" variant="wheat">
              Partner with us
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline-light">
              Contact the Centre
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Directory */}
      <div className="shell grid gap-x-10 gap-y-12 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-4">
            <span className="grid size-16 place-items-center rounded-lg bg-white p-1.5">
              <Image
                src="/brand/tcoefs-logo.png"
                alt="TCoEFS crest"
                width={104}
                height={90}
                className="h-auto w-full"
              />
            </span>
            <div>
              <p className="text-[1.125rem] font-semibold">TCoEFS</p>
              <p className="text-[0.875rem] text-white/70">{site.host}</p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-white/75">
            A research-driven Centre advancing sustainable food systems through
            postgraduate education, applied research, enterprise-driven
            demonstration, and strategic partnerships.
          </p>
        </div>

        <nav aria-label="Explore" className="lg:col-span-2 lg:col-start-6">
          <p className="mb-4 text-[0.9375rem] font-semibold">Explore</p>
          <ul className="space-y-2.5">
            {explore.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </ul>
        </nav>

        <nav aria-label="Programmes" className="lg:col-span-2">
          <p className="mb-4 text-[0.9375rem] font-semibold">Programmes</p>
          <ul className="space-y-2.5">
            {programmes.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="mb-4 text-[0.9375rem] font-semibold">Contact</p>
          <address className="space-y-2.5 text-[0.9375rem] not-italic text-white/75">
            <a href={`mailto:${site.email}`} className="block hover:text-white">
              {site.email}
            </a>
            <a href={site.phoneHref} className="block hover:text-white">
              {site.phone}
            </a>
            <p>
              {site.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </address>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`TCoEFS on ${s.label}`}
                  className="text-[0.875rem] font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line-inverse">
        <div className="shell flex flex-col gap-3 py-5 text-[0.8125rem] text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} TETFund Centre of Excellence in Food Security
            (TCoEFS), University of Jos. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex min-h-11 items-center gap-2 text-white/80 hover:text-white"
          >
            Back to top
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
