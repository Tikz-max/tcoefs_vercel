import type { Metadata } from "next";
import { Building2, FlaskConical, Leaf, LockKeyhole } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/site/page-hero";
import { CheckList, Section, SectionHeader } from "@/components/site/ui";
import { FeatureGrid, P, SplitFeature } from "@/components/site/blocks";
import { Reveal, RevealImage } from "@/components/site/motion";

export const metadata: Metadata = {
  title: "Research Infrastructure and Facilities",
  description:
    "Explore TCoEFS greenhouse, laboratory, farmland, and enterprise infrastructure supporting sustainable food systems innovation.",
};

const snapshots = [
  "Completed greenhouse facilities",
  "Dedicated laboratory building allocated",
  "4 hectares of research farmland",
  "1,550 broilers produced and marketed",
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
  { icon: LockKeyhole, title: "Asset protection" },
  { icon: Building2, title: "Controlled facility access" },
  { icon: FlaskConical, title: "Research continuity" },
  { icon: Leaf, title: "Long-term infrastructure sustainability" },
];

export default function FacilitiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          crumbs={[{ label: "About", href: "/about" }, { label: "Facilities" }]}
          title="Research Infrastructure and *Facilities.*"
          lede="Integrated research, training, and enterprise infrastructure supporting sustainable food systems innovation."
          image="/ENTERPRISE_and_DEMONSTRATION/greenhouse-1-opt.webp"
          imageAlt="Greenhouse and demonstration farm infrastructure at TCoEFS"
          meta={["Greenhouse", "Laboratory", "Farmland", "Enterprise"]}
        />

        {/* Snapshot */}
        <section className="border-b border-line bg-white">
          <ul className="shell grid sm:grid-cols-2 lg:grid-cols-4">
            {snapshots.map((snapshot, i) => (
              <Reveal as="li" key={snapshot} delay={i * 0.07} y={14}>
                <div
                  className={`flex h-full items-baseline gap-5 border-line py-7 lg:py-9 ${
                    i > 0 ? "border-t sm:border-t-0 lg:border-l lg:pl-8" : ""
                  } ${i >= 2 ? "sm:border-t lg:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l sm:pl-8" : ""}`}
                >
                  <span className="eyebrow text-wheat-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display text-[1.25rem] leading-snug tracking-[-0.01em] text-ink">
                    {snapshot}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Greenhouse */}
        <Section>
          <SplitFeature
            eyebrow="Greenhouse complex"
            index="01"
            title="Greenhouse and controlled environment *production.*"
            image="/ENTERPRISE_and_DEMONSTRATION/greenhouse-inspection-opt.webp"
            imageAlt="Greenhouse crop production at TCoEFS"
            secondaryImage="/spotlight-images/spotlight-card2/greenhouse-facility.webp"
            secondaryAlt="Controlled environment greenhouse facility"
            aspect="aspect-[4/3] lg:aspect-[5/6]"
          >
            <P>
              The Centre's greenhouse facilities support applied research,
              postgraduate training, and commercial crop production under
              controlled environmental conditions. The facility is central to
              advancing climate-smart agriculture and translating research into
              scalable production models.
            </P>
            <CheckList items={greenhouseCapabilities} className="!mt-8 border-b border-line" />
          </SplitFeature>
        </Section>

        {/* Laboratory */}
        <Section tone="mist">
          <SplitFeature
            reverse
            eyebrow="Laboratory development"
            index="02"
            title="Laboratory and tissue culture *facilities.*"
            image="/ENTERPRISE_and_DEMONSTRATION/tissue-lab-opt.webp"
            imageAlt="Tissue culture and laboratory facility at TCoEFS"
            aspect="aspect-[4/3] lg:aspect-[5/6]"
            badge={{ value: "July 2025", label: "Building allocated" }}
          >
            <P>
              In July 2025, a dedicated building was allocated to serve as the
              permanent laboratory facility of the Centre. This strengthens
              readiness for laboratory-based research, postgraduate
              experimentation, and advanced scientific analysis in support of
              food security innovation.
            </P>
            <CheckList items={labFocusAreas} className="!mt-8 border-b border-line" />
          </SplitFeature>
        </Section>

        {/* Farmland: full-bleed photograph */}
        <section className="relative overflow-hidden bg-ink text-white">
          <RevealImage
            src="/ENTERPRISE_and_DEMONSTRATION/farm-land-opt.webp"
            alt="Research and demonstration farmland at TCoEFS"
            sizes="100vw"
            parallax={8}
            className="!absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/10" />
          <div className="shell relative grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:py-40">
            <div className="lg:col-span-6">
              <SectionHeader
                tone="dark"
                eyebrow="Research land"
                index="03"
                title="Research and demonstration *farmland.*"
                className="lg:!grid-cols-1"
              />
              <P className="prose-body mt-7 max-w-xl text-white/80">
                Over four (4) hectares of land adjacent to the greenhouse have
                been allocated for structured research and demonstration
                activities. This strengthens campus visibility of research
                outputs and provides a practical platform for training, trials,
                and extension engagement.
              </P>
              <CheckList
                tone="dark"
                columns={2}
                items={farmlandUses}
                className="mt-8 border-b border-line-inverse"
              />
            </div>
          </div>
        </section>

        {/* Enterprise */}
        <Section>
          <SplitFeature
            eyebrow="Enterprise production"
            index="04"
            title="Enterprise-based production *systems.*"
            image="/ENTERPRISE_and_DEMONSTRATION/poultry-2-opt.webp"
            imageAlt="Poultry production enterprise at TCoEFS"
            aspect="aspect-[4/3] lg:aspect-[5/6]"
            badge={{ value: "1,550", label: "Broilers, Dec 2025" }}
          >
            <P>
              TCoEFS integrates enterprise-driven agricultural production into
              its operational model to promote sustainability and practical
              training. In December 2025, the Centre successfully reared and
              marketed 1,550 broiler chickens, demonstrating viable production
              capacity aligned with institutional objectives.
            </P>
            <CheckList items={enterpriseMilestones} className="!mt-8 border-b border-line" />
            <P>
              Arrangements for greenhouse bell pepper cultivation and
              additional enterprise activities are underway to expand
              sustainable production systems.
            </P>
          </SplitFeature>
        </Section>

        {/* Protection */}
        <Section tone="forest" className="grain">
          <SectionHeader
            tone="dark"
            eyebrow="Safeguards"
            index="05"
            title="Facility protection and *sustainability* measures."
            lede="To safeguard infrastructure investments and ensure continuity of research and training activities, structured security measures have been implemented for key facilities, including the greenhouse complex, laboratory facilities, and research and demonstration areas."
          />
          <FeatureGrid
            tone="dark"
            columns={4}
            items={protectionMeasures}
            className="mt-16"
          />
        </Section>
      </main>
      <Footer />
    </>
  );
}
