import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/site/page-hero";
import { CheckList, Section, SectionHeader } from "@/components/site/ui";
import { P } from "@/components/site/blocks";
import { Reveal } from "@/components/site/motion";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "Academic excellence, applied research, and capacity development for sustainable food systems transformation.",
};

const pathways = [
  {
    overline: "Academic programmes",
    title: "Postgraduate Programmes",
    description:
      "Advanced academic programmes (PGD, MSc, PhD, and MBA) developed across four thematic areas to build high-level expertise in food systems, climate resilience, livestock systems, crop science, agribusiness, and inclusive agriculture.",
    cta: "Explore postgraduate programmes",
    href: "/programmes/postgraduate",
    image: "/spotlight-images/spotlight-card1/img2.png",
    alt: "Laboratory benches inside the Centre's research facility",
  },
  {
    overline: "Applied research",
    title: "Research & Innovation",
    description:
      "Interdisciplinary research initiatives addressing climate-smart agriculture, livestock productivity, agroforestry systems, seed science, post-harvest management, and food systems innovation.",
    cta: "Explore research areas",
    href: "/programmes/research-innovation",
    image: "/ENTERPRISE_and_DEMONSTRATION/greenhouse-inspection-opt.webp",
    alt: "Researchers inspecting seedlings inside the greenhouse",
  },
  {
    overline: "Community impact",
    title: "Training & Extension",
    description:
      "Farmer-focused training, short courses, extension clinics, and capacity-building workshops designed to translate research into measurable community impact.",
    cta: "View training & extension",
    href: "/programmes/training-extension",
    image: "/agricultural-training-workshop.jpg",
    alt: "Participants on a field training visit among crops",
  },
];

const standards = [
  "Aligned with TETFund Centres of Excellence expectations",
  "Approved by the University of Jos Postgraduate Board (where applicable)",
  "Designed to strengthen enterprise integration and institutional sustainability",
  "Structured to deliver measurable research and training outputs",
];

export default function ProgrammesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          crumbs={[{ label: "Programmes" }]}
          title="Programmes."
          lede="Academic excellence, applied research, and capacity development for sustainable food systems transformation."
          image="/news/news3_images_optimized/img13.webp"
          imageAlt="A TCoEFS field visit to farmland on the Jos Plateau"
        />

        <Section>
          <SectionHeader
            eyebrow="Overview"
            index="01"
            title="Integrated for *impact.*"
          />
          <div className="prose-body mt-12 grid gap-x-12 gap-y-6 text-stone lg:grid-cols-12">
            <P className="lg:col-span-5">
              The TETFund Centre of Excellence in Food Security delivers
              integrated academic, research, and training programmes aligned
              with national priorities and global best practices in sustainable
              agriculture.
            </P>
            <div className="lg:col-span-5 lg:col-start-8">
              <P delay={0.08}>
                Our programmes are structured to strengthen postgraduate
                education, advance interdisciplinary research, and translate
                knowledge into practical agricultural impact.
              </P>
            </div>
          </div>
        </Section>

        <Section tone="mist">
          <SectionHeader
            eyebrow="Programme pathways"
            index="02"
            title="Three pathways, one *mission.*"
          />
          <ol className="mt-12 border-b border-ink/20">
            {pathways.map((pathway, i) => (
              <Reveal as="li" key={pathway.title} delay={i * 0.08}>
                <Link
                  href={pathway.href}
                  className="group grid gap-x-10 gap-y-6 border-t border-ink/20 py-10 lg:grid-cols-12 lg:items-center lg:py-12"
                >
                  <span className="eyebrow text-wheat-deep lg:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="lg:col-span-4">
                    <p className="eyebrow mb-4 text-stone">{pathway.overline}</p>
                    <h3 className="display display-lg text-ink transition-transform duration-300 ease-expo">
                      {pathway.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-4">
                    <p className="text-[0.9875rem] leading-relaxed text-stone">
                      {pathway.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-pine">
                      <span className="link-draw pb-0.5">{pathway.cta}</span>
                      <ArrowUpRight className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                  <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-forest lg:col-span-3">
                    <Image
                      src={pathway.image}
                      alt={pathway.alt}
                      fill
                      sizes="(min-width: 1024px) 22vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-expo group-hover:scale-[1.03]"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </ol>
        </Section>

        <Section tone="forest" className="grain">
          <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHeader
                tone="dark"
                eyebrow="Standards & alignment"
                index="03"
                title="Designed to *deliver.*"
                className="lg:!grid-cols-1"
              />
              <div className="prose-body mt-8 max-w-xl space-y-5 text-white/70">
                <P>
                  Our programmes are developed and delivered in accordance with
                  the highest academic and institutional standards, ensuring
                  quality, accountability, and measurable outcomes at every
                  level of engagement.
                </P>
                <P delay={0.05}>
                  Every programme pathway, from postgraduate research to
                  community-facing extension, is held to a consistent framework
                  that aligns with national policy, institutional governance,
                  and the Centre&apos;s disbursement-linked performance
                  indicators.
                </P>
              </div>
            </div>
            <CheckList
              tone="dark"
              items={standards}
              className="self-end border-b border-line-inverse lg:col-span-5 lg:col-start-8"
            />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
