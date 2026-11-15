import Image from "next/image";

const logos = [
  { src: "/partners/color/tetfund.png", alt: "Tertiary Education Trust Fund (TETFund)", w: 150 },
  { src: "/partners/color/university-of-jos.png", alt: "University of Jos", w: 210 },
  { src: "/partners/color/saa.png", alt: "Sasakawa Africa Association (SAA)", w: 70 },
  { src: "/partners/color/giz.png", alt: "GIZ", w: 150 },
  { src: "/partners/color/uslge.png", alt: "U.S. Livestock Genetics Export, Inc. (USLGE)", w: 130 },
  { src: "/partners/color/plsg.png", alt: "Plateau State Government (PLSG)", w: 130 },
  { src: "/partners/color/ecofarms-agro.png", alt: "Ecofarms and Agroservices Ltd", w: 50 },
  { src: "/partners/color/reproduction-specialty-group.png", alt: "Reproduction Specialty Group, Inc. (RSG)", w: 160 },
  { src: "/partners/color/lpres.png", alt: "Livestock Productivity & Resilience Support Project (L-PRES)", w: 260 },
  { src: "/partners/color/dajrhas.png", alt: "Dajrhas Health and Agric Development Ltd", w: 52 },
  { src: "/partners/color/datacraft.png", alt: "Data-craft Analytics Solutions Inc.", w: 76 },
];

/** Continuous logo band shown directly beneath the hero. */
export default function PartnersStrip() {
  return (
    <section
      aria-label="Partners and collaborators"
      className="border-b border-line bg-white"
    >
      <div className="shell flex flex-col gap-6 py-9 lg:flex-row lg:items-center lg:gap-12">
        <p className="eyebrow shrink-0 text-stone lg:w-44">
          Funded by TETFund.
          <br className="hidden lg:block" /> Working with
        </p>
        <div className="mask-fade-x group relative flex-1 overflow-hidden">
          <ul
            className="flex w-max animate-marquee items-center gap-14 pr-14 group-hover:[animation-play-state:paused]"
            style={{ ["--marquee-duration" as string]: "55s" }}
          >
            {[...logos, ...logos].map((logo, i) => (
              <li
                key={`${logo.src}-${i}`}
                aria-hidden={i >= logos.length}
                className="shrink-0"
              >
                <Image
                  src={logo.src}
                  alt={i >= logos.length ? "" : logo.alt}
                  width={logo.w * 2}
                  height={96}
                  className="h-11 w-auto object-contain opacity-70 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
                  style={{ maxWidth: logo.w }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
