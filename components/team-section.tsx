"use client";

import { Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/components/ui/button";

// Brand LinkedIn icon (official glyph), colorable via CSS (uses currentColor)
function BrandLinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM6.897 20.452H3.555V9h3.342v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"
      />
    </svg>
  );
}

export default function TeamSection() {
  const director = {
    name: "Prof. Dauda Bitrus Bawa",
    title: "Director & Lead Researcher",
    bio: `Prof. Dauda Bitrus Bawa brings over 20 years of experience in agricultural research, environmental sustainability, and policy development. He has led numerous groundbreaking research initiatives across Africa and has published extensively on food systems, climate adaptation, and sustainable agriculture.`,
    expertise: [
      "Agricultural Systems",
      "Environmental Policy",
      "Climate Adaptation",
      "Food Security",
      "Research Leadership",
    ],
    education: [
      "Ph.D. Agricultural Economics, University of Reading",
      "M.Sc. Environmental Science, Ahmadu Bello University",
    ],
    achievements: [
      "50+ peer-reviewed publications",
      "Lead researcher on 15+ international projects",
      "Policy advisor to 3 African governments",
    ],
    email: "d.bawa@tcofes.org",
    linkedin: "#",
    image: "/people/dauda-bawa.png",
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#2d5a2d]/10 text-[#2d5a2d] text-sm font-medium">
            Our Team
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-[#2f3e2f]">
            People Driving Our <span className="text-[#2d5a2d]">Mission</span>
          </h2>
          <p className="mt-4 text-[#4a5b4a] max-w-3xl mx-auto leading-relaxed">
            Meet the people behind TCoEFS—leaders and researchers advancing food
            security, climate resilience, and policy impact through applied
            research and partnerships.
          </p>
        </div>

        {/* Director */}
        <div className="mb-16">
          <Card className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg">
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* Photo */}
                <div className="flex justify-center md:justify-start">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
                    <img
                      src={director.image}
                      alt={director.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Info */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#2d5a2d]" />
                    <span className="text-sm font-medium text-[#2d5a2d]">
                      Director
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#2f3e2f] leading-tight">
                    {director.name}
                  </h3>
                  <p className="text-[#4a5b4a] font-medium mt-1">
                    {director.title}
                  </p>
                  <p className="mt-4 text-[#4a5b4a] leading-relaxed">
                    {director.bio}
                  </p>

                  {/* Expertise */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {director.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={`mailto:${director.email}`}
                      className="inline-flex"
                      aria-label="Email director"
                    >
                      <Button
                        variant="outline"
                        className="border-gray-200 text-[#2f3e2f]"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                    </a>
                    <a
                      href={director.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                      aria-label="Director LinkedIn"
                    >
                      <Button
                        variant="outline"
                        className="border-gray-200 text-[#0A66C2]"
                      >
                        <BrandLinkedInIcon className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Button>
                    </a>
                  </div>

                  {/* Key Achievements */}
                  <div className="mt-8">
                    <h4 className="font-semibold text-[#2f3e2f] mb-2">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {director.achievements.map((item) => (
                        <li
                          key={item}
                          className="text-[#4a5b4a] text-sm leading-relaxed flex items-start gap-2"
                        >
                          <span className="w-2 h-2 bg-[#2d5a2d] rounded-full mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Members */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-[#2f3e2f]">
              Team <span className="text-[#2d5a2d]">Members</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                name: "Prof. Uchele Okpanachi",
                department: "Animal production",
                position: "Researcher/Scientific Team member",
              },
              {
                name: "Rosemary Anga",
                department: "Economics",
                position: "Researcher/Scientific Team member",
              },
              {
                name: "Idachaba Collins Udagbene",
                department: "Animal Production",
                position: "Researcher/Scientific Team member",
              },
              {
                name: "Mr. Idakwo Daniel Acheneje",
                department: "Agric. Econs. & Extension",
                position: "Researcher/Scientific Team member",
              },
              {
                name: "Dr. Solomon Taiwo Folorunso",
                department: "Agric. Econs. & Extension",
                position: "Researcher/Scientific Team member",
              },
              {
                name: "Dr. Oshibanjo Olusegun Debola",
                department: "Animal Production",
                position: "Researcher/Scientific Team member",
              },
              {
                name: "Prof. Solomon Ngutor Karshima",
                department: "Vet. Public health & prev. Med.",
                position: "Researcher/Scientific Team member",
              },
              {
                name: "Dr. Stephen Nanbahal Dachi",
                department: "Crop Production",
                position: "Researcher/Scientific Team member",
              },
              {
                name: "Dr. Karaye Gloria Pisha",
                department: "Vet. Parasitology & Entomology",
                position: "Researcher/Scientific Team member",
              },
              {
                name: "Dr. Ameji Negedu Onogu",
                department: "Veterinary Medicine",
                position: "Researcher/Scientific Team member",
              },
              {
                name: "Dr. Adebisi Oyedapo Folashade",
                department: "Animal Production",
                position: "Researcher/Scientific Team member",
              },
              {
                name: "Prof. Daniel Musa Lenka",
                department: "Agric. Econs. & Extension",
                position: "Researcher/Scientific Team member",
              },
              {
                name: "Dr. Akpensuen, Tersur Theophilus",
                department: "Animal Production/Rothamsted Research Center UK",
                position: "Researcher/Scientific Team member",
              },
              {
                name: "Dr. Deshi Kyenpiya Eunice",
                department: "Plant Science and Biotechnilogy",
                position: "Researcher/Scientific Team member",
              },
              {
                name: "Jimme Garba Matyek",
                department: "Mass Communication",
                position: "Communication and Documentation Officer",
              },
              {
                name: "Daniel Bwala",
                department: "Crop Production",
                position: "Researcher/Scientific Team member",
              },
              {
                name: "Mr Adebayo Kunle Adeniyi",
                department: "Animal  Production",
                position: "Researcher/Scientific Team member",
              },
              {
                name: "Dr. Simi Sekyen Goyol Chuktu",
                department: "Geography",
                position: "Researcher/Scientific Team member",
              },
              {
                name: "Mr. Mohammed Musa Yahaya",
                department: "Animal Production",
                position: "Researcher/Scientific Team member",
              },
              {
                name: "Dr Elijah Akintunde",
                department: "Geography",
                position: "Researcher/Scientific Team member",
              },
              {
                name: "Prof. Andrew Oziel Donye",
                department: "Agric. Econs. & Extension",
                position: "Researcher/Scientific Team member",
              },
              {
                name: "Dr. Sahmicit Kankemwa Kumswa",
                department: "Sociology",
                position: "Researcher/Scientific Team member",
              },
            ].map((member) => (
              <Card
                key={member.name}
                className="group bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <CardHeader className="pb-0">
                  <CardTitle className="text-center">
                    <div className="text-base sm:text-lg font-semibold text-[#2f3e2f] leading-snug break-words overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                      {member.name}
                    </div>
                    <div className="text-xs sm:text-sm text-[#2d5a2d] font-medium break-words">
                      {member.position}
                    </div>
                    <div className="text-[11px] sm:text-xs text-[#4a5b4a] break-words">
                      {member.department}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden ring-1 ring-black/5">
                      <img
                        src="/placeholder-user.jpg"
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
