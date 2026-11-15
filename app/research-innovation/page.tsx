import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/site/page-hero";
import { ButtonLink, Section, SectionHeader } from "@/components/site/ui";
import { CtaPanel, FeatureGrid, IndexRows } from "@/components/site/blocks";

export const metadata: Metadata = {
  title: "Turning Science into Solutions",
  description:
    "Applied Research for Development at TCoEFS: research philosophy, core themes and flagship projects.",
};

const philosophy = [
  {
    title: "Evidence to Action",
    description:
      "Research is valuable only when it leads to adoption and impact.",
  },
  {
    title: "End-User Engagement",
    description:
      "Farmers, processors, and policymakers are co-creators, not just beneficiaries.",
  },
  {
    title: "Interdisciplinary Collaboration",
    description:
      "Food security is a multi-sector challenge requiring diverse expertise.",
  },
  {
    title: "Sustainability Focus",
    description:
      "Innovations must protect natural resources while increasing productivity.",
  },
];

const themes = [
  {
    title: "Climate-Smart Agriculture",
    description:
      "Developing and promoting farming practices that adapt to climate variability while restoring soil health, conserving water, and reducing greenhouse gas emissions.",
    meta: "Example: Regenerative potato agroforestry models that double farmer incomes and restore degraded land.",
  },
  {
    title: "Post-Harvest Technology & Value Addition",
    description:
      "Reducing Nigeria's high post-harvest losses through innovations in storage, preservation, and processing.",
    meta: "Example: Bundled value-addition packages for Irish potato, maize, and tomato farmers.",
  },
  {
    title: "Nutrition & Food Safety",
    description:
      "Ensuring that food security also means dietary diversity and safety.",
    meta: "Example: Nutrition-sensitive agriculture models for rural communities, integrating crop diversification and food hygiene practices.",
  },
  {
    title: "Digital Agriculture & Precision Farming",
    description:
      "Harnessing data analytics, remote sensing, and mobile tools to optimize farm decision-making.",
    meta: "Example: Digital farmer advisory systems for climate, market, and pest alerts.",
  },
  {
    title: "Agribusiness Innovation & Policy Impact",
    description:
      "Linking research outputs to viable business models and policies that enable scale-up.",
    meta: "Example: Farmer Field Business Schools (FFBS) and cooperative market-linkage models.",
  },
];

const projects = [
  {
    title: "Livestock Genetics for 2050",
    description:
      "In partnership with Kansas State University and US Livestock Genetic Export, advancing beef and dairy breeding for higher efficiency, resilience, and lower emissions.",
  },
  {
    title: "Potato Multi-Actor Platform (MAP)",
    description:
      "Collaborative approach bringing together farmers, processors, policymakers, and researchers to strengthen Plateau State's potato value chain.",
  },
  {
    title: "SIFTAS Project (with SAA & GIZ)",
    description:
      "Strengthening institutional frameworks for transformative agricultural systems in Nigeria.",
  },
];

export default function ResearchInnovationPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          crumbs={[{ label: "Research" }]}
          title="Turning science into *solutions.*"
          lede="At the TETFund Centre of Excellence in Food Security (TCoEFS), research is more than an academic pursuit: it is a tool for transformation. We conduct Applied Research for Development (R4D) that addresses the urgent realities of Nigeria's food system, ensuring that innovations are practical, scalable, and sustainable."
          image="/news/news3_images_optimized/img14.webp"
          imageAlt="TCoEFS researchers in discussion during a field visit"
        />

        <Section>
          <SectionHeader
            eyebrow="How we think"
            index="01"
            title="Our research *philosophy.*"
          />
          <FeatureGrid items={philosophy} columns={4} className="mt-16" />
        </Section>

        <Section tone="mist">
          <SectionHeader
            eyebrow="What we study"
            index="02"
            title="Core research *themes.*"
          />
          <IndexRows items={themes} className="mt-16" />
        </Section>

        <Section tone="forest" className="grain">
          <SectionHeader
            tone="dark"
            eyebrow="In progress"
            index="03"
            title="Flagship *projects.*"
          />
          <IndexRows tone="dark" items={projects} className="mt-16" />
        </Section>

        <Section>
          <CtaPanel
            tone="mist"
            eyebrow="Go deeper"
            title="Explore the Centre's research programme."
            actions={
              <ButtonLink href="/programmes/research-innovation" variant="ink">
                Research & Innovation
              </ButtonLink>
            }
          />
        </Section>
      </main>
      <Footer />
    </>
  );
}
