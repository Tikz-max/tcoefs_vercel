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
import fs from "node:fs/promises";
import path from "node:path";

export default async function Home() {
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
    <div className="min-h-screen bg-white">
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
