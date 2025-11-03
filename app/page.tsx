import { Navbar } from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import NewsSection from "@/components/news-section";
import PillarsSection from "@/components/pillars-section";
import HomeNewsSection from "@/components/home-news-section";
import ResearchAreasSection from "@/components/research-areas-section";
import { Footer } from "@/components/footer";
import FAQSection from "@/components/faq-section";
import SpotlightsSection from "@/components/spotlights-section";
import { AnimatedSection } from "@/components/animated-section";
import PartnersMarquee from "@/components/partners/partners-marquee";
import { createClient } from "@/lib/supabase/server";
import fs from "node:fs/promises";
import path from "node:path";

export default async function Home() {
  // Load upcoming event from Supabase
  const supabase = await createClient();
  let upcomingEvent: any = null;

  try {
    const { data } = await supabase
      .from("upcoming_event")
      .select("*")
      .eq("is_active", true)
      .single();

    upcomingEvent = data;
  } catch (error) {
    console.error("Error fetching upcoming event:", error);
  }

  // Load latest news items on the server and pass to HomeNewsSection
  let homeNewsItems: any[] = [];
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), "public", "news", "news.generated.json"),
      "utf8",
    );
    const data = JSON.parse(file);
    if (Array.isArray(data)) {
      const isSupported = (src?: string) =>
        typeof src === "string" && /\.(png|jpe?g|gif|webp|svg)$/i.test(src);

      const normalized = data.map((d: any) => {
        let hero = "";
        if (isSupported(d?.image)) {
          hero = d.image;
        } else if (Array.isArray(d?.images)) {
          const first = d.images.find((s: string) => isSupported(s));
          if (first) hero = first;
        }
        const category =
          d?.slug === "news-report"
            ? "Research"
            : d?.slug === "news-update"
              ? "Partnership"
              : d?.category || "News";
        const title =
          d?.slug === "news-report"
            ? "International Lecture: Using Genetics to Meet the Food Demand of 2050"
            : d?.slug === "news-update"
              ? "SAA and GIZ Partner with TCoEFS to Drive Institutional Innovation in Food Security"
              : d?.title || "Untitled";
        const image =
          d?.slug === "news-report"
            ? "/news/Genetics 2050/img1.png"
            : d?.slug === "news-update"
              ? "/news/saa-giz/images/meeting.png"
              : hero || "/news-collage.png";

        return {
          id: d.id,
          category,
          title,
          slug: d.slug || "",
          excerpt: d.excerpt || "",
          date: d.date || "",
          image,
        };
      });

      homeNewsItems = normalized
        .filter((n) => n.date)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);
    }
  } catch {}

  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <Navbar />
      <HeroSection />
      <AnimatedSection animation="slide-right">
        <AboutSection />
      </AnimatedSection>
      <AnimatedSection animation="fade" delay={100}>
        <NewsSection />
      </AnimatedSection>
      <AnimatedSection animation="slide-left" delay={150}>
        <ResearchAreasSection />
      </AnimatedSection>
      <AnimatedSection animation="slide-up" delay={200}>
        <PillarsSection />
      </AnimatedSection>
      <AnimatedSection animation="fade" delay={100}>
        <HomeNewsSection items={homeNewsItems} />
      </AnimatedSection>

      <AnimatedSection animation="fade" delay={100}>
        <SpotlightsSection />
      </AnimatedSection>

      {/* Upcoming Event Section - No title */}
      {upcomingEvent && (
        <AnimatedSection animation="fade" delay={100}>
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex justify-end">
              <div className="w-full max-w-sm">
                <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-[#2f3e2f] mb-4">
                    Upcoming Event
                  </h3>
                  <h4 className="text-xl font-bold text-[#2f3e2f] mb-3">
                    {upcomingEvent.title}
                  </h4>
                  <p className="text-sm text-[#4a5b4a] mb-2">
                    {upcomingEvent.date_range}
                  </p>
                  <p className="text-sm text-[#4a5b4a] mb-4">
                    {upcomingEvent.location}
                  </p>
                  <a
                    href={
                      upcomingEvent.link || "https://blog.tcoefs-unijos.org"
                    }
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
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      <AnimatedSection animation="fade" delay={100}>
        <PartnersMarquee />
      </AnimatedSection>
      <AnimatedSection animation="fade" delay={100}>
        <FAQSection />
      </AnimatedSection>
      <Footer />
    </div>
  );
}
