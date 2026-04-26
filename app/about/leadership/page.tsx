import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, UsersRound } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  deputies,
  director,
  scientificTeam,
  supportTeam,
  type TeamProfile,
} from "@/lib/data/leadership";

export const metadata: Metadata = {
  title:
    "Leadership and Scientific Team | TETFUND Centre of Excellence in Food Security - University of Jos",
  description:
    "Meet the leadership, scientific team, and administrative support team driving research excellence, innovation, and institutional transformation at TCoEFS.",
};

function ProfileImage({ profile, large = false }: { profile: TeamProfile; large?: boolean }) {
  if (profile.image) {
    return (
      <div className="relative h-full w-full">
        <Image
          src={profile.image}
          alt={profile.name}
          fill
          className="object-cover"
          style={{ objectPosition: profile.imagePosition ?? "center top" }}
          priority={large}
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
      <span className="text-3xl font-bold tracking-tight text-[#2f3e2f]/55">
        {initials}
      </span>
    </div>
  );
}

function TeamCard({ profile }: { profile: TeamProfile }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_50px_rgba(47,62,47,0.08)] ring-1 ring-[#2d5a2d]/10 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(47,62,47,0.13)]">
      <div className="aspect-[4/3] overflow-hidden bg-[#eef3ed]">
        <ProfileImage profile={profile} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#2d5a2d]/70">
          {profile.group}
        </p>
        <h3 className="text-lg font-semibold leading-snug tracking-[-0.01em] text-[#2f3e2f]">
          {profile.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#4a5b4a]">
          {profile.specialization}
        </p>
        <div className="mt-auto pt-5">
          <Link
            href={`/about/leadership/${profile.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2d5a2d] transition group-hover:gap-3"
          >
            View Profile
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function LeadershipPage() {
  return (
    <div className="min-h-screen bg-[#fbfcf8] text-[#2f3e2f]">
      <Navbar />
      <main>
        <section className="relative overflow-hidden px-4 pb-20 pt-24 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(244,197,66,0.18),transparent_30%),linear-gradient(180deg,rgba(45,90,45,0.09),rgba(251,252,248,0))]" />
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="mb-5 inline-flex rounded-full bg-[#2d5a2d]/10 px-4 py-2 text-sm font-semibold text-[#2d5a2d]">
                About / Leadership
              </p>
              <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-[#2f3e2f] md:text-6xl lg:text-7xl">
                Leadership and Scientific Team
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4a5b4a] md:text-xl">
                A multidisciplinary team driving research excellence, innovation,
                and institutional transformation.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 rounded-[2rem] bg-[#244f2b] p-4 text-white shadow-[0_28px_90px_rgba(36,79,43,0.22)] md:grid-cols-[0.9fr_1.1fr] md:p-6 lg:gap-12 lg:p-8">
              <div className="min-h-[420px] overflow-hidden rounded-[1.5rem] bg-white/10">
                <ProfileImage profile={director} large />
              </div>
              <div className="flex flex-col justify-center px-2 py-8 md:px-4 lg:px-8">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.09em] text-[#f4c542]">
                  Director
                </p>
                <h2 className="text-4xl font-bold leading-tight tracking-[-0.025em] md:text-5xl">
                  {director.name}
                </h2>
                <p className="mt-3 max-w-xl text-base font-medium text-white/82">
                  {director.role}
                </p>
                <p className="mt-1 max-w-xl text-sm text-white/68">
                  {director.institution}
                </p>
                <div className="my-7 h-px w-full bg-white/14" />
                <h3 className="text-xl font-semibold tracking-[-0.01em]">
                  Executive Profile
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/76">
                  {director.featuredSummary}
                </p>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/76">
                  His leadership approach emphasizes accountability, measurable
                  impact, interdisciplinary collaboration, and long-term
                  institutional sustainability.
                </p>
                <div className="mt-8">
                  <Link
                    href={`/about/leadership/${director.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#244f2b] transition hover:-translate-y-0.5 hover:bg-[#f7f3df]"
                  >
                    View Full Profile
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#2d5a2d]">
                  Deputies
                </p>
                <h2 className="text-3xl font-bold tracking-[-0.02em] text-[#2f3e2f] md:text-4xl">
                  Director & Deputies
                </h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {deputies.map((profile) => (
                <article
                  key={profile.slug}
                  className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_50px_rgba(47,62,47,0.08)] ring-1 ring-[#2d5a2d]/10"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#eef3ed]">
                    <ProfileImage profile={profile} />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="text-sm font-semibold text-[#2d5a2d]">
                      {profile.role}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-[#2f3e2f]">
                      {profile.name}
                    </h3>
                    <p className="mt-4 text-base leading-8 text-[#4a5b4a]">
                      {profile.featuredSummary}
                    </p>
                    <Link
                      href={`/about/leadership/${profile.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2d5a2d]"
                    >
                      View Profile
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#2d5a2d]">
                  Scientific Team
                </p>
                <h2 className="text-3xl font-bold tracking-[-0.02em] text-[#2f3e2f] md:text-5xl">
                  Multidisciplinary research capacity
                </h2>
              </div>
              <p className="max-w-3xl text-base leading-8 text-[#4a5b4a] lg:justify-self-end">
                The Centre is supported by a multidisciplinary Scientific Team
                drawn from diverse academic fields including agricultural
                economics, animal production, crop science, veterinary medicine,
                plant biotechnology, geography, sociology, and communication.
                Over twenty Scientific Team members were appointed to strengthen
                research delivery and postgraduate supervision across the
                Centre's thematic focus areas.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {scientificTeam.map((profile) => (
                <TeamCard key={profile.slug} profile={profile} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2d5a2d]/10 text-[#2d5a2d]">
                <UsersRound className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#2d5a2d]">
                  Administrative & Support
                </p>
                <h2 className="text-3xl font-bold tracking-[-0.02em] text-[#2f3e2f]">
                  Administrative & Support Team
                </h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {supportTeam.map((profile) => (
                <TeamCard key={profile.slug} profile={profile} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
