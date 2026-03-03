"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";
import { getResources } from "@/lib/services/admin";
import { getResourcePublicUrl } from "@/lib/r2/resources";
import type { Resource } from "@/lib/types/database";
import {
  Search,
  X,
  Download,
  BookOpen,
  FileText,
  Lightbulb,
  ClipboardList,
  GraduationCap,
  Building2,
  ImageIcon,
  ChevronDown,
  ArrowUpDown,
  Star,
  Mail,
  ExternalLink,
  Filter,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    key: "Publications",
    icon: BookOpen,
    description:
      "Peer-reviewed articles, conference papers, and scholarly outputs.",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    iconBg: "bg-emerald-100",
  },
  {
    key: "Policy Briefs",
    icon: Lightbulb,
    description:
      "Evidence-based summaries designed to inform decision-making and policy engagement.",
    color: "bg-amber-50 text-amber-700 border-amber-100",
    iconBg: "bg-amber-100",
  },
  {
    key: "Technical & Activity Reports",
    icon: ClipboardList,
    description:
      "Project reports, enterprise documentation, monitoring updates, and institutional reports.",
    color: "bg-blue-50 text-blue-700 border-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    key: "Training Materials",
    icon: GraduationCap,
    description:
      "Workshop manuals, extension guides, course materials, and instructional resources.",
    color: "bg-purple-50 text-purple-700 border-purple-100",
    iconBg: "bg-purple-100",
  },
  {
    key: "Institutional Documents",
    icon: Building2,
    description:
      "Concept notes, strategic documents, partnership briefs, and official publications.",
    color: "bg-rose-50 text-rose-700 border-rose-100",
    iconBg: "bg-rose-100",
  },
  {
    key: "Media & Gallery",
    icon: ImageIcon,
    description:
      "Curated visual highlights from trainings, facilities, partnerships, and events.",
    color: "bg-teal-50 text-teal-700 border-teal-100",
    iconBg: "bg-teal-100",
  },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Most Recent" },
  { value: "oldest", label: "Oldest First" },
  { value: "az", label: "A → Z" },
  { value: "za", label: "Z → A" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function categoryStyle(key: string) {
  return CATEGORIES.find((c) => c.key === key) ?? CATEGORIES[0];
}

function CategoryBadge({ category }: { category: string }) {
  const style = categoryStyle(category);
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style.color}`}
    >
      {category}
    </span>
  );
}

// ─── Skeletons ────────────────────────────────────────────────────────────────

function RowSkeleton() {
  return (
    <div className="animate-pulse flex items-center gap-4 px-5 py-4 border-b border-gray-100 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-gray-100 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-100 rounded w-2/3" />
        <div className="h-3 bg-gray-100 rounded w-1/3" />
      </div>
      <div className="h-3 bg-gray-100 rounded w-12 hidden sm:block" />
      <div className="h-8 bg-gray-100 rounded-lg w-24 hidden sm:block" />
    </div>
  );
}

// ─── Category Grid Card ───────────────────────────────────────────────────────

function CategoryCard({
  cat,
  active,
  onClick,
  count,
}: {
  cat: (typeof CATEGORIES)[0];
  active: boolean;
  onClick: () => void;
  count: number;
}) {
  const Icon = cat.icon;
  return (
    <button
      onClick={onClick}
      className={`group relative w-full text-left rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d5a2d] ${
        active
          ? "border-[#2d5a2d] ring-2 ring-[#2d5a2d]/20 bg-white shadow-md"
          : "border-gray-100 bg-white shadow-sm hover:border-[#2d5a2d]/30"
      }`}
    >
      {/* Top accent line on hover/active */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-[#5a7c65] to-[#f4c542] origin-left transition-transform duration-300 ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />

      <div className="flex items-start justify-between gap-3 mb-3">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${cat.iconBg}`}
        >
          <Icon className={`w-4 h-4 ${cat.color.split(" ")[1]}`} />
        </div>
        {count > 0 && (
          <span className="text-xs font-bold text-gray-400 tabular-nums">
            {count}
          </span>
        )}
      </div>

      <h3 className="text-sm font-bold text-[#2f3e2f] mb-1 leading-snug">
        {cat.key}
      </h3>
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
        {cat.description}
      </p>
    </button>
  );
}

// ─── Featured Row ─────────────────────────────────────────────────────────────

function FeaturedRow({ resource }: { resource: Resource }) {
  const url = getResourcePublicUrl(resource.r2_key);
  const style = categoryStyle(resource.category);
  const Icon = style.icon;

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 px-5 py-4 rounded-xl hover:bg-gray-50 transition-colors duration-150 border border-transparent hover:border-gray-100">
      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${style.iconBg}`}
      >
        <Icon className={`w-5 h-5 ${style.color.split(" ")[1]}`} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#2f3e2f] leading-snug mb-1 group-hover:text-[#2d5a2d] transition-colors truncate">
          {resource.title}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <CategoryBadge category={resource.category} />
          <span className="text-xs text-gray-400">{resource.year}</span>
          {resource.description && (
            <>
              <span className="text-gray-300 hidden sm:inline">·</span>
              <span className="text-xs text-gray-500 hidden sm:inline truncate max-w-xs">
                {resource.description}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Download */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2d5a2d] hover:bg-[#1e4a1e] text-white text-xs font-bold uppercase tracking-wide rounded-lg transition-colors duration-200 flex-shrink-0 self-start sm:self-auto"
      >
        <Download className="w-3.5 h-3.5" />
        Download
      </a>
    </div>
  );
}

// ─── Library Row ──────────────────────────────────────────────────────────────

function LibraryRow({ resource }: { resource: Resource }) {
  const url = getResourcePublicUrl(resource.r2_key);
  const style = categoryStyle(resource.category);
  const Icon = style.icon;

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors duration-150">
      {/* Icon */}
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${style.iconBg}`}
      >
        <Icon className={`w-4 h-4 ${style.color.split(" ")[1]}`} />
      </div>

      {/* Title + meta */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#2f3e2f] leading-snug mb-1 group-hover:text-[#2d5a2d] transition-colors">
          {resource.title}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <CategoryBadge category={resource.category} />
          <span className="text-xs text-gray-400">{resource.year}</span>
        </div>
      </div>

      {/* Description — hidden on mobile */}
      <p className="hidden lg:block text-xs text-gray-500 max-w-xs truncate flex-shrink-0">
        {resource.description}
      </p>

      {/* Download */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#2d5a2d]/30 text-[#2d5a2d] hover:bg-[#2d5a2d] hover:text-white text-xs font-semibold rounded-lg transition-all duration-200 flex-shrink-0 self-start sm:self-auto"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Download</span>
        <span className="sm:hidden">PDF</span>
      </a>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyLibrary({ hasQuery }: { hasQuery: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        {hasQuery ? (
          <Search className="w-6 h-6 text-gray-300" />
        ) : (
          <FileText className="w-6 h-6 text-gray-300" />
        )}
      </div>
      <p className="text-sm font-semibold text-[#2f3e2f] mb-1">
        {hasQuery ? "No matching resources" : "No resources yet"}
      </p>
      <p className="text-xs text-gray-400 max-w-xs">
        {hasQuery
          ? "Try adjusting your search or filters."
          : "Resources will appear here once published."}
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  // Ref to scroll library into view when category card is clicked
  const libraryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getResources().then((data) => {
      setResources(data);
      setLoading(false);
    });
  }, []);

  // Derived
  const featuredResources = useMemo(
    () => resources.filter((r) => r.is_featured),
    [resources],
  );

  const availableYears = useMemo(() => {
    const years = [...new Set(resources.map((r) => r.year))].sort(
      (a, b) => Number(b) - Number(a),
    );
    return years;
  }, [resources]);

  // Count per category (for category cards)
  const countByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    resources.forEach((r) => {
      map[r.category] = (map[r.category] ?? 0) + 1;
    });
    return map;
  }, [resources]);

  const filteredResources = useMemo(() => {
    let list = [...resources];

    if (activeCategory) {
      list = list.filter((r) => r.category === activeCategory);
    }

    if (yearFilter !== "all") {
      list = list.filter((r) => r.year === yearFilter);
    }

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

    // Sort
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
    // Scroll to library smoothly
    setTimeout(() => {
      libraryRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  }

  function clearAllFilters() {
    setQuery("");
    setActiveCategory(null);
    setYearFilter("all");
    setSortBy("newest");
  }

  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0f2010]">
        {/* Decorative rings */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-wider mb-7">
            <FileText className="w-3.5 h-3.5" />
            Knowledge Repository
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 max-w-3xl">
            Resources
          </h1>
          <div className="w-14 h-0.5 bg-[#f4c542] mb-6" />
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
            Access publications, reports, training materials, and knowledge
            products of the TETFund Centre of Excellence in Food Security.
          </p>

          {/* Quick stats */}
          {!loading && (
            <div className="mt-10 flex flex-wrap gap-6">
              {[
                { label: "Total Resources", value: resources.length },
                { label: "Categories", value: CATEGORIES.length },
                {
                  label: "Featured",
                  value: featuredResources.length,
                },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-white tabular-nums">
                    {value}
                  </p>
                  <p className="text-xs text-white/50 uppercase tracking-wider mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Section 1: Knowledge Categories ───────────────────────────────── */}
      <AnimatedSection animation="slide-up" delay={60}>
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                <Filter className="w-4 h-4" />
                Knowledge Categories
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2f3e2f]">
                Browse by Category
              </h2>
              <p className="text-sm text-[#4a5b4a] mt-2">
                Click a category to filter the resource library below.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map((cat) => (
                <CategoryCard
                  key={cat.key}
                  cat={cat}
                  active={activeCategory === cat.key}
                  onClick={() => handleCategoryClick(cat.key)}
                  count={countByCategory[cat.key] ?? 0}
                />
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Section 2: Featured Documents ─────────────────────────────────── */}
      {(loading || featuredResources.length > 0) && (
        <AnimatedSection animation="slide-up" delay={60}>
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium">
                  <Star className="w-4 h-4" />
                  Featured Documents
                </div>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                  <div className="divide-y divide-gray-50">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="px-5 py-4 flex items-center gap-4 animate-pulse"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-100 rounded w-3/4" />
                          <div className="h-3 bg-gray-100 rounded w-1/3" />
                        </div>
                        <div className="h-8 w-24 bg-gray-100 rounded-lg hidden sm:block" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {featuredResources.map((r) => (
                      <FeaturedRow key={r.id} resource={r} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* ── Section 3: Resource Library ────────────────────────────────────── */}
      <AnimatedSection animation="slide-up" delay={80}>
        <section
          ref={libraryRef}
          className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/40 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                  <BookOpen className="w-4 h-4" />
                  Resource Library
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2f3e2f]">
                  All Resources
                </h2>
              </div>
              {!loading && (
                <p className="text-sm text-gray-400 flex-shrink-0 pb-1">
                  {filteredResources.length} of {resources.length}{" "}
                  {resources.length === 1 ? "resource" : "resources"}
                </p>
              )}
            </div>

            {/* Search + Filters row */}
            {!loading && resources.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search resources…"
                    className="w-full pl-10 pr-9 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-[#2f3e2f] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2d5a2d]/25 focus:border-[#2d5a2d] transition-all shadow-sm"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Category filter */}
                <div className="relative">
                  <select
                    value={activeCategory ?? "all"}
                    onChange={(e) =>
                      setActiveCategory(
                        e.target.value === "all" ? null : e.target.value,
                      )
                    }
                    className="appearance-none w-full sm:w-48 pl-3.5 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-[#2f3e2f] focus:outline-none focus:ring-2 focus:ring-[#2d5a2d]/25 focus:border-[#2d5a2d] transition-all shadow-sm cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.key}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Year filter */}
                {availableYears.length > 1 && (
                  <div className="relative">
                    <select
                      value={yearFilter}
                      onChange={(e) => setYearFilter(e.target.value)}
                      className="appearance-none w-full sm:w-32 pl-3.5 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-[#2f3e2f] focus:outline-none focus:ring-2 focus:ring-[#2d5a2d]/25 focus:border-[#2d5a2d] transition-all shadow-sm cursor-pointer"
                    >
                      <option value="all">All Years</option>
                      {availableYears.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                )}

                {/* Sort */}
                <div className="relative">
                  <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none w-full sm:w-40 pl-8 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-[#2f3e2f] focus:outline-none focus:ring-2 focus:ring-[#2d5a2d]/25 focus:border-[#2d5a2d] transition-all shadow-sm cursor-pointer"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            )}

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="text-xs text-gray-400 font-medium">
                  Active filters:
                </span>
                {activeCategory && (
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#2d5a2d]/10 text-[#2d5a2d] text-xs font-semibold rounded-full hover:bg-[#2d5a2d]/20 transition-colors"
                  >
                    {activeCategory}
                    <X className="w-3 h-3" />
                  </button>
                )}
                {yearFilter !== "all" && (
                  <button
                    onClick={() => setYearFilter("all")}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#2d5a2d]/10 text-[#2d5a2d] text-xs font-semibold rounded-full hover:bg-[#2d5a2d]/20 transition-colors"
                  >
                    {yearFilter}
                    <X className="w-3 h-3" />
                  </button>
                )}
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#2d5a2d]/10 text-[#2d5a2d] text-xs font-semibold rounded-full hover:bg-[#2d5a2d]/20 transition-colors"
                  >
                    &ldquo;{query}&rdquo;
                    <X className="w-3 h-3" />
                  </button>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-gray-400 hover:text-gray-600 font-medium underline underline-offset-2 transition-colors ml-1"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Results table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Column headers — desktop only */}
              {!loading && filteredResources.length > 0 && (
                <div className="hidden lg:flex items-center gap-4 px-5 py-3 border-b border-gray-100 bg-gray-50/60">
                  <div className="w-9 flex-shrink-0" />
                  <p className="flex-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Title
                  </p>
                  <p className="w-48 text-xs font-bold text-gray-400 uppercase tracking-wider flex-shrink-0">
                    Category
                  </p>
                  <p className="w-32 text-xs font-bold text-gray-400 uppercase tracking-wider flex-shrink-0 hidden lg:block">
                    Description
                  </p>
                  <p className="w-12 text-xs font-bold text-gray-400 uppercase tracking-wider flex-shrink-0">
                    Year
                  </p>
                  <div className="w-24 flex-shrink-0" />
                </div>
              )}

              {loading ? (
                <div>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <RowSkeleton key={i} />
                  ))}
                </div>
              ) : filteredResources.length === 0 ? (
                <EmptyLibrary hasQuery={hasActiveFilters} />
              ) : (
                <div>
                  {filteredResources.map((r) => (
                    <LibraryRow key={r.id} resource={r} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── Section 4: Request a Resource ─────────────────────────────────── */}
      <AnimatedSection animation="fade" delay={60}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f2010] relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full border border-white/5 pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-5 h-5 text-white/80" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Need Additional Information?
            </h2>
            <p className="text-white/65 leading-relaxed mb-10 max-w-xl mx-auto">
              If you require specific technical documents, institutional
              materials, partnership briefs, or datasets not publicly listed,
              please contact the Centre.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:tcoefs@unijos.edu.ng"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#f4c542] hover:bg-[#e0b33a] text-[#0f2010] font-bold text-sm rounded-xl transition-colors duration-200 shadow-sm hover:shadow w-full sm:w-auto justify-center"
              >
                <Mail className="w-4 h-4" />
                Request a Resource
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm rounded-xl border border-white/20 transition-colors duration-200 w-full sm:w-auto justify-center"
              >
                Contact the Centre
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  );
}
