"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

const logos = [
  { src: "/partners/color/Pasted image.png", alt: "Partner 1" },
  { src: "/partners/color/Pasted image (2).png", alt: "Partner 2" },
  { src: "/partners/color/Pasted image (3).png", alt: "Partner 3" },
  { src: "/partners/color/Pasted image (4).png", alt: "Partner 4" },
  { src: "/partners/color/Pasted image (6).png", alt: "Partner 5" },
];

export default function PartnersMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    // Use simple DOM-based animation for all devices to avoid mobile canvas issues
    const container = containerRef.current;
    if (!container) return;

    let start = 0;
    const speed = 0.8; // px per frame

    const animate = () => {
      start += speed;
      const half = container.scrollWidth / 2;
      if (start >= half) start = 0;
      container.style.transform = `translate3d(-${start}px, 0, 0)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium">
            Partners
          </span>
          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-[#2f3e2f]">
            Our Strategic Collaborators
          </h2>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          {/* Edge masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Unified DOM-based animation for all devices */}
          <div className="overflow-hidden">
            <div
              ref={containerRef}
              className="flex items-center gap-12 will-change-transform"
            >
              {logos.concat(logos).map((logo, i) => (
                <div
                  key={`${logo.alt}-${i}`}
                  className="flex-shrink-0 w-32 md:w-40"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={160}
                    height={60}
                    className="h-8 md:h-12 w-full object-contain opacity-90"
                    loading="eager"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* No additional styles needed */
      `}</style>
    </section>
  );
}
