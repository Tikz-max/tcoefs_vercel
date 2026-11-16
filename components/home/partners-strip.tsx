import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader, TextLink } from "@/components/site/ui";

// Natural pixel sizes are recorded so each logo is shown in its original
// colours and never enlarged beyond its source resolution.
const logos = [
  { src: "/partners/color/tetfund.png", alt: "Tertiary Education Trust Fund (TETFund)", w: 264, h: 73 },
  { src: "/partners/color/university-of-jos.png", alt: "University of Jos", w: 499, h: 93 },
  { src: "/partners/color/saa.png", alt: "Sasakawa Africa Association (SAA)", w: 160, h: 120 },
  { src: "/partners/color/giz.png", alt: "GIZ", w: 236, h: 62 },
  { src: "/partners/color/uslge.png", alt: "U.S. Livestock Genetics Export, Inc. (USLGE)", w: 345, h: 124 },
  { src: "/partners/color/plsg.png", alt: "Plateau State Government (PLSG)", w: 123, h: 41 },
  { src: "/partners/color/ecofarms-agro.png", alt: "Ecofarms and Agroservices Ltd", w: 1362, h: 1519 },
  { src: "/partners/color/reproduction-specialty-group.png", alt: "Reproduction Specialty Group, Inc. (RSG)", w: 544, h: 150 },
  { src: "/partners/color/lpres.png", alt: "Livestock Productivity & Resilience Support Project (L-PRES)", w: 891, h: 107 },
  { src: "/partners/color/dajrhas.png", alt: "Dajrhas Health and Agric Development Ltd", w: 269, h: 269 },
  { src: "/partners/color/datacraft.png", alt: "Data-craft Analytics Solutions Inc.", w: 1184, h: 864 },
];

const BOX_W = 190;
const BOX_H = 72;

/** Partner logos in their original colours, laid out as a static grid. */
export default function PartnersStrip() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="shell">
        <SectionHeader
          eyebrow="Partners and collaborators"
          title="Funded by TETFund. Working with institutions that share the mission."
          aside={
            <TextLink href="/partnerships" className="text-pine">
              About our partnerships
            </TextLink>
          }
        />
        <ul className="mt-12 grid grid-cols-2 overflow-hidden rounded-lg border border-line sm:grid-cols-3 lg:grid-cols-4">
          {logos.map((logo) => {
            // Fit inside the box without exceeding the source resolution
            const scale = Math.min(BOX_W / logo.w, BOX_H / logo.h, 1);
            const width = Math.round(logo.w * scale);
            const height = Math.round(logo.h * scale);
            return (
              <li
                key={logo.src}
                className="-mb-px -mr-px grid h-32 place-items-center border-b border-r border-line bg-white px-5"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.w}
                  height={logo.h}
                  sizes={`${width}px`}
                  quality={95}
                  style={{ width, height }}
                />
              </li>
            );
          })}
          <li className="-mb-px -mr-px border-b border-r border-line">
            <Link
              href="/partnerships"
              className="group flex h-32 flex-col items-center justify-center gap-1.5 bg-mist px-5 text-center transition-colors duration-200 hover:bg-[#e2e8f0]"
            >
              <span className="text-[0.9375rem] font-semibold text-ink">
                Become a partner
              </span>
              <span className="inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-pine">
                Start a conversation
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
