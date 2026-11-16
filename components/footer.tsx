"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUp } from "lucide-react";
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

// Suggested next pages, shown above the footer on inner pages so a visitor
// always has somewhere relevant to go next.
const related = [
  {
    label: "Programmes",
    text: "Postgraduate study, research, and training pathways.",
    href: "/programmes",
  },
  {
    label: "Facilities",
    text: "Greenhouse, laboratory and research farmland.",
    href: "/about/facilities",
  },
  {
    label: "Enterprise & Demonstration",
    text: "Production models that sustain the Centre.",
    href: "/enterprise-demonstration",
  },
  {
    label: "Leadership",
    text: "The Director, deputies and scientific team.",
    href: "/about/leadership",
  },
  {
    label: "Partnerships",
    text: "Ways to collaborate with or support the Centre.",
    href: "/partnerships",
  },
  {
    label: "Resources",
    text: "Publications, reports and training materials.",
    href: "/resources",
  },
  {
    label: "Newsletters & Events",
    text: "Quarterly issues and upcoming events.",
    href: "/news/newsletters-events",
  },
];

function ContinueExploring({ pathname }: { pathname: string }) {
  if (pathname === "/") return null;
  const links = related
    .filter((r) => !pathname.startsWith(r.href))
    .slice(0, 3);
  return (
    <nav
      aria-label="Continue exploring"
      className="border-t border-line bg-mist py-14"
    >
      <div className="shell">
        <p className="eyebrow text-pine">Continue exploring</p>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group flex h-full items-start justify-between gap-4 rounded-lg border border-line bg-white p-6 transition-colors duration-200 hover:border-pine"
              >
                <span>
                  <span className="block text-[1.0625rem] font-semibold text-ink group-hover:text-pine">
                    {l.label}
                  </span>
                  <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-stone">
                    {l.text}
                  </span>
                </span>
                <ArrowRight className="mt-1 size-5 shrink-0 text-pine transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export { Footer };

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <>
    <ContinueExploring pathname={pathname} />
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
    </>
  );
}
