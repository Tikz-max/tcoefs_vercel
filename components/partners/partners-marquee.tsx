"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

const logos = [
  { src: "/partners/color/tetfund.png", alt: "Tertiary Education Trust Fund (TETFund)" },
  { src: "/partners/color/university-of-jos.png", alt: "University of Jos" },
  { src: "/partners/color/saa.png", alt: "Sasakawa Africa Association (SAA)" },
  { src: "/partners/color/giz.png", alt: "GIZ" },
  { src: "/partners/color/uslge.png", alt: "U.S. Livestock Genetics Export, Inc. (USLGE)", special: true },
  { src: "/partners/color/plsg.png", alt: "Plateau State Government (PLSG)" },
  { src: "/partners/color/ecofarms-agro.png", alt: "Ecofarms and Agroservices Ltd" },
  { src: "/partners/color/reproduction-specialty-group.png", alt: "Reproduction Specialty Group, Inc. (RSG)" },
  { src: "/partners/color/lpres.png", alt: "Livestock Productivity & Resilience Support Project (L-PRES)" },
  { src: "/partners/color/dajrhas.png", alt: "Dajrhas Health and Agric Development Ltd" },
  { src: "/partners/color/datacraft.png", alt: "Data-craft Analytics Solutions Inc.", special: true },
];

export default function PartnersMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

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
    <section className="py-16 bg-white overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 overflow-x-clip">
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
        <div className="relative overflow-hidden overflow-x-clip">
          {/* Edge masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Unified DOM-based animation for all devices */}
          <div className="overflow-hidden overflow-x-clip">
            <div
              ref={containerRef}
              className="flex items-center gap-8 md:gap-10 will-change-transform"
              style={{ width: "max-content" }}
            >
              {logos.concat(logos).map((logo, i) => (
                <div
                  key={`${logo.alt}-${i}`}
                  className="flex-shrink-0 w-28 md:w-36"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={160}
                    height={60}
                    className={`h-8 md:h-10 w-full object-contain ${logo.special ? "opacity-100" : "opacity-80"}`}
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
