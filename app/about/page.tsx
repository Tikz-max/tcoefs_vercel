import type { Metadata } from "next";
import {
  Beef,
  Leaf,
  Package,
  TrendingUp,
  UserCheck,
  Wheat,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/site/page-hero";
import {
  Contours,
  NumberedList,
  Section,
  SectionHeader,
} from "@/components/site/ui";
import { IndexRows, P, SplitFeature, StatRow } from "@/components/site/blocks";
import { Reveal } from "@/components/site/motion";

export const metadata: Metadata = {
  title: "About the Centre",
  description:
    "The TETFund Centre of Excellence in Food Security, University of Jos: mandate, vision, mission, strategic focus areas and progress.",
};

const mandates = [
  "Advancing interdisciplinary research in food security and sustainable agriculture",
  "Developing high-quality postgraduate programmes aligned with national priorities",
  "Strengthening institutional performance in line with TETFund expectations",
  "Delivering farmer-focused training and extension services",
  "Promoting enterprise-based demonstration for sustainability",
  "Building strategic partnerships for innovation and impact",
];

const focusAreas = [
  {
    icon: Leaf,
    title: "Climate-Smart Agriculture",
    description:
      "Promoting resilient agricultural production systems that respond to climate variability through adaptive technologies, water-efficient practices, agroforestry integration, and sustainable land management.",
  },
  {
    icon: Beef,
    title: "Livestock Production & Animal Health",
    description:
      "Advancing livestock productivity, pasture systems, animal health management, genetics improvement, and sustainable value chain development to enhance food security and rural livelihoods.",
  },
  {
    icon: Wheat,
    title: "Crop Systems, Seed Science & Biotechnology",
    description:
      "Strengthening crop protection, seed systems development, biotechnology applications, and sustainable crop productivity to improve agricultural performance and resilience.",
  },
  {
    icon: TrendingUp,
    title: "Agricultural Economics & Food Systems Innovation",
    description:
      "Driving agribusiness development, market systems transformation, policy analysis, and innovation-driven food system competitiveness across value chains.",
  },
  {
    icon: Package,
    title: "Post-Harvest Systems & Value Addition",
    description:
      "Improving storage, processing, preservation, cold-chain integration, and value addition systems to reduce losses and enhance agricultural profitability.",
  },
  {
    icon: UserCheck,
    title: "Gender, Extension & Inclusive Food Systems",
    description:
      "Promoting inclusive agricultural development through gender-responsive programming, farmer-centred extension services, communication innovation, and community-based capacity strengthening.",
  },
];

const metrics = [
  { value: 20, suffix: "+", label: "Scientific team members" },
  { value: 4, label: "Hectares of research farmland" },
  { value: 1550, label: "Broilers successfully produced" },
  { display: "Multiple", label: "Postgraduate programmes developed" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PageHero
          crumbs={[{ label: "About" }]}
          title="About the TETFund Centre of Excellence in *Food Security.*"
          lede="Advancing sustainable food systems through research, postgraduate education, and enterprise-driven innovation."
          image="/hero/compressed/4.jpg"
          imageAlt="TCoEFS team and visitors at the Centre's facilities"
        />

        {/* Who we are */}
        <Section>
          <SectionHeader
            eyebrow="Who we are"
            index="01"
            title="A Centre built for *impact.*"
          />
          <div className="prose-body mt-14 grid gap-x-12 gap-y-6 text-stone lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-5 lg:col-start-1">
              <P>
                The TETFund Centre of Excellence in Food Security (TCoEFS),
                University of Jos, is a multidisciplinary research and training
                institution established to strengthen sustainable food systems
                in Nigeria and across Africa.
              </P>
              <P delay={0.05}>
                The Centre operates under the mandate of the Tertiary Education
                Trust Fund (TETFund) to deliver measurable impact in research
                excellence, postgraduate education, institutional
                sustainability, and agricultural innovation.
              </P>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <P delay={0.1}>
                TCoEFS integrates climate-smart agriculture, livestock
                productivity, crop systems development, agribusiness
                innovation, post-harvest management, and inclusive food systems
                transformation to address evolving food security challenges
                across the continent.
              </P>
            </div>
          </div>

          <div className="mt-20 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <article className="grain relative flex h-full flex-col overflow-hidden rounded-lg bg-pine p-9 text-white sm:p-12">
                <Contours
                  seed={3}
                  className="absolute -right-1/3 -top-1/3 h-[170%] w-[90%] text-white/[0.07]"
                />
                <p className="eyebrow relative text-wheat">Our vision</p>
                <p className="display display-md relative mt-20 sm:mt-28">
                  To be a Centre of Excellence for training and applied
                  research that enhances household food security and improves
                  livelihoods in Nigeria and Africa.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.1}>
              <article className="flex h-full flex-col rounded-lg bg-mist p-9 sm:p-12">
                <p className="eyebrow text-wheat-deep">Our mission</p>
                <p className="display display-md mt-20 text-ink sm:mt-28">
                  To enhance access by all people to safe and nutritious food
                  needed to maintain a healthy and active life, ensuring they
                  are not at risk of losing such access.
                </p>
              </article>
            </Reveal>
          </div>
        </Section>

        {/* Mandate */}
        <Section tone="mist">
          <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <SectionHeader
                  eyebrow="Our mandate"
                  index="02"
                  title="What TCoEFS is *committed* to."
                  className="lg:!grid-cols-1"
                />
              </div>
            </div>
            <NumberedList
              items={mandates}
              className="border-b border-line lg:col-span-6 lg:col-start-7"
            />
          </div>
        </Section>

        {/* Focus areas */}
        <Section>
          <SectionHeader
            eyebrow="Focus areas"
            index="03"
            title="Our strategic *focus areas.*"
          />
          <IndexRows items={focusAreas} className="mt-12" />
        </Section>

        {/* Approach */}
        <Section tone="forest" className="grain overflow-hidden">
          <SplitFeature
            tone="dark"
            eyebrow="Our approach"
            index="04"
            title="How we *work.*"
            image="/ENTERPRISE_and_DEMONSTRATION/greenhouse-1-opt.webp"
            imageAlt="The Centre's greenhouse complex at the University of Jos"
            secondaryImage="/ENTERPRISE_and_DEMONSTRATION/farm-land-opt.webp"
            secondaryAlt="Research and demonstration farmland"
            aspect="aspect-[4/3] lg:aspect-[5/6]"
          >
            <P>
              TCoEFS bridges research, postgraduate education, enterprise
              initiatives, and field-level application. The Centre integrates
              laboratory research, greenhouse experimentation, demonstration
              farmland, and enterprise-based production systems to translate
              knowledge into measurable impact.
            </P>
            <P delay={0.05}>
              Through structured governance, scientific capacity strengthening,
              and performance-driven reforms, the Centre continues to
              reposition itself as a leading hub for food security innovation
              in Nigeria, advancing in alignment with TETFund expectations and
              Disbursement-Linked Indicators.
            </P>
          </SplitFeature>
        </Section>

        {/* Numbers */}
        <Section>
          <SectionHeader
            eyebrow="Performance & impact"
            index="05"
            title="Progress in *numbers.*"
          />
          <StatRow stats={metrics} className="mt-12" />
        </Section>
      </main>
      <Footer />
    </>
  );
}
