"use client";

import { useEffect, useRef, useState } from "react";

interface CounterData {
  target: number;
  label: string;
  description: string;
  suffix?: string;
}

const counterData: CounterData[] = [
  {
    target: 1000,
    label: "Farmers Trained",
    description: "In climate-smart and value addition practices",
    suffix: "+",
  },
  {
    target: 10,
    label: "Research Projects",
    description:
      "Collaborative studies with national and international partners",
  },
  {
    target: 12,
    label: "Policy Briefs",
    description: "Technical papers influencing government decisions",
  },
  {
    target: 50,
    label: "Reduction Achieved",
    description: "In post-harvest losses recorded in pilot communities",
    suffix: "%+",
  },
];

export default function CounterSection() {
  const [animatedCounters, setAnimatedCounters] = useState<Set<number>>(
    new Set(),
  );
  const sectionRef = useRef<HTMLDivElement>(null);

  const animateCounter = (
    element: HTMLElement,
    target: number,
    suffix = "",
    index: number,
  ) => {
    if (animatedCounters.has(index)) return;

    const duration = 2000;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(target * easeOut);

      element.textContent = currentValue.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    setAnimatedCounters((prev) => new Set([...prev, index]));
    requestAnimationFrame(updateCounter);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counterElements =
              entry.target.querySelectorAll(".impact-number");
            counterElements.forEach((counter, index) => {
              if (!animatedCounters.has(index)) {
                setTimeout(
                  () => {
                    animateCounter(
                      counter as HTMLElement,
                      counterData[index].target,
                      counterData[index].suffix || "",
                      index,
                    );
                  },
                  500 + index * 200,
                );
              }
            });
          }
        });
      },
      { threshold: 0.5 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [animatedCounters]);

  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-white/90 to-gray-50/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {counterData.map((item, index) => (
              <div
                key={index}
                className="text-center opacity-0 animate-[popUp_0.6s_ease_forwards] relative overflow-hidden"
                style={{ animationDelay: `${0.2 + index * 0.2}s` }}
              >
                <div className="impact-number text-5xl font-extrabold bg-gradient-to-br from-[#5a7c65] to-[#6b8570] bg-clip-text text-transparent mb-4 leading-none">
                  0{item.suffix}
                </div>
                <div className="text-[#2f3e2f] text-lg font-semibold mb-2 leading-tight">
                  {item.label}
                </div>
                <div className="text-[#4a5b4a] text-sm leading-relaxed">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes popUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
