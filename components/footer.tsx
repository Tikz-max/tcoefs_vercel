"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { site, socials } from "@/lib/site";
import { ButtonLink, Contours, Eyebrow } from "@/components/site/ui";
import { Reveal, SplitText } from "@/components/site/motion";

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
        className="group inline-flex text-[0.9375rem] text-white/70 transition-colors duration-300 hover:text-white"
      >
        <span className="link-draw pb-0.5">{children}</span>
      </Link>
    </li>
  );
}

export { Footer };

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden bg-ink text-white">
      <Contours
        seed={4}
        className="absolute -right-[20%] -top-[10%] h-[120%] w-[90%] text-white/[0.05]"
      />

      {/* Closing call to action */}
      <div className="shell relative pb-20 pt-24 sm:pt-32 lg:pb-28 lg:pt-40">
        <Reveal y={12}>
          <Eyebrow tone="dark" className="mb-8">
            Work with the Centre
          </Eyebrow>
        </Reveal>
        <SplitText
          as="h2"
          text="Partner with TCoEFS to advance *research-driven* food security solutions."
          className="display display-xl block max-w-[18ch] text-white"
        />
        <Reveal delay={0.25} className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/partnerships" variant="wheat">
            Partner with us
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline-light">
            Contact the Centre
          </ButtonLink>
        </Reveal>
      </div>

      {/* Directory */}
      <div className="shell relative">
        <div className="grid gap-x-10 gap-y-14 border-t border-line-inverse py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4">
              <span className="grid size-14 place-items-center rounded-full bg-white">
                <Image
                  src="/brand/tcoefs-logo.png"
                  alt="TCoEFS crest"
                  width={80}
                  height={69}
                  className="h-auto w-10"
                />
              </span>
              <div>
                <p className="font-display text-2xl tracking-[-0.02em]">
                  TCoEFS
                </p>
                <p className="eyebrow mt-1 text-white/55">{site.host}</p>
              </div>
            </div>
            <p className="mt-7 max-w-sm text-[0.9375rem] leading-relaxed text-white/65">
              A research-driven Centre advancing sustainable food systems
              through postgraduate education, applied research,
              enterprise-driven demonstration, and strategic partnerships.
            </p>
          </div>

          <nav aria-label="Explore" className="lg:col-span-2 lg:col-start-6">
            <p className="eyebrow mb-6 text-white/45">Explore</p>
            <ul className="space-y-3">
              {explore.map((l) => (
                <FooterLink key={l.href} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </ul>
          </nav>

          <nav aria-label="Programmes" className="lg:col-span-2">
            <p className="eyebrow mb-6 text-white/45">Programmes</p>
            <ul className="space-y-3">
              {programmes.map((l) => (
                <FooterLink key={l.href} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-6 text-white/45">Contact</p>
            <a
              href={`mailto:${site.email}`}
              className="group block font-display text-[1.375rem] tracking-[-0.01em]"
            >
              <span className="link-draw pb-0.5">{site.email}</span>
            </a>
            <a
              href={site.phoneHref}
              className="mt-2 block text-[0.9375rem] text-white/70 hover:text-white"
            >
              {site.phone}
            </a>
            <address className="mt-5 text-[0.9375rem] not-italic leading-relaxed text-white/65">
              {site.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`TCoEFS on ${s.label}`}
                    className="group inline-flex items-center gap-1 text-[0.875rem] text-white/70 transition-colors hover:text-wheat"
                  >
                    {s.label}
                    <ArrowUpRight className="size-3.5 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Wordmark */}
      <div aria-hidden="true" className="relative select-none overflow-hidden">
        <p className="display -mb-[0.18em] whitespace-nowrap text-center text-[21.5vw] leading-[0.8] text-white/[0.055]">
          TCoEFS
        </p>
      </div>

      <div className="relative border-t border-line-inverse">
        <div className="shell flex flex-col gap-4 py-6 text-[0.8125rem] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} TETFund Centre of Excellence in Food Security
            (TCoEFS), University of Jos. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="eyebrow hidden text-white/35 md:inline">
              {site.coordinates}
            </span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
            >
              Back to top
              <span className="grid size-8 place-items-center rounded-full border border-white/25 transition-colors duration-500 group-hover:border-wheat group-hover:bg-wheat group-hover:text-ink">
                <ArrowUp className="size-3.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
