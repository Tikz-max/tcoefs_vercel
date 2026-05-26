import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  Building2,
  FlaskConical,
  Leaf,
  LockKeyhole,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title:
    "Research Infrastructure and Facilities | TETFUND Centre of Excellence in Food Security - University of Jos",
  description:
    "Explore TCoEFS greenhouse, laboratory, farmland, and enterprise infrastructure supporting sustainable food systems innovation.",
};

const snapshots = [
  "Completed Greenhouse Facilities",
  "Dedicated Laboratory Building Allocated",
  "4 Hectares of Research Farmland",
  "1,550 Broilers Produced and Marketed",
];

const greenhouseCapabilities = [
  "Climate-smart crop experimentation",
  "Seed trials and propagation",
  "High-value vegetable production",
  "Postgraduate practical training",
  "Enterprise-based agricultural production",
];

const labFocusAreas = [
  "Plant biotechnology research",
  "Crop improvement studies",
  "Animal health investigations",
  "Microbial and pathogen research",
  "Seed quality and storage systems",
];

const farmlandUses = [
  "Agroforestry demonstration blocks",
  "Crop production and seed trials",
  "Livestock pasture development",
  "Postgraduate field research",
  "Farmer-focused extension activities",
  "Enterprise expansion initiatives",
];

const enterpriseMilestones = [
  "Operational production capacity",
  "Revenue-generating potential",
  "Training integration",
  "Applied research demonstration",
];

const protectionMeasures = [
  "Asset protection",
  "Controlled facility access",
  "Research continuity",
  "Long-term infrastructure sustainability",
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[#4a5b4a]">
          <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d]">
            <BadgeCheck className="h-3.5 w-3.5" />
          </span>
          <span className="leading-7">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#2d5a2d]">
      {children}
    </p>
  );
}

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-[#fbfcf8] text-[#2f3e2f]">
      <Navbar />
      <main>
        <section className="relative isolate min-h-[540px] overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
          <Image
            src="/spotlight-images/spotlight-card2/greenhouse-facility.webp"
            alt="Greenhouse and demonstration farm infrastructure at TCoEFS"
            fill
            className="z-0 object-cover brightness-[0.58] contrast-[1.08] saturate-[0.96]"
            priority
            style={{ objectPosition: "center center" }}
          />
          <div className="absolute inset-0 z-10 bg-[#102114]/20" />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#08160d]/92 via-[#08160d]/78 to-[#08160d]/42" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#08160d]/44 via-transparent to-transparent" />
          <div className="relative z-20 mx-auto flex min-h-[360px] max-w-7xl flex-col justify-end">
            <div className="max-w-4xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.42)]">
              <div className="mb-6 flex flex-wrap gap-2">
                {['Greenhouse', 'Laboratory', 'Farmland', 'Enterprise'].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/25 bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] backdrop-blur"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.03em] md:text-6xl lg:text-7xl">
                Research Infrastructure and Facilities
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
                Integrated research, training, and enterprise infrastructure
                supporting sustainable food systems innovation.
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-10 -mt-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-4 rounded-[1.75rem] bg-white p-4 shadow-[0_24px_80px_rgba(47,62,47,0.12)] ring-1 ring-[#2d5a2d]/10 sm:grid-cols-2 lg:grid-cols-4">
            {snapshots.map((snapshot) => (
              <div
                key={snapshot}
                className="rounded-2xl bg-[#fbfcf8] p-5 ring-1 ring-[#2d5a2d]/8"
              >
                <p className="text-sm font-semibold leading-6 text-[#2f3e2f]">
                  {snapshot}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative min-h-[430px] overflow-hidden rounded-[1.75rem] bg-[#eef3ed] shadow-[0_18px_60px_rgba(47,62,47,0.1)]">
                <Image
                  src="/ENTERPRISE_and_DEMONSTRATION/greenhouse-1-opt.webp"
                  alt="Greenhouse crop production at TCoEFS"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative min-h-[430px] overflow-hidden rounded-[1.75rem] bg-[#eef3ed] shadow-[0_18px_60px_rgba(47,62,47,0.1)] sm:mt-12">
                <Image
                  src="/spotlight-images/spotlight-card2/greenhouse-facility.webp"
                  alt="Controlled environment greenhouse facility"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <SectionLabel>Greenhouse Complex</SectionLabel>
              <h2 className="text-3xl font-bold tracking-[-0.02em] text-[#2f3e2f] md:text-5xl">
                Greenhouse and Controlled Environment Production
              </h2>
              <p className="mt-6 text-base leading-8 text-[#4a5b4a]">
                The Centre's greenhouse facilities support applied research,
                postgraduate training, and commercial crop production under
                controlled environmental conditions. The facility is central to
                advancing climate-smart agriculture and translating research into
                scalable production models.
              </p>
              <BulletList items={greenhouseCapabilities} />
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <SectionLabel>Laboratory Development</SectionLabel>
              <h2 className="text-3xl font-bold tracking-[-0.02em] text-[#2f3e2f] md:text-5xl">
                Laboratory and Tissue Culture Facilities
              </h2>
              <p className="mt-6 text-base leading-8 text-[#4a5b4a]">
                In July 2025, a dedicated building was allocated to serve as the
                permanent laboratory facility of the Centre. This strengthens
                readiness for laboratory-based research, postgraduate
                experimentation, and advanced scientific analysis in support of
                food security innovation.
              </p>
              <BulletList items={labFocusAreas} />
            </div>
            <div className="relative min-h-[520px] overflow-hidden rounded-[1.75rem] bg-[#eef3ed] shadow-[0_18px_60px_rgba(47,62,47,0.1)]">
              <Image
                src="/ENTERPRISE_and_DEMONSTRATION/tissue-lab-opt.webp"
                alt="Tissue culture and laboratory facility at TCoEFS"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative min-h-[440px] overflow-hidden rounded-[2rem] bg-[#eef3ed] shadow-[0_18px_60px_rgba(47,62,47,0.1)]">
              <Image
                src="/ENTERPRISE_and_DEMONSTRATION/farm-land-opt.webp"
                alt="Research and demonstration farmland at TCoEFS"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17351d]/70 via-transparent to-transparent" />
            </div>
            <div className="mx-auto -mt-20 max-w-5xl rounded-[1.75rem] bg-white p-7 shadow-[0_24px_80px_rgba(47,62,47,0.12)] ring-1 ring-[#2d5a2d]/10 md:p-10">
              <SectionLabel>Research Land</SectionLabel>
              <h2 className="text-3xl font-bold tracking-[-0.02em] text-[#2f3e2f] md:text-5xl">
                Research and Demonstration Farmland
              </h2>
              <p className="mt-6 text-base leading-8 text-[#4a5b4a]">
                Over four (4) hectares of land adjacent to the greenhouse have
                been allocated for structured research and demonstration
                activities. This strengthens campus visibility of research
                outputs and provides a practical platform for training, trials,
                and extension engagement.
              </p>
              <BulletList items={farmlandUses} />
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="relative min-h-[520px] overflow-hidden rounded-[1.75rem] bg-[#eef3ed] shadow-[0_18px_60px_rgba(47,62,47,0.1)]">
              <Image
                src="/ENTERPRISE_and_DEMONSTRATION/poultry-2-opt.webp"
                alt="Poultry production enterprise at TCoEFS"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <SectionLabel>Enterprise Production</SectionLabel>
              <h2 className="text-3xl font-bold tracking-[-0.02em] text-[#2f3e2f] md:text-5xl">
                Enterprise-Based Production Systems
              </h2>
              <p className="mt-6 text-base leading-8 text-[#4a5b4a]">
                TCoEFS integrates enterprise-driven agricultural production into
                its operational model to promote sustainability and practical
                training. In December 2025, the Centre successfully reared and
                marketed 1,550 broiler chickens, demonstrating viable production
                capacity aligned with institutional objectives.
              </p>
              <BulletList items={enterpriseMilestones} />
              <p className="mt-7 rounded-2xl bg-[#f4c542]/15 p-5 text-base leading-7 text-[#4a5b4a]">
                Arrangements for greenhouse bell pepper cultivation and
                additional enterprise activities are underway to expand
                sustainable production systems.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#244f2b] p-8 text-white md:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#f4c542]">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">
                  Facility Protection and Sustainability Measures
                </h2>
                <p className="mt-6 text-base leading-8 text-white/76">
                  To safeguard infrastructure investments and ensure continuity of
                  research and training activities, structured security measures
                  have been implemented for key facilities, including the
                  greenhouse complex, laboratory facilities, and research and
                  demonstration areas.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {protectionMeasures.map((measure, index) => {
                  const icons = [LockKeyhole, Building2, FlaskConical, Leaf];
                  const Icon = icons[index] ?? Sprout;
                  return (
                    <div
                      key={measure}
                      className="rounded-2xl bg-white/8 p-5 ring-1 ring-white/10"
                    >
                      <Icon className="mb-5 h-6 w-6 text-[#f4c542]" />
                      <p className="font-semibold text-white">{measure}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
