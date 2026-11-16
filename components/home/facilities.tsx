import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink, SectionHeader } from "@/components/site/ui";
import { Stagger } from "@/components/site/motion";

const facilities = [
  {
    title: "Greenhouse complex",
    text: "Controlled environment production for research, training and commercial crops.",
    image: "/ENTERPRISE_and_DEMONSTRATION/greenhouse-1-opt.webp",
    alt: "The Centre's greenhouse complex",
    href: "/about/facilities",
  },
  {
    title: "Laboratory facilities",
    text: "A dedicated building allocated in July 2025 for laboratory-based research.",
    image: "/ENTERPRISE_and_DEMONSTRATION/tissue-lab-opt.webp",
    alt: "Laboratory benches at the Centre",
    href: "/about/facilities",
  },
  {
    title: "Research farmland",
    text: "Over four hectares for structured research and demonstration activities.",
    image: "/ENTERPRISE_and_DEMONSTRATION/farm-land-opt.webp",
    alt: "Research and demonstration farmland",
    href: "/about/facilities",
  },
  {
    title: "Enterprise production",
    text: "1,550 broilers reared and marketed in December 2025.",
    image: "/ENTERPRISE_and_DEMONSTRATION/poultry-2-opt.webp",
    alt: "The Centre's broiler production enterprise",
    href: "/enterprise-demonstration",
  },
];

/** A look inside the Centre's physical infrastructure. */
export default function Facilities() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="shell">
        <SectionHeader
          eyebrow="Inside the Centre"
          title="Infrastructure that turns research into practice."
          aside={
            <ButtonLink href="/about/facilities" variant="outline-dark">
              Explore the facilities
            </ButtonLink>
          }
        />
        <Stagger
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          itemClassName="h-full"
        >
          {facilities.map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-16px_rgb(15_23_42_/_0.3)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                <Image
                  src={f.image}
                  alt={f.alt}
                  fill
                  sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-[1.0625rem] font-semibold text-ink group-hover:text-pine">
                  {f.title}
                </h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-stone">
                  {f.text}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-pine">
                  View
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
