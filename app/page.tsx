import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Hero from "@/components/home/hero";
import PartnersStrip from "@/components/home/partners-strip";
import About from "@/components/home/about";
import Programmes from "@/components/home/programmes";
import Film from "@/components/home/film";
import Research from "@/components/home/research";
import Pillars from "@/components/home/pillars";
import Spotlights from "@/components/home/spotlights";
import News, { type NewsItem } from "@/components/home/news";
import Bulletin from "@/components/home/bulletin";
import Faq from "@/components/home/faq";

async function getLatestNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch("https://blog.tcoefs-unijos.org/api/latest-news", {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.success || !Array.isArray(data.articles)) return [];
    return data.articles.map((article: any) => ({
      id: article.id,
      category: article.category || "News",
      title: article.title,
      excerpt: article.excerpt || "",
      date: article.date || "",
      image: article.image || "/hero/compressed/2.jpg",
      readTime: article.readTime || "5 min read",
      url: article.url,
    }));
  } catch (error) {
    console.error("Error fetching latest news:", error);
    return [];
  }
}

export default async function Home() {
  const news = await getLatestNews();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PartnersStrip />
        <About />
        <Programmes />
        <Film />
        <Research />
        <Pillars />
        <Spotlights />
        <News items={news} />
        <Bulletin />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
