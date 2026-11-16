import type { Metadata } from "next";
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
import { CtaPanel, P, SplitFeature } from "@/components/site/blocks";
import { Reveal } from "@/components/site/motion";

export const metadata: Metadata = {
  title: "Training & Extension",
  description:
    "Translating research into practical skills, enterprise development, and community impact.",
};

const shortCourses = [
  "Wholesome Animal Products Processing (Meat, Egg, Milk)",
  "Agribusiness Development and Enterprise Management",
  "Climate-Smart Agricultural Practices",
  "Livestock Production and Feed Optimization",
  "Seed Systems and Crop Protection",
  "Food Processing and Value Addition",
];

const workshopPoints = [
  "Measurable performance outputs",
  "Enterprise sustainability",
  "Postgraduate programme readiness",
  "Infrastructure utilization",
  "Documentation and visibility",
];

const communityItems = [
  "Farmer-centered training and extension clinics",
  "Youth-focused agripreneurship initiatives",
  "Women-inclusive agricultural development",
  "Community demonstration projects",
  "Institutional and stakeholder engagement",
];

export default function TrainingExtensionPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PageHero
          crumbs={[
            { label: "Programmes", href: "/programmes" },
            { label: "Training & Extension" },
          ]}
          title="Training & *Extension.*"
          lede="Translating research into practical skills, enterprise development, and community impact."
          image="/agricultural-training-workshop.jpg"
          imageAlt="Training workshop at TCoEFS"
        />

        <Section>
          <SectionHeader eyebrow="Overview" index="01" title="From research to *field-level* impact." />
          <div className="prose-body mt-12 grid gap-x-12 gap-y-6 text-stone lg:grid-cols-12">
            <P className="lg:col-span-5">
              The TETFund Centre of Excellence in Food Security delivers
              structured training programmes, farmer-focused extension clinics,
              and capacity-building workshops designed to translate research
              into measurable field-level impact.
            </P>
            <div className="lg:col-span-5 lg:col-start-8">
              <P delay={0.08}>
                Our training initiatives bridge academic knowledge and
                practical application, strengthening productivity, enterprise
                development, and sustainable agricultural practices across
                value chains.
              </P>
            </div>
          </div>
        </Section>

        {/* Current training */}
        <Section tone="mist">
          <SectionHeader
            eyebrow="Current & recent training"
            index="02"
            title="Training *initiatives.*"
          />
          <Reveal className="mt-12">
            <article className="grid overflow-hidden rounded-lg bg-paper ring-1 ring-ink/10 lg:grid-cols-12">
              <div className="flex flex-col justify-between gap-12 bg-wheat p-9 text-ink sm:p-12 lg:col-span-4">
                <p className="eyebrow">Short course</p>
                <p className="display text-[clamp(2.5rem,4.4vw,3.75rem)] leading-[0.98]">
                  16 Feb
                  <span className="block italic opacity-70">to 1 Mar</span>
                  2026
                </p>
              </div>
              <div className="p-9 sm:p-12 lg:col-span-8">
                <h3 className="display display-lg text-ink">
                  Post-Harvest Management of Fresh Produce
                </h3>
                <div className="prose-body mt-7 max-w-2xl space-y-5 text-stone">
                  <p>
                    A structured short course focused on reducing post-harvest
                    losses, improving produce handling, value addition,
                    packaging systems, and market readiness.
                  </p>
                  <p>
                    Participants engaged in both theoretical sessions and
                    hands-on practical demonstrations designed to enhance
                    product quality and shelf-life management.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        </Section>

        {/* Short courses */}
        <Section>
          <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <SectionHeader
                  eyebrow="Short courses"
                  index="03"
                  title="Specialised training *areas.*"
                  className="lg:!grid-cols-1"
                />
                <P className="prose-body mt-7 max-w-md text-stone">
                  The Centre offers and continues to develop specialised
                  training in the following areas:
                </P>
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <NumberedList items={shortCourses} className="border-b border-line" />
              <P className="mt-8 text-[1.125rem] leading-relaxed text-ink">
                Each programme is designed to integrate theory, demonstration,
                and enterprise application.
              </P>
            </div>
          </div>
        </Section>

        {/* Workshop */}
        <Section tone="forest" className="grain overflow-hidden">
          <SplitFeature
            tone="dark"
            reverse
            eyebrow="Capacity-building workshop"
            index="04"
            title="Four days of institutional *realignment* and delivery."
            image="/news/news1_images_optimized/img3.webp"
            imageAlt="Participants at the TCoEFS capacity-building workshop, September 2025"
            aspect="aspect-[4/3] lg:aspect-[5/6]"
            badge={{ value: "Sept 2025", label: "Four-day workshop" }}
          >
            <P>
              In September 2025, the Centre convened a four-day
              capacity-building workshop to strengthen institutional alignment,
              enterprise activation, and research integration. This initiative
              marked a strategic step in enhancing institutional delivery.
            </P>
            <P>The workshop emphasised:</P>
            <CheckList
              tone="dark"
              items={workshopPoints}
              className="!mt-4 border-b border-line-inverse"
            />
          </SplitFeature>
        </Section>

        {/* Community */}
        <Section>
          <SplitFeature
            eyebrow="Community engagement"
            index="05"
            title="Extension & community *impact.*"
            image="/news/news3_images_optimized/img13.webp"
            imageAlt="Farmers and the TCoEFS team on a field visit"
            secondaryImage="/news/news3_images_optimized/img14.webp"
            secondaryAlt="Field discussion with extension participants"
            aspect="aspect-[4/3] lg:aspect-[5/6]"
          >
            <CheckList items={communityItems} className="border-b border-line" />
            <P className="text-[1.125rem] leading-relaxed text-ink">
              The Centre integrates participatory approaches to ensure farmers
              are co-creators and beneficiaries of innovation.
            </P>
          </SplitFeature>
        </Section>

        <Section className="!pt-0">
          <CtaPanel
            eyebrow="Upcoming opportunities"
            title="Looking for the next course or workshop?"
            actions={
              <>
                <ButtonLink href="/contact" variant="wheat">
                  Enquire about training
                </ButtonLink>
                <ButtonLink href="/news/newsletters-events" variant="outline-light">
                  Upcoming events
                </ButtonLink>
              </>
            }
          >
            <p>
              Visitors are encouraged to check regularly for updates on
              upcoming short courses, specialised workshops, and farmer
              training sessions.
            </p>
          </CtaPanel>
        </Section>
      </main>
      <Footer />
    </>
  );
}
