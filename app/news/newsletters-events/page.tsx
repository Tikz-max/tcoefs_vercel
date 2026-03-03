"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";
import { getNewsletters, getUpcomingEvent } from "@/lib/services/admin";
import { getPublicUrl } from "@/lib/r2/newsletters";
import type { Newsletter, UpcomingEvent } from "@/lib/types/database";
import {
  Download,
  Calendar,
  MapPin,
  ExternalLink,
  FileText,
  ChevronRight,
  BookOpen,
  Newspaper,
  Search,
  X,
} from "lucide-react";

// ─── Skeletons ────────────────────────────────────────────────────────────────

function FeaturedSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
      <div className="lg:col-span-2 bg-gray-100 rounded-2xl h-72" />
      <div className="bg-gray-100 rounded-2xl h-56" />
    </div>
  );
}

function ArchiveSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-gray-100 rounded-2xl h-52" />
      ))}
    </div>
  );
}

// ─── Featured Newsletter Card (homepage style) ────────────────────────────────

function FeaturedCard({ newsletter }: { newsletter: Newsletter }) {
  const downloadUrl = getPublicUrl(newsletter.r2_key);
  return (
    <div className="bg-white rounded-2xl border border-[#4a6741]/30 shadow-xl overflow-hidden flex flex-col sm:flex-row h-full ring-1 ring-[#4a6741]/10">
      {/* Left accent panel */}
      <div className="sm:w-2/5 bg-[#f8f9fa] px-8 py-8 relative flex flex-col justify-between min-h-[260px]">
        <div className="absolute top-0 left-0 w-3 h-full bg-[#4a6741]" />
        <div className="relative z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#4a6741]/10 text-[#4a6741] text-xs font-semibold mb-5">
            Latest Issue
          </span>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            {newsletter.date}
          </p>
          <h2 className="text-5xl font-bold text-[#1a2e1a] leading-none tracking-tighter">
            News
            <br />
            letter<span className="text-[#4a6741]">.</span>
          </h2>
        </div>
        <div className="relative z-10 mt-auto pt-6">
          <div className="h-px bg-gray-300 w-full mb-3" />
          <p className="text-sm font-medium text-gray-500">
            {newsletter.volume} | {newsletter.issue}
          </p>
        </div>
      </div>

      {/* Right content panel */}
      <div className="sm:w-3/5 p-8 flex flex-col">
        <div className="mb-5">
          <div className="border-t-4 border-[#1a2e1a] w-14 mb-4" />
          <h3 className="text-lg font-bold text-[#1a2e1a] uppercase tracking-tight mb-1">
            {newsletter.title}
          </h3>
          <p className="text-[#4a6741] font-medium text-sm mb-0.5">
            TETFund Centre of Excellence in Food Security (TCoEFS)
          </p>
          <p className="text-gray-400 text-sm">University of Jos</p>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-6 line-clamp-4">
          {newsletter.excerpt}
        </p>
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#4a6741] hover:bg-[#3a5233] text-white text-sm font-bold uppercase tracking-wide rounded-lg shadow-sm hover:shadow-md transition-all duration-200 self-start"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </a>
      </div>
    </div>
  );
}

// ─── Event Card ───────────────────────────────────────────────────────────────

function EventCard({ event }: { event: UpcomingEvent }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-7 flex flex-col h-full">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-xs font-semibold mb-5 self-start">
        <Calendar className="w-3.5 h-3.5" />
        Upcoming Event
      </div>
      <h4 className="text-xl font-bold text-[#2f3e2f] leading-snug mb-5 flex-grow">
        {event.title}
      </h4>
      <div className="space-y-2.5 mb-6">
        <div className="flex items-start gap-2.5">
          <Calendar className="w-4 h-4 text-[#4a6741] flex-shrink-0 mt-0.5" />
          <span className="text-sm text-[#4a5b4a]">{event.date_range}</span>
        </div>
        <div className="flex items-start gap-2.5">
          <MapPin className="w-4 h-4 text-[#4a6741] flex-shrink-0 mt-0.5" />
          <span className="text-sm text-[#4a5b4a]">{event.location}</span>
        </div>
      </div>
      {event.link && (
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[#2d5a2d] hover:text-[#1e4a1e] font-semibold text-sm transition-colors group mt-auto"
        >
          View details
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
      )}
    </div>
  );
}

// ─── Archive Card ─────────────────────────────────────────────────────────────

function ArchiveCard({ newsletter }: { newsletter: Newsletter }) {
  const downloadUrl = getPublicUrl(newsletter.r2_key);
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Top green accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4a6741] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

      <div className="flex flex-row flex-1">
        {/* Left colour block */}
        <div className="w-2 bg-[#4a6741] flex-shrink-0 rounded-l-2xl" />

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                {newsletter.date}
              </p>
              <h3 className="text-base font-bold text-[#1a2e1a]">
                {newsletter.volume} <span className="text-[#4a6741]">|</span>{" "}
                {newsletter.issue}
              </h3>
            </div>
            {newsletter.is_latest && (
              <span className="flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded-full bg-[#4a6741]/10 text-[#4a6741] text-xs font-semibold">
                Latest
              </span>
            )}
          </div>

          <p className="text-sm text-[#1a2e1a] font-semibold mb-2">
            {newsletter.title}
          </p>

          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-grow mb-5">
            {newsletter.excerpt}
          </p>

          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a2e1a] hover:bg-[#4a6741] text-white text-xs font-bold uppercase tracking-wide rounded-lg transition-colors duration-200 self-start"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-[#2d5a2d]/8 flex items-center justify-center mb-5">
        <FileText className="w-8 h-8 text-[#2d5a2d]/30" />
      </div>
      <h3 className="text-base font-semibold text-[#2f3e2f] mb-2">
        No newsletters published yet
      </h3>
      <p className="text-sm text-gray-400 max-w-xs">
        Issues will appear here once they are published.
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NewslettersEventsPage() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [event, setEvent] = useState<UpcomingEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function load() {
      const [nl, ev] = await Promise.all([
        getNewsletters(),
        getUpcomingEvent(),
      ]);
      setNewsletters(nl);
      setEvent(ev);
      setLoading(false);
    }
    load();
  }, []);

  const latestNewsletter = newsletters.find((n) => n.is_latest) ?? null;

  // Archive — filtered by search query across all meaningful fields
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
    <div className="min-h-screen bg-white overflow-x-clip">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <AnimatedSection animation="fade">
        <section
          className="pt-24 pb-16 px-4 sm:px-6 lg:px-8"
          style={{
            background:
              "linear-gradient(to bottom, rgba(45,90,45,0.07) 0%, rgba(45,90,45,0.02) 50%, #ffffff 100%)",
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Publications & Events
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2f3e2f] leading-tight mb-5">
              Newsletters &amp; <span className="text-[#4a6741]">Events</span>
            </h1>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#2d5a2d]/40 to-transparent mx-auto mb-6" />
            <p className="text-lg text-[#4a5b4a] leading-relaxed max-w-2xl mx-auto">
              Stay informed with the latest publications and upcoming events
              from the TETFund Centre of Excellence in Food Security.
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Featured: Latest Issue + Event ────────────────────────────────── */}
      <AnimatedSection animation="slide-up" delay={60}>
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium">
                <Newspaper className="w-4 h-4" />
                Latest Issue
              </div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {loading ? (
              <FeaturedSkeleton />
            ) : !latestNewsletter && !event ? (
              <p className="text-sm text-gray-400 italic">
                Nothing to show yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                {/* Newsletter takes 2/3 */}
                {latestNewsletter ? (
                  <div className="lg:col-span-2">
                    <FeaturedCard newsletter={latestNewsletter} />
                  </div>
                ) : (
                  <div className="lg:col-span-2 flex items-center justify-center bg-white rounded-2xl border border-dashed border-gray-200 p-10">
                    <p className="text-sm text-gray-400 text-center">
                      No newsletter marked as latest yet.
                    </p>
                  </div>
                )}

                {/* Event takes 1/3 */}
                {event ? (
                  <div className="lg:col-span-1">
                    <EventCard event={event} />
                  </div>
                ) : (
                  <div className="lg:col-span-1 flex items-center justify-center bg-white rounded-2xl border border-dashed border-gray-200 p-8">
                    <p className="text-sm text-gray-400 text-center">
                      No upcoming events at this time.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </AnimatedSection>

      {/* ── Archive ───────────────────────────────────────────────────────── */}
      <AnimatedSection animation="slide-up" delay={80}>
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                  <FileText className="w-4 h-4" />
                  All Issues
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#2f3e2f] leading-tight">
                  Newsletter Archive
                </h2>
                <p className="text-[#4a5b4a] mt-2 max-w-lg text-sm leading-relaxed">
                  Browse and download every published edition of the TCoEFS
                  Newsletter.
                </p>
              </div>
              {!loading && newsletters.length > 0 && (
                <p className="text-sm text-gray-400 flex-shrink-0">
                  {newsletters.length}{" "}
                  {newsletters.length === 1 ? "issue" : "issues"} published
                </p>
              )}
            </div>

            {/* Search bar */}
            {!loading && newsletters.length > 0 && (
              <div className="relative mb-8">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by volume, issue, date or keyword…"
                  className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#2f3e2f] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2d5a2d]/30 focus:border-[#2d5a2d] transition-all duration-200 shadow-sm"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {loading ? (
              <ArchiveSkeleton />
            ) : newsletters.length === 0 ? (
              <EmptyState />
            ) : archiveNewsletters.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-gray-300" />
                </div>
                <p className="text-sm font-medium text-[#2f3e2f] mb-1">
                  No results for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  Try a different volume, issue number, or date.
                </p>
                <button
                  onClick={() => setQuery("")}
                  className="text-xs text-[#2d5a2d] font-semibold hover:underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {archiveNewsletters.map((nl) => (
                  <ArchiveCard key={nl.id} newsletter={nl} />
                ))}
              </div>
            )}
          </div>
        </section>
      </AnimatedSection>

      {/* ── Stay Connected ────────────────────────────────────────────────── */}
      <AnimatedSection animation="fade" delay={60}>
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f8f9fa]">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-12 h-12 rounded-xl bg-[#2d5a2d]/10 flex items-center justify-center mx-auto mb-5">
              <ExternalLink className="w-5 h-5 text-[#2d5a2d]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2f3e2f] mb-3">
              Want more from TCoEFS?
            </h2>
            <p className="text-[#4a5b4a] leading-relaxed mb-8 max-w-xl mx-auto">
              Visit our blog for research updates, news, and institutional
              announcements published throughout the year.
            </p>
            <a
              href="https://blog.tcoefs-unijos.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2d5a2d] hover:bg-[#1e4a1e] text-white font-semibold rounded-xl transition-colors duration-200 shadow-sm hover:shadow"
            >
              Visit our Blog
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
