import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/site/page-hero";
import { Eyebrow, Section, SectionHeader, TextLink } from "@/components/site/ui";
import { EnquiryForm } from "@/components/site/forms";
import { Reveal, SplitText } from "@/components/site/motion";
import { site, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "For enquiries, partnerships, research collaboration, training, and institutional engagement with TCoEFS, University of Jos.",
};

const contactDetails = [
  {
    label: "Email",
    lines: [site.email],
    href: `mailto:${site.email}`,
    hrefLabel: "Write to us",
  },
  {
    label: "Phone",
    lines: [site.phone],
    href: site.phoneHref,
    hrefLabel: "Call the Centre",
  },
  {
    label: "Website",
    lines: ["www.tcoefs-unijos.org"],
    href: "https://www.tcoefs-unijos.org",
    hrefLabel: "Visit",
  },
  {
    label: "Location",
    lines: [
      "TETFund Centre of Excellence in Food Security (TCoEFS)",
      "University of Jos, Naraguta Campus",
      "Plateau State, Nigeria",
    ],
    href: site.mapUrl,
    hrefLabel: "View on map",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PageHero
          crumbs={[{ label: "Contact" }]}
          title="Contact *us.*"
          lede="For enquiries, partnerships, research collaboration, training, and institutional engagement."
        />

        {/* Details */}
        <section className="border-b border-line bg-white">
          <ul className="shell grid sm:grid-cols-2 lg:grid-cols-4">
            {contactDetails.map(({ label, lines, href, hrefLabel }, i) => (
              <Reveal as="li" key={label} delay={i * 0.07} y={14}>
                <div
                  className={`flex h-full flex-col border-line py-9 lg:py-12 ${
                    i > 0 ? "border-t sm:border-t-0 lg:border-l lg:pl-8" : ""
                  } ${i >= 2 ? "sm:border-t lg:border-t-0" : ""} ${
                    i % 2 === 1 ? "sm:border-l sm:pl-8" : ""
                  } sm:pr-6`}
                >
                  <p className="eyebrow text-wheat-deep">{label}</p>
                  <div className="mt-6 flex-1">
                    {lines.map((line, j) => (
                      <p
                        key={line}
                        className={
                          j === 0 && lines.length === 1
                            ? "break-words text-[1.125rem] font-semibold leading-snug text-ink"
                            : j === 0
                              ? "font-display text-[1.15rem] leading-snug tracking-[-0.01em] text-ink"
                              : "mt-1 text-[0.9375rem] text-stone"
                        }
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                  <TextLink
                    href={href}
                    icon={href.startsWith("http") ? "up-right" : "right"}
                    className="mt-7 text-pine"
                  >
                    {hrefLabel}
                  </TextLink>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Form */}
        <Section id="contact-form">
          <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Reveal y={12}>
                  <Eyebrow index="01" className="mb-6">
                    Send a message
                  </Eyebrow>
                </Reveal>
                <SplitText
                  as="h2"
                  text="We are *listening.*"
                  className="display display-xl block text-ink"
                />
                <Reveal delay={0.1}>
                  <p className="prose-body mt-8 max-w-md text-stone">
                    Whether you are a researcher, a prospective student, a
                    development partner, or a member of the press, complete the
                    form and the right team member will respond.
                  </p>
                  <div className="mt-10 space-y-2">
                    <a
                      href={`mailto:${site.email}`}
                      className="group block font-display text-[1.5rem] tracking-[-0.01em] text-ink"
                    >
                      <span className="link-draw pb-0.5">{site.email}</span>
                    </a>
                    <a
                      href={site.phoneHref}
                      className="group block font-display text-[1.5rem] tracking-[-0.01em] text-ink"
                    >
                      <span className="link-draw pb-0.5">{site.phone}</span>
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
              <div className="rounded-lg bg-white p-8 ring-1 ring-ink/10 sm:p-12">
                <EnquiryForm
                  id="contact"
                  submitLabel="Send message"
                  successTitle="Message received"
                  successBody="Thank you. Your message has been received. A member of our team will respond promptly."
                  footnote="We respond within one working day"
                  fields={[
                    {
                      name: "fullName",
                      label: "Full name",
                      required: true,
                      placeholder: "Enter your full name",
                      half: true,
                    },
                    {
                      name: "email",
                      label: "Email address",
                      type: "email",
                      required: true,
                      placeholder: "you@example.com",
                      half: true,
                    },
                    {
                      name: "phone",
                      label: "Phone number",
                      type: "tel",
                      placeholder: "+234 000 000 0000",
                      half: true,
                    },
                    {
                      name: "subject",
                      label: "Subject",
                      type: "select",
                      required: true,
                      placeholder: "Select a subject",
                      half: true,
                      options: [
                        { value: "general", label: "General Enquiry" },
                        {
                          value: "partnership",
                          label: "Partnership & Collaboration",
                        },
                        { value: "research", label: "Research Engagement" },
                        { value: "training", label: "Training & Short Courses" },
                        { value: "enterprise", label: "Enterprise & Investment" },
                        { value: "media", label: "Media & Communications" },
                      ],
                    },
                    {
                      name: "message",
                      label: "Message",
                      type: "textarea",
                      required: true,
                      rows: 5,
                      placeholder: "Tell us how we can help…",
                    },
                  ]}
                />
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Social */}
        <Section tone="mist">
          <SectionHeader
            eyebrow="Connect with us"
            index="02"
            title="Follow our *work.*"
            lede="Stay informed on research updates, training announcements, and institutional news across our official channels."
          />
          <ul className="mt-12 border-b border-ink/20">
            {socials.map((s, i) => (
              <Reveal as="li" key={s.label} delay={i * 0.06} y={14}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-6 border-t border-ink/20 py-7 lg:grid-cols-12 lg:gap-x-10"
                >
                  <span className="eyebrow text-wheat-deep lg:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display display-lg text-ink transition-transform duration-300 ease-expo lg:col-span-5">
                    {s.label}
                  </span>
                  <span className="col-span-2 col-start-2 row-start-2 mt-1 text-[0.9375rem] text-stone lg:col-span-5 lg:col-start-auto lg:row-start-auto lg:mt-0">
                    {s.handle}
                  </span>
                  <span className="col-start-3 row-start-1 grid size-12 place-items-center justify-self-end rounded-full border border-ink/25 transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper lg:col-span-1 lg:col-start-auto lg:row-start-auto">
                    <ArrowUpRight className="size-[1.125rem]" />
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* Map */}
        <Section>
          <SectionHeader
            eyebrow="Location"
            index="03"
            title="Find *us.*"
            lede="University of Jos, Naraguta Campus, Plateau State, Nigeria."
          />
          <Reveal className="mt-14">
            <div className="overflow-hidden rounded-lg ring-1 ring-ink/10">
              <iframe
                src="https://maps.google.com/maps?q=9.964017,8.880296&z=16&output=embed&hl=en"
                className="block h-[26rem] w-full border-0 grayscale-[35%] sm:h-[32rem]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TCoEFS location: University of Jos Naraguta Campus"
              />
            </div>
            <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <p className="max-w-xl text-[0.9375rem] text-stone">
                TETFund Centre of Excellence in Food Security (TCoEFS),
                University of Jos, Naraguta Campus, Plateau State, Nigeria
                <span className="eyebrow ml-3 text-ink/40">
                  {site.coordinates}
                </span>
              </p>
              <TextLink href={site.mapUrl} icon="up-right" className="text-pine">
                Open in Google Maps
              </TextLink>
            </div>
          </Reveal>
        </Section>
      </main>
      <Footer />
    </>
  );
}
