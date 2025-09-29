"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const images = [
  "/hero/hero-1.png", // Plant sprouting
  "/hero/hero-2.png", // Greenhouse
  "/hero/hero-3.png", // Grains in sacks
  "/hero/hero-4.png", // Agricultural landscape
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Mobile Background - positioned behind everything */}
      <div className="lg:hidden absolute inset-0 z-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Agricultural scene ${index + 1}`}
                fill
                sizes="100vw"
                priority={index === 0}
                className="object-cover"
              />
            </div>
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-white/85 to-white/95" />
      </div>

      <div className="relative z-30 h-full flex flex-col lg:flex-row">
        {/* Left Content Area */}
        <div className="flex-1 flex flex-col justify-center items-start px-8 lg:px-16 lg:pr-8">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-[#2f3e2f]">Innovation. Research. Impact</span>
            <span className="text-[#2f3e2f]"> — </span>
            <span className="text-[#4a5b4a] font-normal">
              For a Food-Secure Africa.
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-[#4a5b4a] leading-relaxed mb-8 max-w-2xl">
            Driving sustainable agricultural transformation through cutting-edge
            research, strategic partnerships, and hands-on capacity building.
          </p>

          <Link href="/contact">
            <button className="bg-gradient-to-r from-[#2d5a2d] to-[#1e4a1e] text-white px-8 py-4 rounded-lg font-medium text-lg hover:from-[#1e4a1e] hover:to-[#2d5a2d] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Partner With Us
            </button>
          </Link>
        </div>

        {/* Right Visual - Desktop */}
        <div className="hidden lg:flex flex-1 relative p-8">
          {/* Bottom swell background */}
          <div
            className="absolute -bottom-28 -right-20 w-[65vh] h-[65vh] rounded-tl-[58%] bg-[radial-gradient(70%_70%_at_50%_100%,rgba(45,90,45,0.28)_0%,rgba(45,90,45,0.18)_35%,rgba(74,91,74,0.12)_60%,transparent_82%)] pointer-events-none blur-2xl"
            aria-hidden="true"
          />
          {/* Halo around circle to blend with background */}
          <div
            className="absolute right-6 bottom-6 w-[560px] max-w-[46vw] aspect-square rounded-full pointer-events-none bg-[radial-gradient(closest-side,rgba(45,90,45,0.18),rgba(45,90,45,0.08)_60%,transparent_78%)] blur-2xl"
            aria-hidden="true"
          />
          {/* Circular image rotator */}
          <div className="relative w-[520px] max-w-[42vw] aspect-square ml-auto rounded-full overflow-hidden shadow-2xl shadow-[0_12px_36px_rgba(47,62,47,0.12)] ring-[6px] ring-white/60 ring-offset-2 ring-offset-white/60 border border-white/20 bg-white/30 backdrop-blur-md">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentImage ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Agricultural scene ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
