import type { Metadata } from "next";
import {
  BarChart3,
  Building,
  CloudSun,
  HeartHandshake,
  Hand,
  MonitorSmartphone,
  Package,
  Recycle,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/site/page-hero";
import { ButtonLink, Section, SectionHeader } from "@/components/site/ui";
import { CtaPanel, FeatureGrid, P } from "@/components/site/blocks";
import { Reveal } from "@/components/site/motion";

export const metadata: Metadata = {
  title: "Training & Capacity Building",
  description:
    "Empowering people and transforming food systems through practical, evidence-based and inclusive training.",
};

const philosophy = [
  {
    icon: Hand,
    title: "Practical & Hands-On",
    description: "Learn by doing with real case studies and field visits",
  },
  {
    icon: ShieldCheck,
    title: "Evidence-Based",
    description: "Curriculum grounded in latest research and best practices",
  },
  {
    icon: HeartHandshake,
    title: "Inclusive & Accessible",
    description: "Opportunities for women, youth, and underserved communities",
  },
  {
    icon: Recycle,
    title: "Sustainability-Focused",
    description: "Skills that foster long-term resilience and growth",
  },
];

const areas = [
  {
    icon: BarChart3,
    title: "Agricultural Research & Data Skills",
    target: "Scientists, postgraduate students, extension agents",
    focus:
      "Research design, statistical analysis, data management, scientific communication",
  },
  {
    icon: CloudSun,
    title: "Climate-Smart Agriculture",
    target: "Farmers, extension workers, development agencies",
    focus:
      "Drought-resistant varieties, soil health, regenerative practices, water-efficient irrigation",
  },
  {
    icon: Package,
    title: "Post-Harvest Management & Value Addition",
    target: "Agribusinesses and producer groups",
    focus: "Reducing losses, food processing, packaging, quality assurance",
  },
  {
    icon: MonitorSmartphone,
    title: "Digital Agriculture & Precision Farming",
    target: "Agri-tech innovators and progressive farmers",
    focus:
      "Farm mapping, sensor-based monitoring, remote advisory systems, market apps",
  },
  {
    icon: TrendingUp,
    title: "Agribusiness Management & Entrepreneurship",
    target: "Emerging agri-entrepreneurs and cooperatives",
    focus:
      "Business planning, access to finance, branding, investment readiness",
  },
  {
    icon: Building,
    title: "Policy & Leadership Development",
    target:
      "Government officials, civil society leaders, development practitioners",
    focus:
      "Evidence-based policy design, program management, stakeholder engagement",
  },
];

const models = [
  {
    title: "Workshops & Seminars",
    description: "Short, intensive courses on targeted skills",
    duration: "1-3 days",
  },
  {
    title: "Certificate Courses",
    description: "Multi-week programs with professional certification",
    duration: "2-8 weeks",
  },
  {
    title: "Fellowships & Internships",
    description: "Long-term professional development opportunities",
    duration: "3-12 months",
  },
  {
    title: "Farmer Field Schools",
    description: "Learning directly on demonstration plots",
    duration: "Season-long",
  },
  {
    title: "E-Learning Platforms",
    description: "Flexible access for remote participants",
    duration: "Self-paced",
  },
];

export default function TrainingCapacityBuildingPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PageHero
          crumbs={[{ label: "Training" }]}
          title="Training & *Capacity Building.*"
          lede="Empowering people, transforming food systems."
          image="/news/news1_images_optimized/img5.webp"
          imageAlt="Participants during a TCoEFS capacity-building session"
        />

        <Section>
          <div className="prose-body grid gap-x-12 gap-y-6 text-stone lg:grid-cols-12">
            <P className="font-display text-[clamp(1.4rem,2.2vw,1.9rem)] leading-snug tracking-[-0.015em] text-ink lg:col-span-6">
              At TCoEFS, we believe that solving Nigeria's food security
              challenge is not just about technology or infrastructure: it is
              about people. We invest heavily in human capital development,
              equipping farmers, researchers, policymakers, and entrepreneurs
              with the skills and networks to lead agricultural transformation.
            </P>
            <P delay={0.08} className="lg:col-span-5 lg:col-start-8 lg:pt-2">
              Our training programs bridge the gap between theory and practice,
              ensuring participants leave with practical, market-ready
              capabilities that create real-world impact.
            </P>
          </div>
          <FeatureGrid items={philosophy} columns={4} className="mt-20" />
        </Section>

        <Section tone="mist">
          <SectionHeader
            eyebrow="What we teach"
            index="01"
            title="Key capacity-building *areas.*"
            lede="Comprehensive training programs designed to address every aspect of the agricultural value chain."
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {areas.map((area, i) => {
              const Icon = area.icon;
              return (
                <Reveal as="li" key={area.title} delay={(i % 3) * 0.07}>
                  <article className="flex h-full flex-col rounded-lg bg-paper p-8 ring-1 ring-ink/10">
                    <Icon strokeWidth={1.2} className="size-7 text-pine" />
                    <h3 className="display display-sm mt-10 text-ink">
                      {area.title}
                    </h3>
                    <dl className="mt-6 space-y-4 border-t border-line pt-6 text-[0.9375rem] leading-relaxed">
                      <div>
                        <dt className="eyebrow mb-1.5 text-wheat-deep">For</dt>
                        <dd className="text-ink">{area.target}</dd>
                      </div>
                      <div>
                        <dt className="eyebrow mb-1.5 text-wheat-deep">Focus</dt>
                        <dd className="text-stone">{area.focus}</dd>
                      </div>
                    </dl>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </Section>

        <Section tone="forest" className="grain">
          <SectionHeader
            tone="dark"
            eyebrow="How we teach"
            index="02"
            title="Our training *models.*"
            lede="Flexible learning approaches designed to meet diverse needs and schedules."
          />
          <ol className="mt-12 border-b border-line-inverse">
            {models.map((model, i) => (
              <Reveal as="li" key={model.title} delay={i * 0.05} y={16}>
                <div className="group grid gap-x-10 gap-y-2 border-t border-line-inverse py-8 lg:grid-cols-12 lg:items-center">
                  <span className="eyebrow text-wheat lg:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display display-md text-white transition-transform duration-300 ease-expo lg:col-span-5">
                    {model.title}
                  </h3>
                  <p className="text-[0.9875rem] text-white/65 lg:col-span-4">
                    {model.description}
                  </p>
                  <p className="eyebrow text-sage lg:col-span-2 lg:text-right">
                    {model.duration}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Section>

        <Section>
          <CtaPanel
            eyebrow="Get started"
            title="Ready to transform your skills?"
            actions={
              <ButtonLink href="/contact" variant="wheat">
                Contact the training team
              </ButtonLink>
            }
          >
            <p>
              Build the skills needed to lead agricultural transformation in
              Nigeria and beyond through the Centre's training programmes.
            </p>
          </CtaPanel>
        </Section>
      </main>
      <Footer />
    </>
  );
}
