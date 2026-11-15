import type { Metadata } from "next";
import Image from "next/image";
import {
  Building2,
  CalendarCheck,
  CheckCircle2,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  Leaf,
  Microscope,
  ShieldCheck,
  Sprout,
  TrendingUp,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/site/page-hero";
import {
  ButtonLink,
  CheckList,
  Contours,
  Eyebrow,
  Section,
  SectionHeader,
  TextLink,
} from "@/components/site/ui";
import { FeatureGrid, P } from "@/components/site/blocks";
import { EnquiryForm } from "@/components/site/forms";
import { Reveal, SplitText, Stagger } from "@/components/site/motion";

export const metadata: Metadata = {
  title: "Partnerships and Strategic Engagement",
  description:
    "Collaborating to advance sustainable food systems, innovation, and measurable impact.",
};

const modelItems = [
  {
    icon: Microscope,
    text: "Research infrastructure: greenhouse, laboratory, and farmland",
  },
  { icon: GraduationCap, text: "Postgraduate programme development" },
  { icon: TrendingUp, text: "Enterprise-driven sustainability" },
  { icon: Sprout, text: "Farmer-focused training and extension" },
  { icon: HeartHandshake, text: "Policy-level engagement" },
  {
    icon: ShieldCheck,
    text: "Institutional accountability aligned with TETFund standards",
  },
];

const opportunityCards = [
  {
    icon: Microscope,
    title: "Research Collaboration",
    description:
      "Joint research projects, grant applications, field trials, laboratory partnerships, data sharing, and postgraduate supervision.",
  },
  {
    icon: TrendingUp,
    title: "Enterprise & Agribusiness Development",
    description:
      "Co-investment in poultry, greenhouse expansion, value addition, seed systems, livestock systems, and processing units.",
  },
  {
    icon: GraduationCap,
    title: "Curriculum & Capacity Development",
    description:
      "Joint curriculum design, technical training, innovation modules, and institutional strengthening for sustainable impact.",
  },
  {
    icon: Leaf,
    title: "Demonstration & Pilot Projects",
    description:
      "Climate-smart agriculture pilots, agroforestry systems, livestock genetics trials, and post-harvest systems.",
  },
  {
    icon: Building2,
    title: "Infrastructure Support",
    description:
      "Laboratory equipment, greenhouse expansion, fencing of farmland, research tools, and technology support.",
  },
  {
    icon: HandCoins,
    title: "Funding & Philanthropic Support",
    description:
      "Direct institutional support, enterprise scale-up, student scholarships, and infrastructure investment.",
  },
];

const partners = [
  {
    src: "/partners/color/tetfund.png",
    name: "Tertiary Education Trust Fund (TETFund)",
    tag: "Funding Partner",
    description:
      "The Tertiary Education Trust Fund is a federal government agency established to provide funding support for public tertiary institutions in Nigeria. Through strategic investments in infrastructure, research, academic development, and capacity building, TETFund strengthens institutional performance and promotes innovation across higher education.",
  },
  {
    src: "/partners/color/university-of-jos.png",
    name: "University of Jos",
    tag: "Host Institution",
    description:
      "The University of Jos is a leading public university in Nigeria committed to academic excellence, research advancement, and national development. With strong interdisciplinary capacity across science, technology, social sciences, and policy research, the institution serves as a hub for innovation, capacity development, and strategic partnerships.",
  },
  {
    src: "/partners/color/saa.png",
    name: "Sasakawa Africa Association (SAA)",
    tag: "Development Partner",
    description:
      "Sasakawa Africa Association is an international non-profit organization dedicated to strengthening agricultural systems across Africa. It promotes sustainable farming practices, capacity development for extension services, and nutrition-sensitive agricultural interventions aimed at improving productivity, food security, and rural livelihoods.",
  },
  {
    src: "/partners/color/giz.png",
    name: "GIZ",
    tag: "Development Partner",
    description:
      "GIZ (Deutsche Gesellschaft für Internationale Zusammenarbeit) works on behalf of the German government in Nigeria, supporting development projects in agriculture, rural development, and institutional capacity building.",
  },
  {
    src: "/partners/color/plsg.png",
    name: "Plateau State Government (PLSG)",
    tag: "Government Partner",
    description:
      "The Plateau State Government is the governing authority responsible for public administration, policy development, and socio-economic advancement within Plateau State, Nigeria. It drives initiatives in infrastructure, education, digital innovation, security, and economic growth, fostering an enabling environment for institutional excellence and strategic development partnerships.",
  },
  {
    src: "/partners/color/uslge.png",
    name: "U.S. Livestock Genetics Export, Inc. (USLGE)",
    tag: "SRDEP Partner",
    description:
      "U.S. Livestock Genetics Export, Inc. facilitates the global exchange of advanced livestock genetics and reproductive technologies. The organization supports genetic improvement, herd productivity, and sustainable livestock development through international collaboration and technical expertise.",
  },
  {
    src: "/partners/color/ecofarms-agro.png",
    name: "Ecofarms and Agroservices Ltd",
    tag: "Enterprise Partner",
    description:
      "Ecofarms and Agroservices Ltd is an agribusiness enterprise engaged in modern farming operations, agricultural services, and value chain development. The company supports sustainable production systems and contributes to strengthening agricultural productivity and rural economic growth.",
  },
  {
    src: "/partners/color/reproduction-specialty-group.png",
    name: "Reproduction Specialty Group, Inc. (RSG)",
    tag: "Biotechnology Partner",
    description:
      "Reproduction Specialty Group, Inc. specializes in advanced reproductive technologies and breeding services for livestock systems. The organization provides expertise in genetic improvement, reproductive management, and technical support to enhance productivity and performance.",
  },
  {
    src: "/partners/color/lpres.png",
    name: "Livestock Productivity & Resilience Support Project (L-PRES)",
    tag: "Development Partner",
    description:
      "The Livestock Productivity and Resilience Support Project is a development initiative focused on enhancing livestock value chains, strengthening resilience in pastoral and agro-pastoral systems, and improving productivity through technical support, infrastructure development, and stakeholder collaboration.",
  },
  {
    src: "/partners/color/dajrhas.png",
    name: "Dajrhas Health and Agric Development Ltd",
    tag: "Health & Agriculture",
    description:
      "Dajrhas Health and Agric Development Ltd operates at the intersection of agriculture and community development, delivering services that promote food production, health integration, and sustainable livelihood enhancement within rural and peri-urban communities.",
  },
  {
    src: "/partners/color/datacraft.png",
    name: "Data-craft Analytics Solutions Inc.",
    tag: "Technology Partner",
    description:
      "Data-craft Analytics Solutions Inc. is a technology and data analytics firm providing advanced analytical services, digital solutions, and decision-support systems. The company leverages data science and technological innovation to support institutional efficiency and strategic growth.",
  },
];

const priorityNeeds = [
  "Laboratory equipment upgrade",
  "Greenhouse enterprise expansion",
  "Farmland fencing and irrigation systems",
  "Livestock genetics and feed systems",
  "Processing and value-addition equipment",
  "Student research grants",
];

const supportAreas = [
  "Infrastructure expansion",
  "Research funding",
  "Enterprise development",
  "Training sponsorship",
  "Student scholarships",
];

const governance = [
  {
    icon: ShieldCheck,
    title: "University of Jos Governance Framework",
    description:
      "All operations, expenditure, and reporting align with University of Jos institutional governance standards.",
  },
  {
    icon: CalendarCheck,
    title: "TETFund Oversight & Reporting",
    description:
      "The Centre submits regular performance and financial reports to TETFund, ensuring accountability at the national level.",
  },
  {
    icon: CheckCircle2,
    title: "Structured Documentation",
    description:
      "Concept notes, proposals, and progress reports are maintained for all partnership agreements and funded activities.",
  },
];

export default function PartnershipsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          crumbs={[{ label: "Partnerships" }]}
          title="Partnerships and *Strategic Engagement.*"
          lede="Collaborating to advance sustainable food systems, innovation, and measurable impact."
          image="/hero/compressed/6.jpg"
          imageAlt="TCoEFS strategic partnerships and high-level engagement"
        >
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#partnership-form" variant="wheat">
              Start a partnership
            </ButtonLink>
            <ButtonLink href="#funding-form" variant="outline-light">
              Support an initiative
            </ButtonLink>
          </div>
        </PageHero>

        {/* Why partner */}
        <Section>
          <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHeader
                eyebrow="Why partner with TCoEFS"
                index="01"
                title="A structured platform for *lasting* impact."
                className="lg:!grid-cols-1"
              />
              <P className="prose-body mt-8 max-w-xl text-stone">
                The TETFund Centre of Excellence in Food Security provides a
                structured platform for research collaboration, enterprise
                development, capacity building, and policy engagement. Our
                integrated model is designed for partnerships that are not
                transactional: they are institutional, measurable, and built
                for the long term.
              </P>
              <Reveal delay={0.1} className="mt-9">
                <ButtonLink href="/contact" variant="ink">
                  Begin a conversation
                </ButtonLink>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal y={12}>
                <p className="eyebrow mb-2 text-stone">
                  Our integrated model combines
                </p>
              </Reveal>
              <ul className="border-b border-line">
                {modelItems.map(({ icon: Icon, text }, i) => (
                  <Reveal as="li" key={text} delay={i * 0.05} y={14}>
                    <div className="flex items-center gap-5 border-t border-line py-4">
                      <Icon strokeWidth={1.3} className="size-5 shrink-0 text-pine" />
                      <span className="text-[0.9875rem] leading-snug text-ink">
                        {text}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Opportunities */}
        <Section tone="mist">
          <SectionHeader
            eyebrow="Partnership opportunities"
            index="02"
            title="How we *collaborate.*"
            lede="TCoEFS offers six structured partnership modalities, each designed to create mutual value and measurable development outcomes."
          />
          <FeatureGrid items={opportunityCards} className="mt-16" />
        </Section>

        {/* Partners */}
        <Section>
          <SectionHeader
            eyebrow="Current and past collaborations"
            index="03"
            title="Partners in food systems *transformation.*"
          />
          <Stagger
            gap={0.05}
            className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            itemClassName="h-full"
          >
            {partners.map((partner) => (
              <article
                key={partner.name}
                className="group flex h-full flex-col rounded-[3px] bg-white p-7 ring-1 ring-ink/10 transition-shadow duration-700 hover:shadow-[0_30px_60px_-30px_rgb(8_23_15_/_0.35)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="relative h-14 w-40">
                    <Image
                      src={partner.src}
                      alt={`${partner.name} logo`}
                      fill
                      sizes="160px"
                      className="object-contain object-left"
                    />
                  </div>
                  <span className="eyebrow shrink-0 rounded-full bg-mist px-3 py-1.5 text-pine">
                    {partner.tag}
                  </span>
                </div>
                <h3 className="display display-sm mt-9 text-ink">
                  {partner.name}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-stone">
                  {partner.description}
                </p>
              </article>
            ))}
          </Stagger>
        </Section>

        {/* Investment */}
        <Section tone="forest" className="grain overflow-hidden">
          <Contours
            seed={11}
            className="absolute -right-[35%] -top-[30%] h-[160%] w-[90%] text-white/[0.05]"
          />
          <div className="relative grid gap-x-12 gap-y-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHeader
                tone="dark"
                eyebrow="Investment & support opportunities"
                index="04"
                title="Where your investment *lands.*"
                className="lg:!grid-cols-1"
              />
              <P className="prose-body mt-8 max-w-xl text-white/70">
                TCoEFS has identified critical infrastructure and programme
                gaps that, when addressed by development partners and
                investors, will unlock the Centre's full operational and
                research capacity.
              </P>
              <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
                <ButtonLink
                  href="/TCoEFS_Quarterly_Newsletter.pdf"
                  variant="wheat"
                  download
                >
                  Download concept note
                </ButtonLink>
                <ButtonLink href="#funding-form" variant="outline-light">
                  Request detailed proposal
                </ButtonLink>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="eyebrow mb-2 text-sage">Current priority needs</p>
              <CheckList
                tone="dark"
                items={priorityNeeds}
                className="border-b border-line-inverse"
              />
            </div>
          </div>

          <Reveal className="relative mt-20 grid gap-x-12 gap-y-6 border-t border-line-inverse pt-12 lg:grid-cols-12">
            <h3 className="display display-md text-white lg:col-span-4">
              Structured for accountability
            </h3>
            <div className="prose-body space-y-4 text-white/70 lg:col-span-5">
              <p>
                Every investment in TCoEFS is supported by a documented concept
                note, a detailed proposal with cost structures, and performance
                milestones tied to institutional reporting frameworks.
              </p>
              <p>
                Proposals are available for individual priority areas, from
                pack machine infrastructure to greenhouse enterprise expansion.
                Request a proposal to receive a bespoke investment case.
              </p>
            </div>
            <div className="lg:col-span-3 lg:text-right">
              <p className="eyebrow mb-3 text-sage">Partnerships desk</p>
              <a
                href="mailto:partnerships@tcoefs-unijos.org"
                className="group break-all font-display text-[1.25rem] text-white"
              >
                <span className="link-draw pb-0.5">
                  partnerships@tcoefs-unijos.org
                </span>
              </a>
            </div>
          </Reveal>
        </Section>

        {/* Support */}
        <Section>
          <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHeader
                eyebrow="Support the Centre"
                index="05"
                title="Invest in food systems *transformation.*"
                className="lg:!grid-cols-1"
              />
              <P className="prose-body mt-8 max-w-xl text-stone">
                TCoEFS welcomes institutional support from development
                partners, corporate organisations, alumni, and philanthropic
                donors committed to sustainable food systems transformation.
              </P>
              <Reveal delay={0.1} className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                <ButtonLink href="#funding-form" variant="ink">
                  Donate now
                </ButtonLink>
                <TextLink href="#funding-form" className="text-pine">
                  Request funding framework
                </TextLink>
                <TextLink href="#partnership-form" className="text-pine">
                  Partner with us
                </TextLink>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="eyebrow mb-2 text-stone">
                Support may be directed toward
              </p>
              <CheckList items={supportAreas} className="border-b border-line" />
            </div>
          </div>

          <Reveal className="mt-20">
            <figure className="rounded-[3px] bg-mist p-9 sm:p-14">
              <blockquote className="display display-md max-w-4xl text-ink">
                &ldquo;Every contribution, whether in equipment, expertise, or
                funding, directly strengthens a Centre that serves farmers,
                students, and food systems at scale.&rdquo;
              </blockquote>
              <figcaption className="prose-body mt-8 max-w-2xl border-t border-line pt-6 text-stone">
                TCoEFS provides formal receipts, institutional acknowledgement,
                and progress reporting for all support received, in line with
                University of Jos governance standards and TETFund
                accountability frameworks.
              </figcaption>
            </figure>
          </Reveal>
        </Section>

        {/* Forms */}
        <Section tone="mist">
          <SectionHeader
            eyebrow="Get in touch"
            index="06"
            title="Start the *conversation.*"
            lede="Whether you are exploring a research partnership or considering a funding commitment, the right form is below."
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div
                id="partnership-form"
                className="h-full scroll-mt-28 rounded-[3px] bg-paper p-8 ring-1 ring-ink/10 sm:p-12"
              >
                <Eyebrow className="mb-5">Form A</Eyebrow>
                <h3 className="display display-md text-ink">
                  Partnership enquiry
                </h3>
                <p className="mb-10 mt-2 text-[0.9375rem] text-stone">
                  Research, enterprise, curriculum, and more
                </p>
                <EnquiryForm
                  id="pe"
                  submitLabel="Submit enquiry"
                  successTitle="Enquiry received"
                  successBody="Thank you for your interest in partnering with TCoEFS. A member of our team will be in touch within five working days."
                  fields={[
                    {
                      name: "orgName",
                      label: "Organisation name",
                      required: true,
                      placeholder: "Enter your organisation name",
                    },
                    {
                      name: "contactPerson",
                      label: "Contact person",
                      required: true,
                      placeholder: "Full name",
                      half: true,
                    },
                    {
                      name: "email",
                      label: "Email address",
                      type: "email",
                      required: true,
                      placeholder: "you@organisation.com",
                      half: true,
                    },
                    {
                      name: "interestType",
                      label: "Partnership interest type",
                      type: "select",
                      required: true,
                      placeholder: "Select an area of interest",
                      options: [
                        { value: "research", label: "Research Collaboration" },
                        {
                          value: "enterprise",
                          label: "Enterprise & Agribusiness Development",
                        },
                        {
                          value: "curriculum",
                          label: "Curriculum & Capacity Development",
                        },
                        {
                          value: "demonstration",
                          label: "Demonstration & Pilot Projects",
                        },
                        {
                          value: "infrastructure",
                          label: "Infrastructure Support",
                        },
                        {
                          value: "funding",
                          label: "Funding & Philanthropic Support",
                        },
                      ],
                    },
                    {
                      name: "message",
                      label: "Message",
                      type: "textarea",
                      required: true,
                      placeholder:
                        "Tell us about your organisation and how you'd like to partner with TCoEFS…",
                    },
                  ]}
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div
                id="funding-form"
                className="h-full scroll-mt-28 rounded-[3px] bg-paper p-8 ring-1 ring-ink/10 sm:p-12"
              >
                <Eyebrow className="mb-5">Form B</Eyebrow>
                <h3 className="display display-md text-ink">
                  Funding & support
                </h3>
                <p className="mb-10 mt-2 text-[0.9375rem] text-stone">
                  Infrastructure, research grants, scholarships
                </p>
                <EnquiryForm
                  id="fs"
                  submitLabel="Submit support request"
                  successTitle="Support request received"
                  successBody="Thank you for your commitment to TCoEFS. Our partnerships team will respond with a full funding framework within five working days."
                  fields={[
                    {
                      name: "supportType",
                      label: "Type of support",
                      type: "select",
                      required: true,
                      placeholder: "Select type of support",
                      half: true,
                      options: [
                        { value: "infrastructure", label: "Infrastructure" },
                        { value: "research", label: "Research Funding" },
                        { value: "enterprise", label: "Enterprise Development" },
                        { value: "training", label: "Training Sponsorship" },
                        { value: "scholarships", label: "Student Scholarships" },
                      ],
                    },
                    {
                      name: "preferredArea",
                      label: "Preferred area of support",
                      type: "select",
                      required: true,
                      placeholder: "Select an area",
                      half: true,
                      options: [
                        { value: "lab", label: "Laboratory Equipment" },
                        { value: "greenhouse", label: "Greenhouse Expansion" },
                        {
                          value: "farmland",
                          label: "Farmland Fencing & Irrigation",
                        },
                        {
                          value: "livestock",
                          label: "Livestock Genetics & Feed",
                        },
                        {
                          value: "processing",
                          label: "Processing & Value Addition",
                        },
                        { value: "grants", label: "Student Research Grants" },
                      ],
                    },
                    {
                      name: "amount",
                      label: "Indicative amount",
                      placeholder: "e.g. ₦5,000,000 or USD 10,000",
                    },
                    {
                      name: "contactName",
                      label: "Contact name",
                      required: true,
                      placeholder: "Full name",
                      half: true,
                    },
                    {
                      name: "contactPhone",
                      label: "Phone",
                      type: "tel",
                      placeholder: "+234 000 000 0000",
                      half: true,
                    },
                    {
                      name: "contactEmail",
                      label: "Email address",
                      type: "email",
                      required: true,
                      placeholder: "you@organisation.com",
                    },
                  ]}
                />
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Governance */}
        <Section>
          <SectionHeader
            eyebrow="Governance & accountability"
            index="07"
            title="Built on institutional *trust.*"
          />
          <div className="prose-body mt-12 grid gap-x-12 gap-y-6 text-stone lg:grid-cols-12">
            <P className="lg:col-span-5">
              TCoEFS operates within the University of Jos governance framework
              and under TETFund oversight. The Centre maintains structured
              documentation, reporting systems, and performance tracking
              aligned with institutional and national standards.
            </P>
            <P delay={0.08} className="lg:col-span-5 lg:col-start-8">
              This ensures transparency, accountability, and measurable impact,
              giving every partner and funder the confidence that their
              investment is managed with rigour and purpose.
            </P>
          </div>
          <FeatureGrid items={governance} className="mt-16" />
        </Section>

        {/* Closing */}
        <Section tone="pine" className="grain overflow-hidden">
          <Contours
            seed={5}
            className="absolute -left-[30%] -top-[40%] h-[180%] w-[90%] text-white/[0.06]"
          />
          <div className="relative">
            <SplitText
              as="h2"
              text="Collaborate. Invest. Partner. *Transform food systems.*"
              className="display display-xl block max-w-[16ch] text-white"
            />
            <P className="lede mt-8 max-w-xl text-white/75">
              The work of building resilient food systems is too important to
              do alone. TCoEFS is ready to formalise a partnership with you.
            </P>
            <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="#partnership-form" variant="wheat">
                Start a partnership
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline-light">
                Schedule a meeting
              </ButtonLink>
              <ButtonLink href="#funding-form" variant="outline-light">
                Support an initiative
              </ButtonLink>
            </Reveal>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
