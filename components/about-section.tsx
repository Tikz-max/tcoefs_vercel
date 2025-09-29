import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/ui/card";
import { Leaf, Globe2, Users, BookOpen } from "lucide-react";
import CounterSection from "@/components/counter-section";

export default function AboutSection() {
  const features = [
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "Promoting environmentally responsible practices and solutions for long-term ecosystem health.",
    },
    {
      icon: Globe2,
      title: "Innovation",
      description:
        "Pioneering cutting-edge research and technologies to address global challenges.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "Building partnerships across institutions, communities, and disciplines for greater impact.",
    },
    {
      icon: BookOpen,
      title: "Knowledge",
      description:
        "Advancing scientific understanding and sharing knowledge for societal benefit.",
    },
  ];

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: Intro */}
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
                About TCoFES
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] mb-6 leading-tight">
                Pioneering Research for a{" "}
                <span className="text-[#2d5a2d]">Sustainable Future</span>
              </h2>

              <p className="text-[#4a5b4a] text-lg leading-relaxed mb-4">
                Established as a leading research institution, TCoFES brings
                together world-class researchers, innovative technologies, and
                strategic partnerships to address Africa&apos;s most pressing
                challenges in food security, environmental sustainability, and
                climate resilience.
              </p>

              <p className="text-[#4a5b4a] leading-relaxed mb-8">
                Our multidisciplinary approach combines cutting-edge science
                with practical solutions, ensuring our research translates into
                real-world impact for communities across the continent.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about">
                  <Button className="text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] hover:from-[#1e4a1e] hover:to-[#2d5a2d] shadow-lg hover:shadow-xl">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: 2x2 Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((f, idx) => {
                const Icon = f.icon;
                return (
                  <Card
                    key={idx}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#2d5a2d]/10 text-[#2d5a2d] mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-[#2f3e2f] mb-2">
                        {f.title}
                      </h3>
                      <p className="text-sm text-[#4a5b4a] leading-relaxed">
                        {f.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <CounterSection />
    </>
  );
}
