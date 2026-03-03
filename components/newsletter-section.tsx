"use client";

import { useEffect, useState } from "react";
import { getLatestNewsletter } from "@/lib/services/admin";
import { getPublicUrl } from "@/lib/r2/newsletters";
import type { Newsletter } from "@/lib/types/database";
import { getUpcomingEvent } from "@/lib/services/admin";
import type { UpcomingEvent } from "@/lib/types/database";

export default function NewsletterSection() {
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [event, setEvent] = useState<UpcomingEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [nl, ev] = await Promise.all([
        getLatestNewsletter(),
        getUpcomingEvent(),
      ]);
      setNewsletter(nl);
      setEvent(ev);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-64 bg-gray-100 rounded-2xl animate-pulse" />
          <div className="h-48 bg-gray-100 rounded-xl animate-pulse" />
        </div>
      </section>
    );
  }

  // No newsletter yet but event may still exist — don't bail out
  const downloadUrl = newsletter ? getPublicUrl(newsletter.r2_key) : undefined;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Newsletter card — only rendered when a latest issue exists */}
        {newsletter && (
          <div className="lg:col-span-2 w-full">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden flex flex-col md:flex-row h-full">
              {/* Left visual side */}
              <div className="md:w-2/5 bg-[#f8f9fa] p-8 relative flex flex-col justify-between min-h-[300px]">
                <div className="absolute top-0 left-0 w-3 h-full bg-[#4a6741]" />

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {newsletter.date}
                    </span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-bold text-[#1a2e1a] leading-none tracking-tighter">
                    News
                    <br />
                    letter<span className="text-[#4a6741]">.</span>
                  </h2>
                </div>

                <div className="relative z-10 mt-auto pt-8">
                  <div className="h-px bg-gray-300 w-full mb-3" />
                  <p className="text-sm font-medium text-gray-500">
                    {newsletter.volume} | {newsletter.issue}
                  </p>
                </div>
              </div>

              {/* Right content side */}
              <div className="md:w-3/5 p-8 flex flex-col">
                <div className="mb-6">
                  <div className="border-t-4 border-[#1a2e1a] w-16 mb-4" />
                  <h3 className="text-xl font-bold text-[#1a2e1a] uppercase mb-2 tracking-tight">
                    {newsletter.title}
                  </h3>
                  <p className="text-[#4a6741] font-medium text-sm mb-1">
                    TETFund Centre of Excellence in Food Security (TCoEFS)
                  </p>
                  <p className="text-gray-500 text-sm">University of Jos</p>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
                  {newsletter.excerpt}
                </p>

                <div>
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#4a6741] hover:bg-[#3a5233] text-white text-sm font-bold uppercase tracking-wide rounded shadow-sm hover:shadow transition-all duration-200"
                  >
                    Download PDF
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Event card — always shown when event data exists */}
        <div
          className={`w-full ${newsletter ? "lg:col-span-1" : "lg:col-span-3 max-w-sm"}`}
        >
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 h-full">
            <h3 className="text-lg font-semibold text-[#2f3e2f] mb-4">
              Upcoming Event
            </h3>
            {event ? (
              <>
                <h4 className="text-xl font-bold text-[#2f3e2f] mb-3">
                  {event.title}
                </h4>
                <p className="text-sm text-[#4a5b4a] mb-2">
                  {event.date_range}
                </p>
                <p className="text-sm text-[#4a5b4a] mb-4">{event.location}</p>
                {event.link && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#2d5a2d] hover:text-[#1e4a1e] font-medium text-sm transition-colors"
                  >
                    View details
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                )}
              </>
            ) : (
              <p className="text-sm text-gray-400 italic">
                No upcoming events at this time.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
