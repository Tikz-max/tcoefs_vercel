"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Search, Calendar, Clock, ArrowRight, X } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const NewsEventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [externalNews, setExternalNews] = useState<any[]>([]);
  const [eventOpen, setEventOpen] = useState(false);

  const searchParams = useSearchParams();

  const categories = [
    "All",
    "News",
    "Research",
    "Partnership",
    "Training",
    "Policy",
  ];

  const newsItems = [
    {
      id: 1,
      category: "News",
      title:
        "Leadership Transition: Prof. Dauda Bawa Appointed as New TCoEFS Director",
      excerpt:
        "Outgoing Director, Prof. Amaza, handing over leadership to the newly appointed Director of the TCoEFS, Prof. Dauda Bawa.",
      date: "June 15, 2025",
      readTime: "4 min read",
      image: "/news/leadership-card.png",
      featured: true,
      fullContent: `
        <div class="space-y-4">
          <img src="/news/leadership-portrait.png" alt="Prof. Dauda Bawa" class="w-32 h-32 rounded-lg object-cover float-right ml-4 mb-4" />
          <p>In a significant leadership development, Prof. Tanko Ishaya, the Vice Chancellor of the University of Jos, has appointed Prof. Dauda Bawa as the new Director of TCoEFS. Prof. Bawa, a distinguished academic in Agricultural Extension and Rural Development, takes the helm at a critical juncture for the Centre.</p>

          <p>With over two decades of experience in rural development and agricultural technology, his leadership will guide TCoEFS in expanding its institutional partnerships and advancing innovative, climate-resilient agricultural practices across Nigeria.</p>

          <p>The formal handover ceremony marked a significant milestone for the Centre, with Prof. Amaza officially transferring leadership responsibilities to Prof. Bawa. The transition represents continuity in TCoEFS's mission while bringing fresh perspectives and expertise to drive the Centre's strategic objectives forward.</p>

          <p>Prof. Bawa's extensive background in agricultural extension and rural development positions him well to lead TCoEFS through its next phase of growth and impact. His appointment comes at a time when the Centre is expanding its research portfolio and strengthening partnerships with international development organizations to address food security challenges across West Africa.</p>
        </div>
      `,
    },

    {
      id: 3,
      category: "Research",
      title: "Climate-Smart Agriculture Research Initiative Launched",
      excerpt:
        "TCoEFS announces groundbreaking research program focusing on drought-resistant crop varieties and sustainable farming practices.",
      date: "August 10, 2025",
      readTime: "5 min read",
      image: "/agricultural-research-lab.png",
      featured: false,
      fullContent: `
        <div class="space-y-4">
          <p>TCoEFS has launched a comprehensive climate-smart agriculture research initiative aimed at developing innovative solutions for Nigeria's agricultural challenges. This multi-year program focuses on creating drought-resistant crop varieties and promoting sustainable farming practices across West Africa.</p>
          <p>The research initiative brings together leading agricultural scientists, farmers, and policy makers to address the growing impact of climate change on food security. Through collaborative efforts, the program aims to develop practical solutions that can be implemented at the grassroots level.</p>
        </div>
      `,
    },
  ];

  // Fetch news generated from .docx (if present) and merge with existing items
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/news/news.generated.json", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data)) {
          setExternalNews(
            data.map((d: any, idx: number) => {
              const isSupported = (src?: string) =>
                typeof src === "string" &&
                /\.(png|jpe?g|gif|webp|svg)$/i.test(src);
              // Choose first supported image (skip EMF) as hero
              let hero = "";
              if (isSupported(d?.image)) {
                hero = d.image;
              } else if (Array.isArray(d?.images)) {
                const firstSupported = d.images.find((s: string) =>
                  isSupported(s),
                );
                if (firstSupported) hero = firstSupported;
              }
              // Strip EMF <img> tags from HTML content
              const cleaned = String(d?.fullContent ?? "").replace(
                /<img[^>]+(?:\.emf|\.x-emf)[^>]*>/gi,
                "",
              );
              return {
                id: d.id ?? 2000 + idx,
                category:
                  d.slug === "news-report"
                    ? "Research"
                    : d.slug === "news-update"
                      ? "Partnership"
                      : (d.category ?? "News"),
                title:
                  d.slug === "news-report"
                    ? "International Lecture: Using Genetics to Meet the Food Demand of 2050"
                    : d.slug === "news-update"
                      ? "SAA and GIZ Partner with TCoEFS to Drive Institutional Innovation in Food Security"
                      : (d.title ?? "Untitled"),
                slug: d.slug ?? "",
                excerpt: d.excerpt ?? "",
                date: d.date ?? "",
                readTime: d.readTime ?? "",
                image:
                  d.slug === "news-report"
                    ? "/news/Genetics 2050/img1.png"
                    : hero ||
                      (d.slug === "news-update"
                        ? "/news/saa-giz/images/meeting.png"
                        : "/news-collage.png"),
                featured: d.featured ?? true,
                fullContent:
                  d.slug === "news-report"
                    ? `<div class="space-y-4">
            <h2 class="text-2xl font-bold">International Lecture: Using Genetics to Meet the Food Demand of 2050</h2>
            <p><strong>Date:</strong> April 4, 2025<br/><strong>Venue:</strong> Aliyu Akwe Doma Indoor Theatre, Naraguta Campus, University of Jos</p>
            <p>The TETFUND Centre of Excellence in Food Security (TCoEFS), University of Jos, in collaboration with the Faculty of Agriculture, University of Jos, hosted a landmark international lecture on “Using Genetics to Meet the Food Demand of 2050.”</p>
            <img src="/news/Genetics 2050/img1.png" alt="International Lecture audience" class="w-full rounded-lg my-6" />
            <p>The keynote speaker, Dr. Bob Weaber, Professor of Animal Science and Extension Specialist at Kansas State University, delivered a thought-provoking lecture that examined the potential of genetics and genomic technologies in addressing global food security challenges. The lecture also featured Dr. Martin Sieber, President and CEO of the US Livestock Genetic Export (USLGE), a key partner institution.</p>
            <p>The event attracted a wide range of participants, including university leadership, academics, researchers, postgraduate students, industry stakeholders, policymakers, and development partners.</p>
            <h3 class="text-xl font-semibold mt-6">Participation Overview</h3>
            <ul>
              <li>Physical Attendance: 311 participants</li>
              <li>Virtual Attendance: 41 participants</li>
            </ul>
            <p>This hybrid format enabled broad engagement, bringing together diverse stakeholders in food systems, animal breeding, and agricultural policy.</p>
            <h3 class="text-xl font-semibold mt-6">Lecture Highlights</h3>
            <p>Dr. Weaber stressed that with the world’s population projected to surpass 9.7 billion by 2050, achieving food security will require science-led approaches. He argued that animal genetics and genomic innovations must become central pillars in global strategies to ensure sustainable and resilient food systems.</p>
            <p>Key themes from the lecture included:</p>
            <ul>
              <li>Genetic selection for livestock breeds adaptable to diverse and changing environments.</li>
              <li>Enhancing reproductive efficiency, feed conversion ratios, and disease resistance.</li>
              <li>Deploying strategies to reduce greenhouse gas emission intensity in livestock systems.</li>
              <li>Building climate-resilient, economically efficient livestock systems that balance productivity with sustainability.</li>
            </ul>
            <p>According to Dr. Weaber, advancing breeding technologies and scaling their adoption in African livestock systems will be critical to safeguarding future food security. He described genetics as a “cornerstone for the sustainability of meat and dairy production in the coming decades.”</p>
            <h3 class="text-xl font-semibold mt-6">Policy and Research Recommendations</h3>
            <p>Dr. Weaber presented a practical roadmap for integrating genetics into African food and livestock systems. Recommendations included:</p>
            <ol>
              <li>Developing national breeding schemes adapted to local ecosystems and farming realities.</li>
              <li>Establishing comprehensive animal performance databases to inform decision-making.</li>
              <li>Expanding crossbreeding and genomic selection programmes to improve resilience and productivity.</li>
              <li>Training extension personnel and researchers in modern genetic tools and methodologies.</li>
              <li>Building commercial-scale farms as anchors for research uptake, innovation diffusion, and farmer adoption.</li>
            </ol>
            <p>These recommendations provide actionable strategies for governments, universities, and industry actors in designing and implementing policies that align with global sustainability goals.</p>
            <h3 class="text-xl font-semibold mt-6">Institutional Engagement</h3>
            <p>The lecture was attended by the Vice-Chancellor, Prof. Tanko Ishaya, Deputy Vice-Chancellors (Academics and Administration), the Dean, Faculty of Agriculture, as well as visiting lecturers and other dignitaries. Their presence underscored the University’s commitment to championing cutting-edge research, innovation, and capacity development.</p>
            <h3 class="text-xl font-semibold mt-6">Courtesy Visit to Plateau State Governor</h3>
            <p>As part of activities surrounding the lecture, the Director of TCoEFS, Prof. Dauda Bawa, led a delegation including Dr. Bob Weaber and Dr. Martin Sieber on a courtesy visit to the Governor of Plateau State, His Excellency Barr. Caleb Mutfwang.</p>
            <p>The visit emphasized the importance of building synergies between academia, government, and international partners in shaping agricultural innovation and policy. The Governor expressed appreciation for the initiative and reiterated Plateau State’s commitment to supporting programmes that enhance food security, improve farmer livelihoods, and strengthen resilience against climate change.</p>
            <h3 class="text-xl font-semibold mt-6">Significance of the Lecture</h3>
            <p>This international lecture forms part of TCoEFS’s broader mission to:</p>
            <ul>
              <li>Promote knowledge-sharing through global partnerships.</li>
              <li>Build capacity for research and innovation in food security.</li>
              <li>Provide evidence-based policy insights to support Nigeria’s agricultural transformation.</li>
              <li>Position the University of Jos as a hub for cutting-edge agricultural research and practice.</li>
            </ul>
            <p>By convening international experts, national stakeholders, and policymakers, the Centre reaffirmed its role as a key driver of Nigeria’s response to food and nutrition security challenges.</p>
            <h3 class="text-xl font-semibold mt-6">Conclusion</h3>
            <p>The lecture on “Using Genetics to Meet the Food Demand of 2050” provided critical insights into the future of food systems and highlighted the transformative role of genetics in building sustainable, resilient, and inclusive agriculture.</p>
            <p>The event not only strengthened the Centre’s academic and policy profile but also laid the foundation for deeper collaborations with global partners. Going forward, TCoEFS will continue to engage stakeholders in translating scientific research into tangible outcomes for farmers, communities, and the broader agricultural economy.</p>
            <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <img src="/news/Genetics 2050/img2.png" alt="Genetics 2050 Image 2" class="w-full rounded-lg" />
              <img src="/news/Genetics 2050/img3.png" alt="Genetics 2050 Image 3" class="w-full rounded-lg" />
              <img src="/news/Genetics 2050/img4.png" alt="Genetics 2050 Image 4" class="w-full rounded-lg" />
              <img src="/news/Genetics 2050/img5.png" alt="Genetics 2050 Image 5" class="w-full rounded-lg" />
            </div>
          </div>`
                    : cleaned,
              };
            }),
          );
        }
      } catch {
        // ignore fetch/parse errors and continue with built-in items
      }
    };
    load();
  }, []);

  // Expand a specific news item via query param
  useEffect(() => {
    const expandId = searchParams.get("expand");
    if (expandId) {
      const all = [...newsItems, ...externalNews];
      const newsItem = all.find(
        (item) => item.id === Number.parseInt(expandId),
      );
      if (newsItem) {
        setSelectedNews(newsItem);
      }
    }
  }, [searchParams.get("expand"), externalNews]); // Re-run when external news arrives

  const allNews = [...newsItems, ...externalNews];
  const filteredNews = allNews
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .filter(
      (item) =>
        item.title !==
        "TCoEFS Leads Discussion on Agricultural Education Reform at Senate Stakeholder Session",
    );

  const featuredNews = filteredNews.filter((item) => item.featured);

  const openNewsModal = (newsItem: any) => {
    setSelectedNews(newsItem);
  };

  const closeNewsModal = () => {
    setSelectedNews(null);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9fa" }}>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-white via-green-50/30 to-green-100/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                  style={{ color: "#4a5b4a" }}
                />
                <input
                  type="text"
                  placeholder="Search news and updates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30 transition-all"
                />
              </div>
            </div>

            <div className="text-center max-w-4xl mx-auto">
              <h1
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ color: "#2f3e2f" }}
              >
                News Updates
              </h1>
              <p
                className="text-lg leading-relaxed mb-6"
                style={{ color: "#4a5b4a" }}
              >
                Stay informed about TCoEFS research breakthroughs, partnerships,
                policy developments, and initiatives shaping the future of food
                security in Nigeria and beyond.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "text-white shadow-lg"
                    : "bg-white/70 backdrop-blur-sm border border-gray-200 hover:border-green-300 transition-colors"
                }`}
                style={
                  selectedCategory === category
                    ? {
                        background:
                          "linear-gradient(135deg, #2d5a2d 0%, #4a5b4a 100%)",
                      }
                    : { color: "#4a5b4a" }
                }
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mb-12">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "#2f3e2f" }}
            >
              News <span style={{ color: "#2d5a2d" }}>Updates</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredNews.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => openNewsModal(item)}
                    className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  >
                    <div className="relative aspect-video bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                      <Image
                        src={item.image || "/news-collage.png"}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                          style={{
                            background:
                              "linear-gradient(135deg, #2d5a2d 0%, #4a5b4a 100%)",
                          }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <h3
                        className="text-xl font-bold mb-3 group-hover:text-green-700 transition-colors"
                        style={{ color: "#2f3e2f" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: "#4a5b4a" }}
                      >
                        {item.excerpt}
                      </p>
                      <div
                        className="flex items-center justify-between text-xs"
                        style={{ color: "#4a5b4a" }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {item.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.readTime}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="space-y-6 block lg:sticky lg:top-8">
                <button
                  onClick={() => setEventOpen(true)}
                  className="w-full text-left bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-8 shadow-lg hover:shadow-xl transition"
                >
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: "#2f3e2f" }}
                  >
                    Upcoming <span style={{ color: "#2d5a2d" }}>Event</span>
                  </h3>
                  <p
                    className="font-semibold mb-1"
                    style={{ color: "#2f3e2f" }}
                  >
                    Three-Day Capacity-Building Training Workshop
                  </p>
                  <p className="text-sm mb-1" style={{ color: "#4a5b4a" }}>
                    22nd – 24th September 2025
                  </p>
                  <p className="text-sm mb-4" style={{ color: "#4a5b4a" }}>
                    Miango Rest Home, Jos, Plateau State
                  </p>
                  <span
                    className="inline-flex items-center text-sm font-medium"
                    style={{ color: "#2d5a2d" }}
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
                  </span>
                </button>
                <div className="bg-gradient-to-br from-green-50/80 to-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-8 shadow-lg text-center">
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: "#2f3e2f" }}
                  >
                    Stay <span style={{ color: "#2d5a2d" }}>Connected</span>
                  </h3>
                  <p className="text-sm mb-6" style={{ color: "#4a5b4a" }}>
                    Subscribe to our newsletter for the latest research updates
                    and announcements.
                  </p>
                  <div className="flex flex-col gap-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="px-4 py-3 border border-gray-200 rounded-lg bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30 transition-all"
                    />
                    <button
                      className="px-6 py-3 text-white font-medium rounded-lg transition-all hover:shadow-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, #2d5a2d 0%, #4a5b4a 100%)",
                      }}
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </aside>
            </div>

            {/* Removed Events section */}

            {/* Removed duplicate sidebar */}
          </div>
        </div>
      </main>

      {selectedNews && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #2d5a2d 0%, #4a5b4a 100%)",
                  }}
                >
                  {selectedNews.category}
                </span>
                <div
                  className="flex items-center gap-4 text-xs"
                  style={{ color: "#4a5b4a" }}
                >
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {selectedNews.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {selectedNews.readTime}
                  </div>
                </div>
              </div>
              <button
                onClick={closeNewsModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" style={{ color: "#4a5b4a" }} />
              </button>
            </div>
            <div className="p-6">
              <h1
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ color: "#2f3e2f" }}
              >
                {selectedNews.title}
              </h1>
              <div
                className="prose prose-lg max-w-none leading-relaxed"
                style={{ color: "#4a5b4a" }}
                dangerouslySetInnerHTML={{
                  __html:
                    (selectedNews as any)?.slug === "news-update"
                      ? (() => {
                          const html = String(selectedNews.fullContent || "");
                          const midImg =
                            '<img src="/news/saa-giz/images/meeting.png" alt="SAA & GIZ roundtable at TCoEFS" class="w-full rounded-lg my-6" />';
                          const endImg =
                            '<img src="/news/saa-giz/images/group.png" alt="SAA & GIZ and TCoEFS team group photo" class="w-full rounded-lg my-6" />';
                          const idx = html.indexOf("</p>");
                          const withMid =
                            idx === -1
                              ? html + midImg
                              : html.slice(0, idx + 4) +
                                midImg +
                                html.slice(idx + 4);
                          return withMid + endImg;
                        })()
                      : selectedNews.fullContent,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {eventOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold" style={{ color: "#2f3e2f" }}>
                Upcoming Event
              </h3>
              <button
                onClick={() => setEventOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6" style={{ color: "#4a5b4a" }}>
              <div className="mb-4">
                <img
                  src="/three_day_capacity_building.jpeg"
                  alt="Three-Day Capacity-Building Training Workshop flyer"
                  className="w-full h-auto rounded-lg"
                  onError={(e) => {
                    const t = e.currentTarget;
                    if (t.src.endsWith("/events/capacity-building-flyer.jpg")) {
                      t.src = "/events/capacity-building-flyer.png";
                    }
                  }}
                />
              </div>
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "#2f3e2f" }}
              >
                Three-Day Capacity-Building Training Workshop
              </h2>
              <p className="mb-2">
                <strong>Date:</strong> 22nd – 24th September 2025
              </p>
              <p className="mb-4">
                <strong>Venue:</strong> Miango Rest Home, Jos, Plateau State
              </p>
              <p className="mb-6">
                The Centre will host a three-day training workshop for staff and
                stakeholders aimed at strengthening institutional capacity,
                fostering innovation, and laying strategies for long-term
                sustainability.
              </p>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#2f3e2f" }}
              >
                Programme Focus
              </h3>
              <ul className="list-disc pl-5 mb-6">
                <li>Foundations of Centre-Based Excellence.</li>
                <li>
                  Academic–Industry Collaboration and Innovation Pathways.
                </li>
                <li>
                  Practical Sessions on Sustainability and Implementation
                  Planning.
                </li>
              </ul>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#2f3e2f" }}
              >
                Distinguished Speakers
              </h3>
              <ul className="list-disc pl-5">
                <li>
                  Prof. Tanko Ishaya, Vice-Chancellor, University of Jos (Chief
                  Host)
                </li>
                <li>
                  Prof. Olukayode Akinyemi, Deputy Vice-Chancellor (Academics),
                  Federal University of Agriculture, Abeokuta (Trainer)
                </li>
                <li>Prof. Dauda Bawa, Director, TCoEFS (Host)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default NewsEventsPage;
