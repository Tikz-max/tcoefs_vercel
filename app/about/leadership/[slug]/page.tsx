import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  getLeadershipProfile,
  leadershipProfiles,
  type TeamProfile,
} from "@/lib/data/leadership";

type ProfilePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return leadershipProfiles.map((profile) => ({ slug: profile.slug }));
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getLeadershipProfile(slug);

  if (!profile) {
    return { title: "Leadership Profile | TCoEFS" };
  }

  return {
    title: `${profile.name} | Leadership and Scientific Team | TCoEFS`,
    description: `${profile.name} - ${profile.role}, ${profile.specialization}.`,
  };
}

function ProfileImage({ profile }: { profile: TeamProfile }) {
  if (profile.image) {
    return (
      <div className="relative h-full w-full">
        <Image
          src={profile.image}
          alt={profile.name}
          fill
          className="object-cover"
          style={{ objectPosition: profile.imagePosition ?? "center top" }}
          priority
        />
      </div>
    );
  }

  const initials = profile.name
    .replace(/^(Prof\.|Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(244,197,66,0.26),transparent_32%),linear-gradient(135deg,rgba(45,90,45,0.12),rgba(90,124,101,0.22))]">
      <span className="text-5xl font-bold tracking-tight text-[#2f3e2f]/55">
        {initials}
      </span>
    </div>
  );
}

function ContentSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-[#2d5a2d]/12 py-8 first:border-t-0 first:pt-0">
      <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#2f3e2f]">
        {title}
      </h2>
      <div className="mt-4 text-base leading-8 text-[#4a5b4a]">{children}</div>
    </section>
  );
}

function PendingContent() {
  return (
    <p className="rounded-2xl bg-[#eef3ed] p-5 text-[#4a5b4a]">
      Profile information is being compiled and will be added once approved.
    </p>
  );
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params;
  const profile = getLeadershipProfile(slug);

  if (!profile) notFound();

  return (
    <div className="min-h-screen bg-[#fbfcf8] text-[#2f3e2f]">
      <Navbar />
      <main>
        <section className="px-4 pb-16 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/about/leadership"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#2d5a2d]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Leadership
            </Link>

            <div className="grid gap-8 rounded-[2rem] bg-white p-5 shadow-[0_24px_80px_rgba(47,62,47,0.1)] ring-1 ring-[#2d5a2d]/10 md:grid-cols-[0.75fr_1.25fr] md:p-8">
              <div className="min-h-[380px] overflow-hidden rounded-[1.5rem] bg-[#eef3ed]">
                <ProfileImage profile={profile} />
              </div>
              <div className="flex flex-col justify-center py-4">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-[#2d5a2d]">
                  {profile.group}
                </p>
                <h1 className="text-4xl font-bold leading-tight tracking-[-0.03em] text-[#2f3e2f] md:text-6xl">
                  {profile.name}
                </h1>
                <p className="mt-5 text-xl font-semibold text-[#2d5a2d]">
                  {profile.role}
                </p>
                <p className="mt-3 max-w-2xl text-base leading-7 text-[#4a5b4a]">
                  {profile.specialization}
                </p>
                {profile.institution && (
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[#4a5b4a]/80">
                    {profile.institution}
                  </p>
                )}
                <div className="mt-8 rounded-2xl bg-[#fbfcf8] p-5 ring-1 ring-[#2d5a2d]/10">
                  <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#2d5a2d]/75">
                    Contact
                  </p>
                  <div className="mt-3 space-y-2.5">
                    {profile.email && (
                      <a
                        href={`mailto:${profile.email}`}
                        className="flex items-center gap-2.5 text-sm text-[#4a5b4a] hover:text-[#2d5a2d]"
                      >
                        <Mail className="h-4 w-4 shrink-0 text-[#2d5a2d]/70" />
                        {profile.email}
                      </a>
                    )}
                    {profile.phone && (
                      <a
                        href={`tel:${profile.phone}`}
                        className="flex items-center gap-2.5 text-sm text-[#4a5b4a] hover:text-[#2d5a2d]"
                      >
                        <Phone className="h-4 w-4 shrink-0 text-[#2d5a2d]/70" />
                        {profile.phone}
                      </a>
                    )}
                    {!profile.email && !profile.phone && (
                      <p className="text-sm text-[#4a5b4a]">
                        Contact details will be shown once approved for publication.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[260px_1fr]">
            <aside className="h-fit rounded-2xl bg-[#244f2b] p-6 text-white lg:sticky lg:top-28">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#f4c542]">
                Profile Sections
              </p>
              <div className="mt-5 space-y-3 text-sm text-white/76">
                <p>Professional Summary</p>
                <p>Qualifications</p>
                <p>Research Interests</p>
                <p>Role at TCoEFS</p>
              </div>
            </aside>

            <div className="rounded-2xl bg-white p-6 shadow-[0_18px_60px_rgba(47,62,47,0.08)] ring-1 ring-[#2d5a2d]/10 md:p-8">
              <ContentSection title="Professional Summary">
                {profile.profileSummary?.length ? (
                  <div className="space-y-5">
                    {profile.profileSummary.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <PendingContent />
                )}
              </ContentSection>

              <ContentSection title="Qualifications">
                {profile.qualifications?.length ? (
                  <ul className="list-disc space-y-2 pl-5">
                    {profile.qualifications.map((qualification) => (
                      <li key={qualification}>{qualification}</li>
                    ))}
                  </ul>
                ) : (
                  <PendingContent />
                )}
              </ContentSection>

              <ContentSection title="Research Interests">
                {profile.researchInterests?.length ? (
                  <ul className="list-disc space-y-2 pl-5">
                    {profile.researchInterests.map((interest) => (
                      <li key={interest}>{interest}</li>
                    ))}
                  </ul>
                ) : (
                  <PendingContent />
                )}
              </ContentSection>

              <ContentSection title="Role at TCoEFS">
                {profile.roleAtCentre ? <p>{profile.roleAtCentre}</p> : <PendingContent />}
              </ContentSection>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
