import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/site/page-hero";
import { Portrait } from "@/components/site/profile";
import { Eyebrow, Section, SectionHeader, TextLink } from "@/components/site/ui";
import { Reveal, SplitText, Stagger } from "@/components/site/motion";
import {
  deputies,
  director,
  scientificTeam,
  supportTeam,
  type TeamProfile,
} from "@/lib/data/leadership";

export const metadata: Metadata = {
  title: "Leadership and Scientific Team",
  description:
    "Meet the leadership, scientific team, and administrative support team driving research excellence, innovation, and institutional transformation at TCoEFS.",
};

function TeamCard({ profile }: { profile: TeamProfile }) {
  return (
    <Link
      href={`/about/leadership/${profile.slug}`}
      className="group block h-full"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-mist">
        <div className="absolute inset-0 transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.05]">
          <Portrait profile={profile} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <span className="absolute bottom-4 right-4 grid size-11 translate-y-3 place-items-center rounded-full bg-wheat text-ink opacity-0 transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-[1.125rem]" />
        </span>
      </div>
      <h3 className="mt-5 font-display text-[1.3rem] leading-tight tracking-[-0.01em] text-ink">
        <span className="link-draw pb-0.5">{profile.name}</span>
      </h3>
      <p className="mt-2 text-[0.875rem] leading-snug text-stone">
        {profile.specialization}
      </p>
    </Link>
  );
}

export default function LeadershipPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          crumbs={[{ label: "About", href: "/about" }, { label: "Leadership" }]}
          title="Leadership and *Scientific Team.*"
          lede="A multidisciplinary team driving research excellence, innovation, and institutional transformation."
        />

        {/* Director */}
        <Section>
          <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-mist lg:sticky lg:top-28">
                <Portrait
                  profile={director}
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </Reveal>
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal y={12}>
                <Eyebrow index="01" className="mb-6">
                  Director
                </Eyebrow>
              </Reveal>
              <SplitText
                as="h2"
                text={director.name}
                className="display display-xl block text-ink"
              />
              <Reveal delay={0.1}>
                <p className="mt-6 text-[1.0625rem] font-medium text-pine">
                  {director.role}
                </p>
                <p className="mt-1 text-[0.9375rem] text-stone">
                  {director.institution}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <h3 className="eyebrow mt-12 border-t border-line pt-6 text-wheat-deep">
                  Executive profile
                </h3>
                <div className="prose-body mt-5 space-y-5 text-stone">
                  <p>{director.featuredSummary}</p>
                  <p>
                    His leadership approach emphasises accountability,
                    measurable impact, interdisciplinary collaboration, and
                    long-term institutional sustainability.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* Deputies */}
        <Section tone="mist">
          <SectionHeader
            eyebrow="Deputies"
            index="02"
            title="Director & *Deputies.*"
          />
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {deputies.map((profile, i) => (
              <Reveal key={profile.slug} delay={i * 0.1}>
                <article className="group grid h-full gap-7 rounded-[3px] bg-paper p-5 sm:grid-cols-5 sm:p-6">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-mist sm:col-span-2">
                    <Portrait profile={profile} sizes="(min-width: 640px) 20vw, 100vw" />
                  </div>
                  <div className="flex flex-col sm:col-span-3 sm:py-2">
                    <p className="eyebrow text-wheat-deep">{profile.role}</p>
                    <h3 className="display display-md mt-4 text-ink">
                      {profile.name}
                    </h3>
                    {profile.featuredSummary && (
                      <p className="mt-4 text-[0.9375rem] leading-relaxed text-stone">
                        {profile.featuredSummary}
                      </p>
                    )}
                    <TextLink
                      href={`/about/leadership/${profile.slug}`}
                      className="mt-auto pt-8 text-pine"
                    >
                      View profile
                    </TextLink>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Scientific team */}
        <Section>
          <SectionHeader
            eyebrow="Scientific team"
            index="03"
            title="Multidisciplinary research *capacity.*"
            lede="The Centre is supported by a multidisciplinary Scientific Team drawn from diverse academic fields including agricultural economics, animal production, crop science, veterinary medicine, plant biotechnology, geography, sociology, and communication. Over twenty Scientific Team members were appointed to strengthen research delivery and postgraduate supervision across the Centre's thematic focus areas."
          />
          <Stagger
            gap={0.05}
            className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8"
          >
            {scientificTeam.map((profile) => (
              <TeamCard key={profile.slug} profile={profile} />
            ))}
          </Stagger>
        </Section>

        {/* Support team */}
        <Section tone="mist">
          <SectionHeader
            eyebrow="Administrative & support"
            index="04"
            title="Administrative & *Support Team.*"
          />
          <Stagger
            gap={0.05}
            className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8"
          >
            {supportTeam.map((profile) => (
              <TeamCard key={profile.slug} profile={profile} />
            ))}
          </Stagger>
        </Section>
      </main>
      <Footer />
    </>
  );
}
