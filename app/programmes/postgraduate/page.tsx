import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/site/page-hero";
import { ButtonLink, Section, SectionHeader } from "@/components/site/ui";
import { CtaPanel, P, Statement } from "@/components/site/blocks";
import {
  ClusterAccordion,
  type Cluster,
} from "@/components/site/cluster-accordion";

export const metadata: Metadata = {
  title: "Postgraduate Programmes",
  description:
    "Postgraduate programmes in food security and sustainable agriculture: PGD, MSc, PhD and MBA pathways across four thematic clusters.",
};

const clusters: Cluster[] = [
  {
    id: "cluster-1",
    number: "01",
    name: "Environment, Disaster Risk Management and Gender",
    focus:
      "Addressing climate change, disaster resilience, and inclusive agricultural development.",
    programmes: [
      {
        title: "Climate Change & Sustainable Food Security",
        degrees: ["PGD", "MSc", "PhD"],
      },
      {
        title: "Disaster Risk Management in Agriculture & Food Security",
        degrees: ["PGD", "MSc", "PhD"],
      },
      {
        title: "Gender, Agriculture & Rural Development",
        degrees: ["PGD", "MSc", "PhD"],
      },
    ],
  },
  {
    id: "cluster-2",
    number: "02",
    name: "Agricultural Economics, Extension, Innovation and Communication",
    focus:
      "Strengthening agribusiness systems, market innovation, policy analysis, and agricultural communication.",
    programmes: [
      {
        title: "Agricultural Economics & Food Systems Innovation",
        degrees: ["MSc", "PhD"],
      },
      { title: "MBA: Agribusiness", degrees: ["MBA"] },
      {
        title: "Agricultural Communication Innovations",
        degrees: ["PGD", "MSc", "PhD"],
      },
    ],
  },
  {
    id: "cluster-3",
    number: "03",
    name: "Livestock Production and Animal Health",
    focus:
      "Advancing livestock productivity, climate resilience, and animal health systems.",
    programmes: [
      {
        title: "Livestock Science & Climate Resilience",
        degrees: ["PGD", "MSc", "PhD"],
      },
      {
        title: "Livestock Production & Animal Health",
        degrees: ["PGD", "MSc", "PhD"],
      },
    ],
  },
  {
    id: "cluster-4",
    number: "04",
    name: "Crop and Biotechnology",
    focus:
      "Enhancing crop protection, seed systems, and biotechnology-driven agricultural productivity.",
    programmes: [
      { title: "Crop Protection", degrees: ["PGD", "MSc", "PhD"] },
      { title: "Seed Science & Technology", degrees: ["PGD", "MSc", "PhD"] },
    ],
  },
];

export default function PostgraduateProgrammesPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PageHero
          crumbs={[
            { label: "Programmes", href: "/programmes" },
            { label: "Postgraduate" },
          ]}
          title="Postgraduate Programmes in Food Security and *Sustainable Agriculture.*"
          lede="Advanced academic pathways aligned with climate resilience, agricultural innovation, and food systems transformation."
          image="/ENTERPRISE_and_DEMONSTRATION/tissue-lab-opt.webp"
          imageAlt="Laboratory facility at TCoEFS"
          meta={["PGD", "MSc", "PhD", "MBA"]}
        />

        <Section>
          <SectionHeader
            eyebrow="Overview"
            index="01"
            title="A comprehensive academic *framework.*"
          />
          <div className="prose-body mt-12 grid gap-x-12 gap-y-6 text-stone lg:grid-cols-12">
            <P className="lg:col-span-5">
              The TETFund Centre of Excellence in Food Security has developed a
              comprehensive suite of postgraduate programmes aligned with
              national priorities and TETFund thematic expectations.
            </P>
            <div className="lg:col-span-5 lg:col-start-8">
              <P delay={0.08}>
                These programmes have been approved by the University of Jos
                Postgraduate Board and submitted for final institutional
                processes. They are structured to strengthen interdisciplinary
                expertise, research capacity, and enterprise-oriented
                agricultural transformation.
              </P>
            </div>
          </div>
        </Section>

        <Section tone="mist">
          <SectionHeader
            eyebrow="Programme structure"
            index="02"
            title="Four thematic *clusters.*"
            lede="Programmes are organised across four interdisciplinary clusters, each aligned to a strategic thematic area within the TCoEFS mandate."
          />
          <div className="mt-12">
            <ClusterAccordion clusters={clusters} />
          </div>
        </Section>

        <Section tone="forest" className="grain">
          <div className="mx-auto max-w-5xl">
            <Statement tone="dark" className="!text-[clamp(1.75rem,3.4vw,3rem)]">
              Interdisciplinary research integration, enterprise alignment, and climate-smart innovation form the foundation of all postgraduate programmes at TCoEFS.
            </Statement>
          </div>
        </Section>

        <Section>
          <CtaPanel
            tone="mist"
            eyebrow="Admissions"
            title="Considering postgraduate study with the Centre?"
            actions={
              <ButtonLink href="/contact" variant="ink">
                Contact the Centre
              </ButtonLink>
            }
          >
            <p>
              Prospective applicants are encouraged to contact the Centre for
              updates on programme rollout timelines, admission procedures, and
              detailed curriculum information.
            </p>
          </CtaPanel>
        </Section>
      </main>
      <Footer />
    </>
  );
}
