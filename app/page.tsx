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
import ProgrammesPreviewSection from "@/components/programmes-preview-section";
import NewsletterSection from "@/components/newsletter-section";

export default async function Home() {
  // Load latest news items from blog API
  let homeNewsItems: any[] = [];
  try {
    const res = await fetch("https://blog.tcoefs-unijos.org/api/latest-news", {
      cache: "no-store",
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.articles)) {
        homeNewsItems = data.articles.map((article: any) => ({
          id: article.id,
          category: article.category || "News",
          title: article.title,
          excerpt: article.excerpt || "",
          date: article.date || "",
          image: article.image || "/news-collage.png",
          readTime: article.readTime || "5 min read",
          url: article.url,
        }));
      }
    }
  } catch (error) {
    console.error("Error fetching latest news:", error);
  }

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
      <AnimatedSection animation="slide-up" delay={100}>
        <ProgrammesPreviewSection />
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
        <NewsletterSection />
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
