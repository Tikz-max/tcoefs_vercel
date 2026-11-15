import { FlaskConical, GraduationCap, Landmark, Workflow } from "lucide-react";
import { Stagger } from "@/components/site/motion";
import { Contours, SectionHeader } from "@/components/site/ui";

const pillars = [
  {
    icon: FlaskConical,
    title: "Applied Research for Development",
    description:
      "Multidisciplinary studies that solve real-world challenges, from soil health to livestock genetics.",
  },
  {
    icon: GraduationCap,
    title: "Capacity Building & Training",
    description:
      "Equipping farmers, students, policymakers, and agripreneurs with practical, market-ready skills.",
  },
  {
    icon: Landmark,
    title: "Policy & Advocacy",
    description:
      "Translating evidence into reforms that shape Nigeria's agricultural future.",
  },
  {
    icon: Workflow,
    title: "Innovation & Technology Transfer",
    description:
      "Bundling field-tested solutions for adoption at scale, from farm to fork.",
  },
];

export default function Pillars() {
  return (
    <section className="bg-forest py-16 text-white sm:py-20 lg:py-24">
      <Contours
        seed={7}
        className="absolute -right-[30%] top-[-30%] h-[160%] w-[90%] text-white/[0.05]"
      />
      <div className="shell relative">
        <SectionHeader
          tone="dark"
          eyebrow="Our pillars"
          index="05"
          title="Four pillars carry the work from evidence to *adoption.*"
        />

        <Stagger
          gap={0.1}
          className="mt-12 grid sm:grid-cols-2 lg:mt-24 lg:grid-cols-4"
          itemClassName="h-full"
        >
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.title}
                className={`group flex h-full flex-col border-t border-white/25 py-8 transition-colors duration-300 hover:border-t-wheat sm:pr-7 ${
                  i % 2 === 1 ? "sm:pl-7" : ""
                } ${i > 0 ? "lg:border-l lg:border-l-white/10 lg:pl-7" : "lg:pl-0"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-wheat">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    strokeWidth={1.2}
                    className="size-7 text-sage transition-all duration-300 ease-expo group-hover:-translate-y-1 group-hover:text-wheat"
                  />
                </div>
                <h3 className="display display-sm mt-14 text-white lg:mt-24">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/65">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
