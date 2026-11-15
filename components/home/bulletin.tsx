"use client";

import { useEffect, useState } from "react";
import { ArrowDownToLine, ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { getLatestNewsletter, getUpcomingEvent } from "@/lib/services/admin";
import { getPublicUrl } from "@/lib/r2/newsletters";
import type { Newsletter, UpcomingEvent } from "@/lib/types/database";
import { Reveal } from "@/components/site/motion";
import { Contours, TextLink } from "@/components/site/ui";

/** Latest newsletter issue alongside the next event. */
export default function Bulletin() {
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [event, setEvent] = useState<UpcomingEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getLatestNewsletter(), getUpcomingEvent()])
      .then(([nl, ev]) => {
        setNewsletter(nl);
        setEvent(ev);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="bg-paper py-24 sm:py-28">
        <div className="shell grid gap-6 lg:grid-cols-12">
          <div className="h-80 animate-pulse rounded-lg bg-mist lg:col-span-8" />
          <div className="h-80 animate-pulse rounded-lg bg-mist lg:col-span-4" />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-paper py-16 sm:py-20 lg:py-24">
      <div className="shell grid gap-6 lg:grid-cols-12">
        {newsletter && (
          <Reveal className="lg:col-span-8">
            <article className="grain relative flex h-full flex-col overflow-hidden rounded-lg bg-pine p-8 text-white sm:p-12">
              <Contours
                seed={9}
                className="absolute -right-1/4 -top-1/4 h-[150%] w-[80%] text-white/[0.07]"
              />
              <div className="relative flex flex-wrap items-center justify-between gap-4">
                <p className="eyebrow text-sage">
                  Newsletter
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
              <p className="relative mt-5 max-w-xl text-[1rem] leading-relaxed text-white/70">
                {newsletter.excerpt}
              </p>
              <div className="relative mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={getPublicUrl(newsletter.r2_key)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 items-center gap-3 rounded-full bg-wheat pl-6 pr-5 text-[0.9375rem] font-medium text-ink transition-colors duration-500 hover:bg-white"
                >
                  Download PDF
                  <ArrowDownToLine className="size-4 transition-transform duration-500 ease-expo group-hover:translate-y-0.5" />
                </a>
                <TextLink
                  href="/news/newsletters-events"
                  className="text-white/80"
                >
                  All issues
                </TextLink>
              </div>
            </article>
          </Reveal>
        )}

        <Reveal
          delay={0.1}
          className={newsletter ? "lg:col-span-4" : "lg:col-span-6"}
        >
          <article className="flex h-full flex-col rounded-lg bg-wheat p-8 text-ink sm:p-10">
            <p className="eyebrow">Upcoming event</p>
            {event ? (
              <>
                <h2 className="display display-md mt-16 sm:mt-24">
                  {event.title}
                </h2>
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
        </Reveal>
      </div>
    </section>
  );
}
