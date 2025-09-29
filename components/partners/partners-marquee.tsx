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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasAnimRef = useRef<number>();

  useEffect(() => {
    const isMobile =
      typeof window !== "undefined" ? window.innerWidth < 768 : false;

    if (isMobile) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let rafId = 0;
      const DPR = Math.max(1, Math.floor(window.devicePixelRatio || 1));
      const cssHeight = 48; // canvas height in CSS pixels (matches h-12)
      const gap = 24;
      const itemWidth = 128;
      const itemHeight = 40;
      let offset = 0;
      const speed = 1.2; // px per frame (fast on mobile)

      // Setup canvas size respecting DPR
      const resize = () => {
        const cssWidth = canvas.clientWidth || window.innerWidth;
        canvas.width = Math.floor(cssWidth * DPR);
        canvas.height = Math.floor(cssHeight * DPR);
        canvas.style.width = "100%";
        canvas.style.height = `${cssHeight}px`;
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      };
      resize();
      window.addEventListener("resize", resize);

      // Preload images (double array for smooth loop)
      const sources = [...logos.map((l) => l.src), ...logos.map((l) => l.src)];
      const images: HTMLImageElement[] = sources.map((src) => {
        const img = new Image();
        img.src = src;
        return img;
      });

      const draw = () => {
        const cssWidth = canvas.clientWidth || window.innerWidth;
        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw items across the strip
        let x = -offset;
        const total = (itemWidth + gap) * (images.length / 2);

        for (let i = 0; i < images.length; i++) {
          const img = images[i];
          ctx.drawImage(
            img,
            x,
            (cssHeight - itemHeight) / 2,
            itemWidth,
            itemHeight,
          );
          x += itemWidth + gap;

          // Early exit if we've drawn past visible area sufficiently
          if (x > cssWidth + itemWidth + gap) break;
        }

        offset += speed;
        if (offset >= total) offset = 0;

        canvasAnimRef.current = requestAnimationFrame(draw);
      };

      canvasAnimRef.current = requestAnimationFrame(draw);

      return () => {
        if (canvasAnimRef.current) cancelAnimationFrame(canvasAnimRef.current);
        window.removeEventListener("resize", resize);
      };
    } else {
      const container = containerRef.current;
      if (!container) return;

      let start = 0;
      const speed = 0.8; // px per frame (fast but readable on desktop)

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
    }
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

          {/* Mobile: Canvas-based for ultra-smooth animation */}
          <canvas ref={canvasRef} className="block md:hidden w-full h-12" />

          {/* Desktop/Tablet: DOM-based with RAF */}
          <div className="hidden md:block overflow-hidden">
            <div
              ref={containerRef}
              className="flex items-center gap-12 will-change-transform"
            >
              {logos.concat(logos).map((logo, i) => (
                <div key={`${logo.alt}-${i}`} className="flex-shrink-0 w-40">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={160}
                    height={60}
                    className="h-12 w-full object-contain opacity-90"
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
