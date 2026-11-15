import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Mail, Phone } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Portrait } from "@/components/site/profile";
import { Contours } from "@/components/site/ui";
import { Reveal } from "@/components/site/motion";
import {
  getLeadershipProfile,
  leadershipProfiles,
} from "@/lib/data/leadership";

type ProfilePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return leadershipProfiles.map((profile) => ({ slug: profile.slug }));
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getLeadershipProfile(slug);
  if (!profile) return { title: "Leadership Profile" };
  return {
    title: `${profile.name} | Leadership and Scientific Team`,
    description: `${profile.name} - ${profile.role}, ${profile.specialization}.`,
  };
}

function ContentSection({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal as="section">
      <div id={id} className="scroll-mt-28 border-t border-line py-10">
        <h2 className="eyebrow flex items-center gap-4 text-wheat-deep">
          <span>{index}</span>
          <span className="text-pine">{title}</span>
        </h2>
        <div className="mt-7">{children}</div>
      </div>
    </Reveal>
  );
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params;
  const profile = getLeadershipProfile(slug);
  if (!profile) notFound();

  const sections = [
    profile.profileSummary?.length
      ? { id: "summary", title: "Professional summary" }
      : null,
    profile.qualifications?.length
      ? { id: "qualifications", title: "Qualifications" }
      : null,
    profile.researchInterests?.length
      ? { id: "interests", title: "Research interests" }
      : null,
  ].filter(Boolean) as { id: string; title: string }[];

  const hasContact = profile.email || profile.phone || profile.googleScholar;

  return (
    <>
      <Navbar />
      <main>
        <section className="grain relative overflow-hidden bg-forest text-white">
          <Contours
            seed={profile.name.length}
            className="absolute -left-[25%] top-[-20%] h-[150%] w-[95%] text-white/[0.06]"
          />
          <div className="shell relative grid gap-x-12 gap-y-10 pb-16 pt-32 sm:pt-40 lg:grid-cols-12 lg:items-end lg:pb-24">
            <div className="lg:col-span-7">
              <Link
                href="/about/leadership"
                className="eyebrow group inline-flex items-center gap-3 text-sage transition-colors hover:text-white"
              >
                <ArrowLeft className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-x-1" />
                Back to leadership
              </Link>
              <p className="eyebrow mt-12 text-wheat">{profile.group}</p>
              <h1 className="display display-xl mt-5">{profile.name}</h1>
              <p className="mt-6 text-[1.125rem] font-medium text-white">
                {profile.roleAtCentre ?? profile.role}
              </p>
              <p className="mt-1.5 max-w-xl text-[1rem] text-white/65">
                {profile.specialization}
              </p>
              {profile.institution && (
                <p className="mt-1.5 max-w-xl text-[0.9375rem] text-white/50">
                  {profile.institution}
                </p>
              )}
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-pine">
                <Portrait
                  profile={profile}
                  priority
                  sizes="(min-width: 1024px) 32vw, 100vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-paper py-16 sm:py-24">
          <div className="shell grid gap-x-12 gap-y-12 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <div className="space-y-10 lg:sticky lg:top-28">
                <div>
                  <p className="eyebrow mb-5 text-stone">Contact</p>
                  {hasContact ? (
                    <ul className="space-y-3 text-[0.9375rem]">
                      {profile.email && (
                        <li>
                          <a
                            href={`mailto:${profile.email}`}
                            className="group inline-flex items-center gap-3 break-all text-ink"
                          >
                            <Mail className="size-4 shrink-0 text-pine" />
                            <span className="link-draw pb-0.5">
                              {profile.email}
                            </span>
                          </a>
                        </li>
                      )}
                      {profile.phone && (
                        <li>
                          <a
                            href={`tel:${profile.phone}`}
                            className="group inline-flex items-center gap-3 text-ink"
                          >
                            <Phone className="size-4 shrink-0 text-pine" />
                            <span className="link-draw pb-0.5">
                              {profile.phone}
                            </span>
                          </a>
                        </li>
                      )}
                      {profile.googleScholar && (
                        <li>
                          <a
                            href={profile.googleScholar}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-3 text-ink"
                          >
                            <ArrowUpRight className="size-4 shrink-0 text-pine" />
                            <span className="link-draw pb-0.5">
                              Google Scholar profile
                            </span>
                          </a>
                        </li>
                      )}
                    </ul>
                  ) : (
                    <p className="text-[0.9375rem] leading-relaxed text-stone">
                      Contact details will be shown once approved for
                      publication.
                    </p>
                  )}
                </div>

                {sections.length > 0 && (
                  <nav aria-label="Profile sections" className="hidden lg:block">
                    <p className="eyebrow mb-5 text-stone">Profile sections</p>
                    <ul className="space-y-2.5 text-[0.9375rem]">
                      {sections.map((s) => (
                        <li key={s.id}>
                          <a href={`#${s.id}`} className="group text-ink">
                            <span className="link-draw pb-0.5">{s.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </div>
            </aside>

            <div className="lg:col-span-7 lg:col-start-6">
              {profile.profileSummary?.length ? (
                <ContentSection
                  id="summary"
                  index="01"
                  title="Professional summary"
                >
                  <div className="space-y-5">
                    {profile.profileSummary.map((paragraph, i) => (
                      <p
                        key={paragraph}
                        className={
                          i === 0
                            ? "font-display text-[1.4rem] leading-snug tracking-[-0.01em] text-ink"
                            : "prose-body text-stone"
                        }
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </ContentSection>
              ) : null}

              {profile.qualifications?.length ? (
                <ContentSection
                  id="qualifications"
                  index="02"
                  title="Qualifications"
                >
                  <ul>
                    {profile.qualifications.map((qualification) => (
                      <li
                        key={qualification}
                        className="border-b border-line py-3.5 font-display text-[1.2rem] tracking-[-0.01em] text-ink first:pt-0 last:border-b-0"
                      >
                        {qualification}
                      </li>
                    ))}
                  </ul>
                </ContentSection>
              ) : null}

              {profile.researchInterests?.length ? (
                <ContentSection
                  id="interests"
                  index="03"
                  title="Research interests"
                >
                  <ul className="flex flex-wrap gap-2">
                    {profile.researchInterests.map((interest) => (
                      <li
                        key={interest}
                        className="rounded-full border border-ink/20 px-4 py-2 text-[0.9rem] text-ink"
                      >
                        {interest}
                      </li>
                    ))}
                  </ul>
                </ContentSection>
              ) : null}

              {sections.length === 0 && (
                <p className="prose-body border-t border-line pt-10 text-stone">
                  A full profile will be published here shortly.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
