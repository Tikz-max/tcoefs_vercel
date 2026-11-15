import { IndexRows } from "@/components/site/blocks";
import { ButtonLink, SectionHeader } from "@/components/site/ui";

const areas = [
  {
    title: "Climate-Smart Agriculture",
    description:
      "Promoting resilient agricultural production systems that respond to climate variability through adaptive technologies, water-efficient practices, agroforestry integration, and sustainable land management.",
  },
  {
    title: "Livestock Production & Animal Health",
    description:
      "Advancing livestock productivity, pasture systems, animal health management, genetics improvement, and sustainable value chain development to enhance food security and rural livelihoods.",
  },
  {
    title: "Crop Systems, Seed Science & Biotechnology",
    description:
      "Strengthening crop protection, seed systems development, biotechnology applications, and sustainable crop productivity to improve agricultural performance and resilience.",
  },
  {
    title: "Agricultural Economics & Food Systems Innovation",
    description:
      "Driving agribusiness development, market systems transformation, policy analysis, and innovation-driven food system competitiveness across value chains.",
  },
  {
    title: "Post-Harvest Systems & Value Addition",
    description:
      "Improving storage, processing, preservation, cold-chain integration, and value addition systems to reduce losses and enhance agricultural profitability.",
  },
  {
    title: "Gender, Extension & Inclusive Food Systems",
    description:
      "Promoting inclusive agricultural development through gender-responsive programming, farmer-centred extension services, communication innovation, and community-based capacity strengthening.",
  },
];

export default function Research() {
  return (
    <section className="bg-paper py-24 sm:py-32 lg:py-40">
      <div className="shell">
        <SectionHeader
          eyebrow="Research focus"
          index="04"
          title="Six areas where the Centre *concentrates* its science."
          aside={
            <div className="mt-2">
              <ButtonLink href="/programmes/research-innovation" variant="ink">
                View all research
              </ButtonLink>
            </div>
          }
        />

        <IndexRows items={areas} className="mt-16 lg:mt-20" />
      </div>
    </section>
  );
}
