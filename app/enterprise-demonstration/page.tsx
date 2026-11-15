import type { Metadata } from "next";
import { Building2, FlaskConical, Layers, TrendingUp, Users } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/site/page-hero";
import { CheckList, Section, SectionHeader } from "@/components/site/ui";
import { FeatureGrid, P, SplitFeature, StatRow } from "@/components/site/blocks";
import { RevealImage } from "@/components/site/motion";

export const metadata: Metadata = {
  title: "Enterprise and Demonstration",
  description:
    "Integrating research, production, and sustainability through practical enterprise models.",
};

const poultryItems = [
  "Enterprise viability",
  "Revenue-generating capacity",
  "Integration of research and training",
  "Applied livestock management systems",
  "Alignment with TETFund Disbursement-Linked Indicators",
];

const greenhouseItems = [
  "Demonstrate controlled environment agriculture",
  "Strengthen enterprise-based learning",
  "Enhance internal revenue generation",
  "Promote scalable crop production systems",
];

const farmlandItems = [
  "Agroforestry demonstrations",
  "Crop production trials",
  "Livestock pasture development",
  "Postgraduate field research",
  "Farmer-focused demonstration activities",
];

const sustainabilityCards = [
  {
    icon: TrendingUp,
    title: "Financial Sustainability",
    description:
      "Enterprise revenues support Centre operations and reduce dependence on external funding cycles.",
  },
  {
    icon: Users,
    title: "Practical Student Training",
    description:
      "Students gain real-world agricultural enterprise experience embedded within academic programmes.",
  },
  {
    icon: FlaskConical,
    title: "Research Validation",
    description:
      "Production systems provide live validation environments for applied research outputs.",
  },
  {
    icon: Layers,
    title: "Community Engagement",
    description:
      "Demonstration farms serve as knowledge transfer hubs for local farmers and stakeholders.",
  },
  {
    icon: Building2,
    title: "Institutional Competitiveness",
    description:
      "Enterprise models strengthen TCoEFS positioning as a self-sustaining centre of excellence.",
  },
];

const stats = [
  { value: 1550, label: "Broilers reared & marketed" },
  { display: "4 ha", label: "Allocated demonstration farmland" },
  { display: "3–4 kg", label: "Average maturity weight per bird" },
];

export default function EnterpriseDemonstrationPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PageHero
          crumbs={[{ label: "Enterprise & Demonstration" }]}
          title="Enterprise and *Demonstration.*"
          lede="Integrating research, production, and sustainability through practical enterprise models."
          image="/ENTERPRISE_and_DEMONSTRATION/poultry-1-opt.webp"
          imageAlt="Broiler production at the TCoEFS poultry enterprise"
        />

        <Section>
          <SectionHeader
            eyebrow="Overview"
            index="01"
            title="Driving impact through *enterprise.*"
          />
          <div className="prose-body mt-12 grid gap-x-12 gap-y-6 text-stone lg:grid-cols-12">
            <P className="lg:col-span-5">
              The TETFund Centre of Excellence in Food Security integrates
              enterprise-driven agricultural production into its operational
              framework to promote sustainability, practical training, and
              measurable impact.
            </P>
            <div className="lg:col-span-5 lg:col-start-8">
              <P delay={0.08}>
                Through structured demonstration models, the Centre validates
                research outputs, supports revenue generation, and provides
                hands-on learning platforms for students and stakeholders.
              </P>
            </div>
          </div>
          <StatRow stats={stats} className="mt-20" />
        </Section>

        {/* Poultry */}
        <Section tone="mist">
          <SplitFeature
            eyebrow="Poultry production initiative"
            index="02"
            title="Broiler production *enterprise.*"
            image="/ENTERPRISE_and_DEMONSTRATION/poultry-2-opt.webp"
            imageAlt="Broiler production enterprise at TCoEFS"
            secondaryImage="/ENTERPRISE_and_DEMONSTRATION/poultry-1-opt.webp"
            secondaryAlt="Poultry facility detail"
            aspect="aspect-[4/3] lg:aspect-[5/6]"
            badge={{ value: "1,550", label: "Broilers, Dec 2025" }}
          >
            <P>
              In alignment with institutional sustainability objectives, the
              Centre initiated a structured broiler production enterprise. In
              December 2025, TCoEFS successfully reared and marketed{" "}
              <strong className="font-medium text-ink">
                1,550 broiler chickens
              </strong>
              , each averaging{" "}
              <strong className="font-medium text-ink">
                3–4 kg at maturity
              </strong>
              .
            </P>
            <P>This initiative demonstrated:</P>
            <CheckList items={poultryItems} className="!mt-4 border-b border-line" />
            <P>
              The poultry initiative serves as a scalable demonstration model
              for sustainable livestock production.
            </P>
          </SplitFeature>
        </Section>

        {/* Greenhouse */}
        <Section>
          <SplitFeature
            reverse
            eyebrow="Greenhouse enterprise expansion"
            index="03"
            title="Greenhouse crop production *enterprise.*"
            image="/ENTERPRISE_and_DEMONSTRATION/greenhouse-1-opt.webp"
            imageAlt="Greenhouse crop production at TCoEFS"
            secondaryImage="/ENTERPRISE_and_DEMONSTRATION/greenhouse-inspection-opt.webp"
            secondaryAlt="Greenhouse inspection"
            aspect="aspect-[4/3] lg:aspect-[5/6]"
          >
            <P>
              The Centre is expanding greenhouse-based commercial production to
              strengthen enterprise sustainability and support climate-smart
              agricultural systems.
            </P>
            <P>
              Greenhouse bell pepper cultivation and additional high-value crop
              production initiatives are underway to:
            </P>
            <CheckList items={greenhouseItems} className="!mt-4 border-b border-line" />
            <P>
              This initiative complements research, training, and postgraduate
              experimentation.
            </P>
          </SplitFeature>
        </Section>

        {/* Farmland */}
        <section className="relative overflow-hidden bg-ink text-white">
          <RevealImage
            src="/ENTERPRISE_and_DEMONSTRATION/farm-land-opt.webp"
            alt="Demonstration farmland at TCoEFS"
            sizes="100vw"
            parallax={8}
            className="!absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/10" />
          <div className="shell relative grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:py-40">
            <div className="lg:col-span-6">
              <SectionHeader
                tone="dark"
                eyebrow="Research & demonstration farmland"
                index="04"
                title="Integrated field demonstration *systems.*"
                className="lg:!grid-cols-1"
              />
              <P className="prose-body mt-7 max-w-xl text-white/80">
                The allocated four hectares of farmland provide a platform for
                multidisciplinary agricultural research, demonstration, and
                training activities. This platform supports:
              </P>
              <CheckList
                tone="dark"
                items={farmlandItems}
                className="mt-6 max-w-xl border-b border-line-inverse"
              />
            </div>
          </div>
        </section>

        {/* Sustainability model */}
        <Section>
          <SectionHeader
            eyebrow="Enterprise-based sustainability model"
            index="05"
            title="Sustainability through *integrated* enterprise."
            lede="By integrating enterprise with academic and research activities, TCoEFS ensures operational resilience and long-term impact."
          />
          <FeatureGrid items={sustainabilityCards} className="mt-12" />
        </Section>
      </main>
      <Footer />
    </>
  );
}
