import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Stagger } from "@/components/site/motion";
import { SectionHeader } from "@/components/site/ui";

const programmes = [
  {
    title: "Research & Innovation",
    description:
      "Applied research in climate-smart agriculture, livestock resilience, agroforestry, post-harvest systems, and sustainable food systems transformation.",
    href: "/programmes/research-innovation",
    image: "/ENTERPRISE_and_DEMONSTRATION/greenhouse-inspection-opt.webp",
    alt: "Researchers inspecting seedlings inside the TCoEFS greenhouse",
  },
  {
    title: "Postgraduate Programmes",
    description:
      "Newly developed PGD, MSc, and PhD programmes aligned with TETFund priorities and awaiting final Senate approval.",
    href: "/programmes/postgraduate",
    image: "/spotlight-images/spotlight-card1/img2.png",
    alt: "Laboratory benches inside the Centre's research facility",
  },
  {
    title: "Training & Short Courses",
    description:
      "Farmer-focused training, extension clinics, and capacity-building workshops integrating research with practical enterprise models.",
    href: "/programmes/training-extension",
    image: "/agricultural-training-workshop.jpg",
    alt: "Participants on a field training visit among crops",
  },
];

export default function Programmes() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="shell">
        <SectionHeader
          eyebrow="Our programmes"
          index="02"
          title="Three pathways, one *mission.*"
          lede="Academic excellence, applied research, and capacity development for sustainable food systems transformation."
        />

        <Stagger
          gap={0.12}
          className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-20 lg:gap-8"
        >
          {programmes.map((p, i) => (
            <Link
              key={p.title}
              href={p.href}
              className="group flex h-full flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-forest">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-expo group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-ink/35 transition-opacity duration-300 group-hover:opacity-80" />
                <span className="eyebrow absolute left-5 top-5 text-white/90">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-500 ease-expo group-hover:bg-wheat group-hover:text-ink">
                  <ArrowUpRight className="size-[1.125rem] transition-transform duration-500 ease-expo group-hover:rotate-45" />
                </span>
                <h3 className="display display-md absolute inset-x-5 bottom-5 text-white">
                  {p.title}
                </h3>
              </div>
              <p className="mt-5 max-w-sm text-[0.9875rem] leading-relaxed text-stone">
                {p.description}
              </p>
              <span className="mt-4 inline-flex text-[0.9375rem] font-medium text-pine">
                <span className="link-draw pb-0.5">Explore</span>
              </span>
            </Link>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
