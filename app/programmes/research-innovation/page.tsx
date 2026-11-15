import type { Metadata } from "next";
import { Beef, Package, Sprout, TrendingUp, Users, Wheat } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/site/page-hero";
import {
  ButtonLink,
  CheckList,
  NumberedList,
  Section,
  SectionHeader,
} from "@/components/site/ui";
import { CtaPanel, FeatureGrid, P, SplitFeature } from "@/components/site/blocks";

export const metadata: Metadata = {
  title: "Research & Innovation",
  description:
    "Interdisciplinary research advancing resilient, inclusive, and enterprise-driven food systems.",
};

const researchAreas = [
  {
    icon: Sprout,
    title: "Climate-Smart Agriculture",
    description:
      "Research on adaptive production systems, water-efficient technologies, agroforestry integration, and climate-resilient cropping models.",
  },
  {
    icon: Beef,
    title: "Livestock Productivity & Resilience",
    description:
      "Studies on animal nutrition, low-cost feed formulation, greenhouse gas mitigation, livestock genetics, disease management, and sustainable value chains.",
  },
  {
    icon: Wheat,
    title: "Crop Protection & Seed Systems",
    description:
      "Research in crop protection, seed science, biotechnology applications, seed quality management, and sustainable crop productivity.",
  },
  {
    icon: TrendingUp,
    title: "Agricultural Economics & Food Systems Innovation",
    description:
      "Policy analysis, agribusiness models, value chain optimisation, extension systems, food systems transformation, and market integration strategies.",
  },
  {
    icon: Package,
    title: "Post-Harvest Systems & Value Addition",
    description:
      "Improving storage systems, processing technologies, loss reduction strategies, and commercialisation pathways.",
  },
  {
    icon: Users,
    title: "Gender, Extension & Inclusive Systems",
    description:
      "Promoting inclusive agricultural development, gender-responsive research, participatory extension approaches, and community-centred innovation.",
  },
];

const capacityItems = [
  "Appointment of over 20 Scientific Team members",
  "Engagement of a dedicated Agricultural Data Analyst",
  "Expansion of laboratory and greenhouse infrastructure",
  "Activation of structured documentation and reporting systems",
  "Strategic partnerships with national and international institutions",
];

const enterprisePoints = [
  "Practical validation of research outputs",
  "Revenue sustainability",
  "Applied training integration",
  "Scalable production demonstration",
];

export default function ResearchInnovationPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PageHero
          crumbs={[
            { label: "Programmes", href: "/programmes" },
            { label: "Research & Innovation" },
          ]}
          title="Research & *Innovation.*"
          lede="Interdisciplinary research advancing resilient, inclusive, and enterprise-driven food systems."
          image="/ENTERPRISE_and_DEMONSTRATION/greenhouse-inspection-opt.webp"
          imageAlt="Researchers inspecting seedlings inside the TCoEFS greenhouse"
        />

        <Section>
          <div className="prose-body grid gap-x-12 gap-y-6 text-stone lg:grid-cols-12">
            <div className="lg:col-span-6">
              <P className="font-display text-[clamp(1.4rem,2.2vw,1.9rem)] leading-snug tracking-[-0.015em] text-ink">
                The TETFund Centre of Excellence in Food Security conducts
                applied, interdisciplinary research focused on strengthening
                sustainable agricultural systems, climate resilience, livestock
                productivity, seed systems, agribusiness innovation, and
                inclusive food system transformation.
              </P>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:pt-2">
              <P delay={0.08}>
                Research activities are aligned with TETFund performance
                standards and national development priorities, integrating
                laboratory experimentation, greenhouse trials, field
                demonstrations, and enterprise-based production systems.
              </P>
            </div>
          </div>
        </Section>

        <Section tone="mist">
          <SectionHeader
            eyebrow="Thematic areas"
            index="01"
            title="Core research *areas.*"
          />
          <FeatureGrid items={researchAreas} className="mt-12" />
        </Section>

        <Section tone="forest" className="grain">
          <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <SectionHeader
                  tone="dark"
                  eyebrow="Research capacity"
                  index="02"
                  title="Strengthening delivery from the *inside out.*"
                  className="lg:!grid-cols-1"
                />
                <P className="prose-body mt-7 max-w-md text-white/70">
                  The Centre has invested in people, infrastructure, and
                  systems to ensure research outputs meet the highest standards
                  of rigour and institutional accountability.
                </P>
              </div>
            </div>
            <NumberedList
              tone="dark"
              items={capacityItems}
              className="border-b border-line-inverse lg:col-span-6 lg:col-start-7"
            />
          </div>
        </Section>

        <Section>
          <SplitFeature
            eyebrow="Enterprise integration"
            index="03"
            title="Research built to perform *beyond* the laboratory."
            image="/ENTERPRISE_and_DEMONSTRATION/poultry-2-opt.webp"
            imageAlt="Broiler production enterprise at TCoEFS"
            secondaryImage="/ENTERPRISE_and_DEMONSTRATION/greenhouse-1-opt.webp"
            secondaryAlt="Greenhouse complex"
            aspect="aspect-[4/3] lg:aspect-[5/6]"
          >
            <P>
              Research at TCoEFS is integrated with enterprise-based production
              models, strengthening the Centre's innovation ecosystem and
              enabling outcomes that reach farmers, markets, and policy.
            </P>
            <P>This integration enables:</P>
            <CheckList items={enterprisePoints} className="!mt-4 border-b border-line" />
          </SplitFeature>
        </Section>

        <Section tone="paper" className="!pt-0">
          <CtaPanel
            eyebrow="Collaboration"
            title="Collaborative research & partnerships."
            actions={
              <ButtonLink href="/partnerships" variant="wheat">
                Explore partnerships
              </ButtonLink>
            }
          >
            <p>
              TCoEFS collaborates with academic institutions, development
              agencies, private-sector partners, and government bodies to
              promote research integration, knowledge transfer, and policy
              impact.
            </p>
            <p className="mt-4">
              Key collaborative engagements include partnerships related to
              agroforestry systems, livestock productivity, curriculum
              development, and sustainable agricultural transformation.
            </p>
          </CtaPanel>
        </Section>
      </main>
      <Footer />
    </>
  );
}
