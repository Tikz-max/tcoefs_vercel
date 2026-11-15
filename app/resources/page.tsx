"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownToLine,
  BookOpen,
  Building2,
  ClipboardList,
  GraduationCap,
  ImageIcon,
  Lightbulb,
  Search,
  Star,
  X,
  type LucideIcon,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/site/page-hero";
import { ButtonLink, Section, SectionHeader } from "@/components/site/ui";
import { CtaPanel } from "@/components/site/blocks";
import { Reveal } from "@/components/site/motion";
import { getResources } from "@/lib/services/admin";
import { getResourcePublicUrl } from "@/lib/r2/resources";
import type { Resource } from "@/lib/types/database";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES: { key: string; icon: LucideIcon; description: string }[] = [
  {
    key: "Publications",
    icon: BookOpen,
    description:
      "Peer-reviewed articles, conference papers, and scholarly outputs.",
  },
  {
    key: "Policy Briefs",
    icon: Lightbulb,
    description:
      "Evidence-based summaries designed to inform decision-making and policy engagement.",
  },
  {
    key: "Technical & Activity Reports",
    icon: ClipboardList,
    description:
      "Project reports, enterprise documentation, monitoring updates, and institutional reports.",
  },
  {
    key: "Training Materials",
    icon: GraduationCap,
    description:
      "Workshop manuals, extension guides, course materials, and instructional resources.",
  },
  {
    key: "Institutional Documents",
    icon: Building2,
    description:
      "Concept notes, strategic documents, partnership briefs, and official publications.",
  },
  {
    key: "Media & Gallery",
    icon: ImageIcon,
    description:
      "Curated visual highlights from trainings, facilities, partnerships, and events.",
  },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Most recent" },
  { value: "oldest", label: "Oldest first" },
  { value: "az", label: "A to Z" },
  { value: "za", label: "Z to A" },
];

const selectClass =
  "h-12 appearance-none rounded-full border border-ink/20 bg-paper bg-[length:0.9rem] bg-[right_1rem_center] bg-no-repeat pl-5 pr-10 text-[0.9rem] text-ink transition-colors hover:border-ink focus:border-pine focus:outline-none";
const chevron = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2308170f' stroke-width='1.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
};

// ─── Rows ─────────────────────────────────────────────────────────────────────

function DownloadLink({ resource }: { resource: Resource }) {
  return (
    <a
      href={getResourcePublicUrl(resource.r2_key)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Download ${resource.title}`}
      className="group/dl inline-flex h-11 shrink-0 items-center gap-2.5 rounded-full border border-ink/20 pl-5 pr-4 text-[0.875rem] font-medium text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper"
    >
      Download
      <ArrowDownToLine className="size-4 transition-transform duration-500 ease-expo group-hover/dl:translate-y-0.5" />
    </a>
  );
}

function LibraryRow({ resource, index }: { resource: Resource; index: number }) {
  return (
    <li className="group grid gap-x-8 gap-y-3 border-t border-line py-7 transition-colors duration-500 lg:grid-cols-12 lg:items-center">
      <span className="eyebrow hidden text-wheat-deep lg:col-span-1 lg:block">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="lg:col-span-5">
        <h3 className="text-[1.125rem] font-semibold leading-snug text-ink">
          {resource.title}
        </h3>
        <p className="eyebrow mt-3 flex flex-wrap gap-x-3 gap-y-1 text-stone">
          <span className="text-pine">{resource.category}</span>
          <span>{resource.year}</span>
          {resource.is_featured && (
            <span className="inline-flex items-center gap-1 text-wheat-deep">
              <Star className="size-3 fill-current" />
              Featured
            </span>
          )}
        </p>
      </div>
      <p className="line-clamp-2 text-[0.9375rem] leading-relaxed text-stone lg:col-span-4">
        {resource.description}
      </p>
      <div className="lg:col-span-2 lg:justify-self-end">
        <DownloadLink resource={resource} />
      </div>
    </li>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  const libraryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getResources()
      .then((data) => setResources(data))
      .catch(() => setResources([]))
      .finally(() => setLoading(false));
  }, []);

  const featuredResources = useMemo(
    () => resources.filter((r) => r.is_featured),
    [resources],
  );

  const availableYears = useMemo(
    () =>
      [...new Set(resources.map((r) => r.year))].sort(
        (a, b) => Number(b) - Number(a),
      ),
    [resources],
  );

  const countByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    resources.forEach((r) => {
      map[r.category] = (map[r.category] ?? 0) + 1;
    });
    return map;
  }, [resources]);

  const filteredResources = useMemo(() => {
    let list = [...resources];

    if (activeCategory) list = list.filter((r) => r.category === activeCategory);
    if (yearFilter !== "all") list = list.filter((r) => r.year === yearFilter);

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.year.includes(q),
      );
    }

    if (sortBy === "newest") {
      list.sort(
        (a, b) =>
          Number(b.year) - Number(a.year) || a.display_order - b.display_order,
      );
    } else if (sortBy === "oldest") {
      list.sort(
        (a, b) =>
          Number(a.year) - Number(b.year) || a.display_order - b.display_order,
      );
    } else if (sortBy === "az") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "za") {
      list.sort((a, b) => b.title.localeCompare(a.title));
    }

    return list;
  }, [resources, activeCategory, yearFilter, query, sortBy]);

  const hasActiveFilters =
    !!activeCategory || yearFilter !== "all" || !!query.trim();

  function handleCategoryClick(key: string) {
    setActiveCategory((prev) => (prev === key ? null : key));
    setTimeout(() => {
      libraryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  function clearAllFilters() {
    setQuery("");
    setActiveCategory(null);
    setYearFilter("all");
    setSortBy("newest");
  }

  const chipClass =
    "inline-flex h-9 items-center gap-2 rounded-full bg-pine pl-4 pr-3 text-[0.8125rem] text-paper transition-colors hover:bg-ink";

  return (
    <>
      <Navbar />
      <main id="main">
        <PageHero
          crumbs={[{ label: "Resources" }]}
          title="Knowledge *repository.*"
          lede="Access publications, reports, training materials, and knowledge products of the TETFund Centre of Excellence in Food Security."
        >
          {!loading && (
            <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-6 border-t border-[#cbd5e1] pt-6">
              {[
                { label: "Total resources", value: resources.length },
                { label: "Categories", value: CATEGORIES.length },
                { label: "Featured", value: featuredResources.length },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dd className="display text-[2.25rem] leading-none text-pine">
                    {value}
                  </dd>
                  <dt className="mt-2 text-[0.875rem] text-stone">{label}</dt>
                </div>
              ))}
            </dl>
          )}
        </PageHero>

        {/* Categories */}
        <Section>
          <SectionHeader
            eyebrow="Knowledge categories"
            index="01"
            title="Browse by *category.*"
            lede="Select a category to filter the resource library below."
          />
          <ul
            className="mt-12 grid gap-px overflow-hidden rounded-lg bg-ink/15 sm:grid-cols-2 lg:grid-cols-3"
            style={{ boxShadow: "0 0 0 1px rgb(8 23 15 / 0.15)" }}
          >
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const active = activeCategory === cat.key;
              const count = countByCategory[cat.key] ?? 0;
              return (
                <li key={cat.key}>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(cat.key)}
                    aria-pressed={active}
                    className={`group flex h-full w-full flex-col p-7 text-left transition-colors duration-500 sm:p-9 ${
                      active
                        ? "bg-pine text-white"
                        : "bg-paper text-ink hover:bg-white"
                    }`}
                  >
                    <span className="flex w-full items-start justify-between">
                      <span
                        className={`eyebrow tabular-nums ${active ? "text-wheat" : "text-wheat-deep"}`}
                      >
                        {String(count).padStart(2, "0")}{" "}
                        {count === 1 ? "item" : "items"}
                      </span>
                      <Icon
                        strokeWidth={1.2}
                        className={`size-7 transition-transform duration-300 ease-expo group-hover:-translate-y-1 ${
                          active ? "text-sage" : "text-pine"
                        }`}
                      />
                    </span>
                    <span className="display display-sm mt-12 block">
                      {cat.key}
                    </span>
                    <span
                      className={`mt-3 block text-[0.9375rem] leading-relaxed ${
                        active ? "text-white/70" : "text-stone"
                      }`}
                    >
                      {cat.description}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Section>

        {/* Featured */}
        {(loading || featuredResources.length > 0) && (
          <Section tone="forest" className="grain">
            <SectionHeader
              tone="dark"
              eyebrow="Featured documents"
              index="02"
              title="Selected by the *Centre.*"
            />
            {loading ? (
              <div className="mt-14 space-y-px">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 animate-pulse bg-white/5" />
                ))}
              </div>
            ) : (
              <ul className="mt-14 border-b border-line-inverse">
                {featuredResources.map((r, i) => (
                  <Reveal as="li" key={r.id} delay={i * 0.06} y={14}>
                    <a
                      href={getResourcePublicUrl(r.r2_key)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid gap-x-8 gap-y-3 border-t border-line-inverse py-8 lg:grid-cols-12 lg:items-center"
                    >
                      <span className="eyebrow text-wheat lg:col-span-2">
                        {r.category}
                        <span className="ml-3 text-white/50">{r.year}</span>
                      </span>
                      <span className="display display-md text-white transition-transform duration-300 ease-expo lg:col-span-5">
                        {r.title}
                      </span>
                      <span className="line-clamp-2 text-[0.9375rem] leading-relaxed text-white/60 lg:col-span-4">
                        {r.description}
                      </span>
                      <span className="grid size-12 place-items-center rounded-full border border-white/25 text-white transition-colors duration-500 group-hover:border-wheat group-hover:bg-wheat group-hover:text-ink lg:col-span-1 lg:justify-self-end">
                        <ArrowDownToLine className="size-[1.125rem]" />
                      </span>
                    </a>
                  </Reveal>
                ))}
              </ul>
            )}
          </Section>
        )}

        {/* Library */}
        <section
          ref={libraryRef}
          className="scroll-mt-20 bg-paper py-16 sm:py-20 lg:py-24"
        >
          <div className="shell">
            <SectionHeader
              eyebrow="Resource library"
              index="03"
              title="All *resources.*"
              aside={
                !loading ? (
                  <p className="eyebrow text-stone lg:text-right">
                    {filteredResources.length} of {resources.length}{" "}
                    {resources.length === 1 ? "resource" : "resources"}
                  </p>
                ) : undefined
              }
            />

            {!loading && resources.length > 0 && (
              <div className="mt-12 flex flex-col gap-3 lg:flex-row lg:items-center">
                <label className="relative flex-1">
                  <span className="sr-only">Search resources</span>
                  <Search className="pointer-events-none absolute left-5 top-1/2 size-4 -translate-y-1/2 text-stone" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search resources…"
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
                <div className="flex flex-wrap gap-3">
                  <select
                    aria-label="Filter by category"
                    value={activeCategory ?? "all"}
                    onChange={(e) =>
                      setActiveCategory(
                        e.target.value === "all" ? null : e.target.value,
                      )
                    }
                    className={selectClass}
                    style={chevron}
                  >
                    <option value="all">All categories</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.key}
                      </option>
                    ))}
                  </select>
                  {availableYears.length > 1 && (
                    <select
                      aria-label="Filter by year"
                      value={yearFilter}
                      onChange={(e) => setYearFilter(e.target.value)}
                      className={selectClass}
                      style={chevron}
                    >
                      <option value="all">All years</option>
                      {availableYears.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  )}
                  <select
                    aria-label="Sort resources"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={selectClass}
                    style={chevron}
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {hasActiveFilters && (
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="eyebrow mr-2 text-stone">Active filters</span>
                {activeCategory && (
                  <button
                    type="button"
                    onClick={() => setActiveCategory(null)}
                    className={chipClass}
                  >
                    {activeCategory}
                    <X className="size-3.5" />
                  </button>
                )}
                {yearFilter !== "all" && (
                  <button
                    type="button"
                    onClick={() => setYearFilter("all")}
                    className={chipClass}
                  >
                    {yearFilter}
                    <X className="size-3.5" />
                  </button>
                )}
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className={chipClass}
                  >
                    &ldquo;{query}&rdquo;
                    <X className="size-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="group ml-2 text-[0.875rem] font-medium text-pine"
                >
                  <span className="link-draw pb-0.5">Clear all</span>
                </button>
              </div>
            )}

            <div className="mt-10">
              {loading ? (
                <div className="space-y-px">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-24 animate-pulse bg-mist" />
                  ))}
                </div>
              ) : filteredResources.length === 0 ? (
                <div className="border-y border-line py-20 text-center">
                  <p className="display display-md text-ink">
                    {hasActiveFilters
                      ? "No matching resources"
                      : "No resources yet"}
                  </p>
                  <p className="mt-3 text-[0.9375rem] text-stone">
                    {hasActiveFilters
                      ? "Try adjusting your search or filters."
                      : "Documents will appear here once they are published."}
                  </p>
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={clearAllFilters}
                      className="group mt-6 text-[0.9375rem] font-medium text-pine"
                    >
                      <span className="link-draw pb-0.5">Clear all filters</span>
                    </button>
                  )}
                </div>
              ) : (
                <ul className="border-b border-line">
                  {filteredResources.map((r, i) => (
                    <LibraryRow key={r.id} resource={r} index={i} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        <Section className="!pt-0">
          <CtaPanel
            eyebrow="Requests"
            title="Need additional information?"
            actions={
              <>
                <ButtonLink href="mailto:tcoefs@unijos.edu.ng" variant="wheat">
                  Request a resource
                </ButtonLink>
                <ButtonLink href="/contact" variant="outline-light">
                  Contact the Centre
                </ButtonLink>
              </>
            }
          >
            <p>
              If you require specific technical documents, institutional
              materials, partnership briefs, or datasets not publicly listed,
              please contact the Centre.
            </p>
          </CtaPanel>
        </Section>
      </main>
      <Footer />
    </>
  );
}
