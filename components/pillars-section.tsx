"use client";

import { useState, useEffect } from "react";

export default function PillarsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const pillars = [
    {
      icon: "🔬",
      title: "Applied Research for Development",
      description:
        "Multidisciplinary studies that solve real-world challenges — from soil health to livestock genetics.",
    },
    {
      icon: "🎓",
      title: "Capacity Building & Training",
      description:
        "Equipping farmers, students, policymakers, and agripreneurs with practical, market-ready skills.",
    },
    {
      icon: "📋",
      title: "Policy & Advocacy",
      description:
        "Translating evidence into reforms that shape Nigeria's agricultural future.",
    },
    {
      icon: "⚡",
      title: "Innovation & Technology Transfer",
      description:
        "Bundling field-tested solutions for adoption at scale — from farm to fork.",
    },
  ];

  return (
    <section className="py-16 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-15">
          <h2 className="text-5xl font-bold text-[#2f3e2f] mb-5">
            Our Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className={`
                bg-gradient-to-br from-white/90 to-gray-50/60 backdrop-blur-sm
                rounded-2xl p-12 text-center shadow-lg border border-white/20
                transition-all duration-300 ease-out min-h-[420px] flex flex-col
                hover:transform hover:-translate-y-2 hover:shadow-xl
                hover:bg-gradient-to-br hover:from-white/95 hover:to-gray-50/80
                relative overflow-hidden group
                ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-8"}
              `}
              style={{
                animationDelay: `${index * 100}ms`,
                boxShadow:
                  "0 8px 32px rgba(47, 62, 47, 0.08), 0 4px 16px rgba(255, 255, 255, 0.1) inset",
              }}
            >
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-[#5a7c65] to-[#6b8570] rounded-2xl flex items-center justify-center text-4xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-1">
                <span className="text-[#f4c542]">{pillar.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-[#2f3e2f] mb-5 leading-tight">
                {pillar.title}
              </h3>
              <p className="text-[#4a5b4a] text-base leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease forwards;
        }
      `}</style>
    </section>
  );
}
