import Link from "next/link";
import { ArrowRight, GraduationCap, Handshake, Microscope, Sprout } from "lucide-react";

const pathways = [
  {
    icon: GraduationCap,
    audience: "Prospective students",
    title: "Postgraduate study",
    text: "PGD, MSc, PhD and MBA programmes across four thematic clusters.",
    href: "/programmes/postgraduate",
  },
  {
    icon: Microscope,
    audience: "Researchers",
    title: "Research & innovation",
    text: "Applied, interdisciplinary research areas and the Centre's facilities.",
    href: "/programmes/research-innovation",
  },
  {
    icon: Sprout,
    audience: "Farmers & trainees",
    title: "Training & extension",
    text: "Short courses, extension clinics and capacity-building workshops.",
    href: "/programmes/training-extension",
  },
  {
    icon: Handshake,
    audience: "Partners & funders",
    title: "Work with the Centre",
    text: "Research collaboration, enterprise development and support opportunities.",
    href: "/partnerships",
  },
];

/** Four routes into the site, one per audience, directly under the hero. */
export default function Pathways() {
  return (
    <section aria-label="Find your way in" className="bg-mist">
      <div className="shell">
        <ul className="relative z-10 -mt-10 grid overflow-hidden rounded-lg border border-line bg-white shadow-[0_12px_32px_-16px_rgb(15_23_42_/_0.25)] sm:grid-cols-2 lg:grid-cols-4">
          {pathways.map((p) => {
            const Icon = p.icon;
            return (
              <li
                key={p.href}
                className="-mb-px -mr-px border-b border-r border-line"
              >
                <Link
                  href={p.href}
                  className="group flex h-full flex-col p-6 transition-colors duration-200 hover:bg-mist lg:p-7"
                >
                  <Icon strokeWidth={1.5} className="size-6 text-pine" />
                  <p className="eyebrow mt-5 text-stone">{p.audience}</p>
                  <h2 className="mt-1.5 text-[1.125rem] font-semibold text-ink group-hover:text-pine">
                    {p.title}
                  </h2>
                  <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-stone">
                    {p.text}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-pine">
                    Find out more
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="h-12" />
    </section>
  );
}
