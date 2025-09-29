"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/ui/card";
import { Wheat, TreePine, Droplets, Lightbulb, ArrowRight } from "lucide-react";

type Area = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;

  colorClass: string;
};

const researchAreas: Area[] = [
  {
    icon: Wheat,
    title: "Food Systems & Security",
    description:
      "Developing sustainable agricultural practices, improving crop yields, and ensuring food security across African communities.",

    colorClass: "bg-[#2d5a2d]/10 text-[#2d5a2d]",
  },
  {
    icon: TreePine,
    title: "Environmental Conservation",
    description:
      "Protecting biodiversity, restoring ecosystems, and promoting sustainable land management practices.",

    colorClass: "bg-[#5a7c65]/10 text-[#2f3e2f]",
  },
  {
    icon: Droplets,
    title: "Climate Change Adaptation",
    description:
      "Researching climate resilience strategies, water management, and climate-smart agricultural solutions.",

    colorClass: "bg-[#4a5b4a]/10 text-[#2f3e2f]",
  },
  {
    icon: Lightbulb,
    title: "Agricultural Innovation",
    description:
      "Advancing agricultural technologies, precision farming, and sustainable production methods.",

    colorClass: "bg-[#f4c542]/10 text-[#2f3e2f]",
  },
];

export default function ResearchAreasSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-10">
          {/* Left: Cards (3 in first row, 1 wide below) */}
          <div className="order-2 lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {researchAreas.map((area, idx) => {
                const Icon = area.icon;
                const isWide = idx === 3; // last card spans full width under the three
                return (
                  <Card
                    key={area.title}
                    className={`group bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#5a7c65]/30 ${isWide ? "md:col-span-3" : ""}`}
                  >
                    <CardContent className="p-6 h-full flex flex-col">
                      <div
                        className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 ${area.colorClass}`}
                      >
                        <Icon className="h-7 w-7" />
                      </div>

                      <h3 className="text-lg font-semibold text-[#2f3e2f] mb-2">
                        {area.title}
                      </h3>

                      <p className="text-sm text-[#4a5b4a] leading-relaxed mb-4 flex-1">
                        {area.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right: Text + CTA */}
          <div className="order-1 lg:col-span-5 flex flex-col justify-center items-center lg:items-start">
            <div className="mb-6 text-center lg:text-left">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium">
                Research & Programs
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2f3e2f] mb-4 text-center lg:text-left">
              Our Research <span className="text-[#2d5a2d]">Focus Areas</span>
            </h2>
            <p className="text-lg text-[#4a5b4a] leading-relaxed mb-8 max-w-prose text-center lg:text-left mx-auto lg:mx-0">
              We conduct groundbreaking research across multiple disciplines,
              addressing the interconnected challenges of food security,
              environmental sustainability, and climate change in Africa.
            </p>

            <Link href="/research-innovation">
              <Button className="text-white font-medium px-7 py-3 rounded-lg transition-all duration-300 bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] hover:from-[#1e4a1e] hover:to-[#2d5a2d] shadow-lg hover:shadow-xl">
                View All Research
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
