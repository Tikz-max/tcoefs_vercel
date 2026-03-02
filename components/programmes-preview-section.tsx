import Link from "next/link";
import { FlaskConical, GraduationCap, Users, ArrowRight } from "lucide-react";

const programmes = [
  {
    icon: FlaskConical,
    title: "Research & Innovation",
    description:
      "Applied research in climate-smart agriculture, livestock resilience, agroforestry, post-harvest systems, and sustainable food systems transformation.",
    href: "/programmes/research-innovation",
  },
  {
    icon: GraduationCap,
    title: "Postgraduate Programmes",
    description:
      "Newly developed PGD, MSc, and PhD programmes aligned with TETFund priorities and awaiting final Senate approval.",
    href: "/programmes/postgraduate",
  },
  {
    icon: Users,
    title: "Training & Short Courses",
    description:
      "Farmer-focused training, extension clinics, and capacity-building workshops integrating research with practical enterprise models.",
    href: "/programmes/training-extension",
  },
];

export default function ProgrammesPreviewSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
      <div className="max-w-6xl mx-auto">
        {/* Section opening */}
        <div className="mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium mb-4">
            Our Programmes
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight max-w-xl">
            What We Offer
          </h2>
        </div>

        {/* Three programme cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programmes.map((programme) => {
            const Icon = programme.icon;
            return (
              <Link
                key={programme.title}
                href={programme.href}
                className="group relative overflow-hidden flex flex-col bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#5a7c65]/30 hover:-translate-y-1"
              >
                {/* Signature hover accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />

                {/* Icon container */}
                <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-[#2d5a2d]/10 text-[#2d5a2d] mb-5">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[#2f3e2f] mb-3 leading-tight">
                  {programme.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#4a5b4a] leading-relaxed flex-1 mb-5">
                  {programme.description}
                </p>

                {/* Ghost link */}
                <div className="flex items-center gap-1.5 text-[#2d5a2d] text-sm font-medium">
                  Explore
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
