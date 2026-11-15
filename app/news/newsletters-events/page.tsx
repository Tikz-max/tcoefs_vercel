"use client";

import { useEffect, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Search,
  X,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/site/page-hero";
import {
  ButtonLink,
  Contours,
  Section,
  SectionHeader,
} from "@/components/site/ui";
import { CtaPanel } from "@/components/site/blocks";
import { Reveal } from "@/components/site/motion";
import { getNewsletters, getUpcomingEvent } from "@/lib/services/admin";
import { getPublicUrl } from "@/lib/r2/newsletters";
import type { Newsletter, UpcomingEvent } from "@/lib/types/database";
import { site } from "@/lib/site";

function FeaturedCard({ newsletter }: { newsletter: Newsletter }) {
  return (
    <article className="grain relative flex h-full flex-col overflow-hidden rounded-[3px] bg-pine p-8 text-white sm:p-12">
      <Contours
        seed={9}
        className="absolute -right-1/4 -top-1/4 h-[150%] w-[80%] text-white/[0.07]"
      />
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <p className="eyebrow text-sage">
          Latest issue
          <span className="mx-3 opacity-50">/</span>
          {newsletter.date}
        </p>
        <p className="eyebrow rounded-full border border-white/25 px-3 py-1.5">
          {newsletter.volume}
          <span className="mx-2 opacity-50">/</span>
          {newsletter.issue}
        </p>
      </div>
      <h2 className="display display-lg relative mt-16 max-w-2xl sm:mt-24">
        {newsletter.title}
      </h2>
      <p className="relative mt-3 text-[0.875rem] text-white/55">
        TETFund Centre of Excellence in Food Security (TCoEFS), University of
        Jos
      </p>
      <p className="relative mt-5 max-w-xl text-[1rem] leading-relaxed text-white/70">
        {newsletter.excerpt}
      </p>
      <div className="relative mt-10">
        <a
          href={getPublicUrl(newsletter.r2_key)}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-12 items-center gap-3 rounded-full bg-wheat pl-6 pr-5 text-[0.9375rem] font-medium text-ink transition-colors duration-500 hover:bg-white"
        >
          Download PDF
          <ArrowDownToLine className="size-4 transition-transform duration-500 ease-expo group-hover:translate-y-0.5" />
        </a>
      </div>
    </article>
  );
}

function EventCard({ event }: { event: UpcomingEvent | null }) {
  return (
    <article className="flex h-full flex-col rounded-[3px] bg-wheat p-8 text-ink sm:p-10">
      <p className="eyebrow">Upcoming event</p>
      {event ? (
        <>
          <h2 className="display display-md mt-16 sm:mt-24">{event.title}</h2>
          <ul className="mt-8 space-y-3 border-t border-ink/20 pt-6 text-[0.9375rem]">
            <li className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 size-4 shrink-0" />
              {event.date_range}
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              {event.location}
            </li>
          </ul>
          {event.link && (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-auto inline-flex items-center gap-2 pt-10 text-[0.9375rem] font-medium"
            >
              <span className="link-draw pb-0.5">View details</span>
              <ArrowUpRight className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </>
      ) : (
        <p className="mt-16 font-display text-[1.5rem] leading-snug tracking-[-0.01em] sm:mt-24">
          No upcoming events at this time.
        </p>
      )}
    </article>
  );
}

function ArchiveRow({
  newsletter,
  index,
}: {
  newsletter: Newsletter;
  index: number;
}) {
  return (
    <li className="group grid gap-x-8 gap-y-3 border-t border-line py-8 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-3">
        <p className="eyebrow text-wheat-deep">
          {String(index + 1).padStart(2, "0")}
          <span className="ml-4 text-stone">{newsletter.date}</span>
        </p>
        <p className="eyebrow mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-pine">
          {newsletter.volume}
          <span className="opacity-40">/</span>
          {newsletter.issue}
          {newsletter.is_latest && (
            <span className="ml-1 rounded-full bg-wheat px-2 py-1 text-ink">
              Latest
            </span>
          )}
        </p>
      </div>
      <div className="lg:col-span-7">
        <h3 className="font-display text-[1.4rem] leading-snug tracking-[-0.01em] text-ink">
          {newsletter.title}
        </h3>
        <p className="mt-2 line-clamp-2 max-w-2xl text-[0.9375rem] leading-relaxed text-stone">
          {newsletter.excerpt}
        </p>
      </div>
      <div className="lg:col-span-2 lg:justify-self-end">
        <a
          href={getPublicUrl(newsletter.r2_key)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Download ${newsletter.title}, ${newsletter.volume} ${newsletter.issue}`}
          className="group/dl inline-flex h-11 items-center gap-2.5 rounded-full border border-ink/20 pl-5 pr-4 text-[0.875rem] font-medium text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper"
        >
          Download PDF
          <ArrowDownToLine className="size-4 transition-transform duration-500 ease-expo group-hover/dl:translate-y-0.5" />
        </a>
      </div>
    </li>
  );
}

export default function NewslettersEventsPage() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [event, setEvent] = useState<UpcomingEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    Promise.all([getNewsletters(), getUpcomingEvent()])
      .then(([nl, ev]) => {
        setNewsletters(nl);
        setEvent(ev);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const latestNewsletter = newsletters.find((n) => n.is_latest) ?? null;

  const archiveNewsletters = query.trim()
    ? newsletters.filter((n) => {
        const q = query.toLowerCase();
        return (
          n.volume.toLowerCase().includes(q) ||
          n.issue.toLowerCase().includes(q) ||
          n.date.toLowerCase().includes(q) ||
          n.title.toLowerCase().includes(q) ||
          n.excerpt.toLowerCase().includes(q)
        );
      })
    : newsletters;

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          crumbs={[{ label: "News" }, { label: "Newsletters & Events" }]}
          title="Newsletters & *Events.*"
          lede="Stay informed with the latest publications and upcoming events from the TETFund Centre of Excellence in Food Security."
        />

        {/* Latest */}
        <Section>
          {loading ? (
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="h-96 animate-pulse rounded-[3px] bg-mist lg:col-span-8" />
              <div className="h-96 animate-pulse rounded-[3px] bg-mist lg:col-span-4" />
            </div>
          ) : !latestNewsletter && !event ? (
            <p className="display display-md border-y border-line py-16 text-center text-stone">
              Nothing to show yet.
            </p>
          ) : (
            <div className="grid gap-6 lg:grid-cols-12">
              <Reveal className="lg:col-span-8">
                {latestNewsletter ? (
                  <FeaturedCard newsletter={latestNewsletter} />
                ) : (
                  <div className="grid h-full min-h-64 place-items-center rounded-[3px] bg-mist p-10 text-center font-display text-[1.4rem] text-stone">
                    No newsletter marked as latest yet.
                  </div>
                )}
              </Reveal>
              <Reveal delay={0.1} className="lg:col-span-4">
                <EventCard event={event} />
              </Reveal>
            </div>
          )}
        </Section>

        {/* Archive */}
        <Section tone="mist">
          <SectionHeader
            eyebrow="All issues"
            index="01"
            title="Newsletter *archive.*"
            lede="Browse and download every published edition of the TCoEFS Newsletter."
            aside={
              !loading && newsletters.length > 0 ? (
                <p className="eyebrow mt-4 text-pine">
                  {newsletters.length}{" "}
                  {newsletters.length === 1 ? "issue" : "issues"} published
                </p>
              ) : undefined
            }
          />

          {!loading && newsletters.length > 0 && (
            <label className="relative mt-12 block max-w-xl">
              <span className="sr-only">Search the newsletter archive</span>
              <Search className="pointer-events-none absolute left-5 top-1/2 size-4 -translate-y-1/2 text-stone" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by volume, issue, date or keyword…"
                className="h-12 w-full rounded-full border border-ink/20 bg-paper pl-12 pr-12 text-[0.9375rem] text-ink placeholder:text-ink/40 transition-colors hover:border-ink focus:border-pine focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full text-stone hover:bg-mist hover:text-ink"
                >
                  <X className="size-4" />
                </button>
              )}
            </label>
          )}

          <div className="mt-10">
            {loading ? (
              <div className="space-y-px">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-28 animate-pulse bg-paper" />
                ))}
              </div>
            ) : newsletters.length === 0 ? (
              <div className="border-y border-line py-20 text-center">
                <p className="display display-md text-ink">
                  No newsletters published yet
                </p>
                <p className="mt-3 text-[0.9375rem] text-stone">
                  Issues will appear here once they are published.
                </p>
              </div>
            ) : archiveNewsletters.length === 0 ? (
              <div className="border-y border-line py-20 text-center">
                <p className="display display-md text-ink">
                  No results for &ldquo;{query}&rdquo;
                </p>
                <p className="mt-3 text-[0.9375rem] text-stone">
                  Try a different volume, issue number, or date.
                </p>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="group mt-6 text-[0.9375rem] font-medium text-pine"
                >
                  <span className="link-draw pb-0.5">Clear search</span>
                </button>
              </div>
            ) : (
              <ul className="border-b border-line">
                {archiveNewsletters.map((nl, i) => (
                  <ArchiveRow key={nl.id} newsletter={nl} index={i} />
                ))}
              </ul>
            )}
          </div>
        </Section>

        <Section>
          <CtaPanel
            eyebrow="The Centre blog"
            title="Want more from TCoEFS?"
            actions={
              <ButtonLink href={site.blogUrl} variant="wheat" icon="up-right">
                Visit our blog
              </ButtonLink>
            }
          >
            <p>
              Visit our blog for research updates, news, and institutional
              announcements published throughout the year.
            </p>
          </CtaPanel>
        </Section>
      </main>
      <Footer />
    </>
  );
}
