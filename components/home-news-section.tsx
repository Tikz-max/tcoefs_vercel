"use client";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const fallbackNews = [
  {
    id: 1,
    category: "News",
    title:
      "Leadership Transition: Prof. Dauda Bawa Appointed as New TCoEFS Director",
    excerpt:
      "Outgoing Director, Prof. Amaza, handing over leadership to the newly appointed Director of the TCoEFS, Prof. Dauda Bawa.",
    date: "June 15, 2025",
    readTime: "4 min read",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-V4yLKzwoksrHW9uwr7of9Sj9e41LtL.png",
    featured: true,
  },
];

export default function HomeNewsSection({
  items: serverItems,
}: {
  items?: any[];
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const hasServerItems = Array.isArray(serverItems) && serverItems.length > 0;
  const [items, setItems] = useState<any[]>(
    hasServerItems ? serverItems : fallbackNews,
  );
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length);
    }, 12000);
    return () => clearInterval(timer);
  }, [items.length]);

  useEffect(() => {
    if (hasServerItems) return;
    const load = async () => {
      try {
        const res = await fetch("/news/news.generated.json", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
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
          const sorted = normalized
            .filter((n) => n.date)
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            );
          const latest = sorted.slice(0, 3);
          if (latest.length) setItems(latest);
        }
      } catch {
        // ignore and keep fallback
      }
    };
    load();
  }, [hasServerItems]);

  const nextSlide = () => {
    if (items.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    if (items.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <section className="py-16 px-5 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2f3e2f] mb-4">
            Latest News
          </h2>
          <p className="text-lg text-[#4a5b4a] max-w-2xl mx-auto">
            Stay updated with our latest developments, partnerships, and impact
            stories
          </p>
        </div>

        <div className="relative mb-12">
          <div
            className="overflow-hidden rounded-xl"
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchMove={(e) => {
              if (touchStartX !== null) {
                setTouchDeltaX(e.touches[0].clientX - touchStartX);
              }
            }}
            onTouchEnd={() => {
              const threshold = 50;
              if (touchDeltaX <= -threshold) nextSlide();
              if (touchDeltaX >= threshold) prevSlide();
              setTouchStartX(null);
              setTouchDeltaX(0);
            }}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {items.map((news) => (
                <div key={news.id} className="w-full flex-shrink-0">
                  <Link
                    href={`/news-events?expand=${news.id}`}
                    className="group block"
                  >
                    <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-[#5a7c65]/30 mx-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        <div className="relative h-64 md:h-80 overflow-hidden">
                          <Image
                            src={news.image || "/news-collage.png"}
                            alt={news.title}
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-[#2d5a2d] text-white px-3 py-1 rounded-full text-sm font-medium">
                              {news.category}
                            </span>
                          </div>
                        </div>

                        <div className="p-6 flex flex-col justify-center">
                          <div className="flex items-center text-[#4a5b4a] text-sm mb-3">
                            <Calendar className="w-4 h-4 mr-2" />
                            {news.date}
                          </div>

                          <h3 className="text-xl md:text-2xl font-bold text-[#2f3e2f] mb-4 group-hover:text-[#2d5a2d] transition-colors">
                            {news.title}
                          </h3>

                          <p className="text-[#4a5b4a] leading-relaxed mb-6">
                            {news.excerpt}
                          </p>

                          <div className="flex items-center text-[#2d5a2d] font-medium group-hover:text-[#1e4a1e] transition-colors">
                            <span>Read More</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="hidden md:block absolute left-3 bottom-4 md:left-4 md:top-1/2 md:-translate-y-1/2 md:bottom-auto bg-white/80 backdrop-blur-sm border border-white/20 rounded-full p-1.5 md:p-2 hover:bg-white transition-all shadow-lg"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-[#2d5a2d]" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:block absolute right-3 bottom-4 md:right-4 md:top-1/2 md:-translate-y-1/2 md:bottom-auto bg-white/80 backdrop-blur-sm border border-white/20 rounded-full p-1.5 md:p-2 hover:bg-white transition-all shadow-lg"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#2d5a2d]" />
          </button>
        </div>

        <div className="text-center">
          <Link
            href="/news-events"
            className="inline-flex items-center bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] text-white px-8 py-3 rounded-lg font-medium hover:from-[#1e4a1e] hover:to-[#2d5a2d] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All News
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
