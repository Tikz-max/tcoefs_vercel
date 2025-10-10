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
                name: "Dr. Asinamai Athliamai Bitrus",
                department: "Animal Production",
                position: "Researcher/Scientific Team member",
                email: "bitrusaa@unijos.edu.ng",
                phone: "8065680664",
                qualification: "PhD (Bacteriology and Molecular Biology)",
                specialization:
                  "Antimicrobial resistance of pathogens from food and companion animals, One Health and Vaccine development",
                facebook: "https://www.facebook.com/share/19vqPg5CmF/",
                linkedin:
                  "https://www.linkedin.com/company/tetfund-centre-of-excellence-in-food-security-tcoefs-university-of-jos/",
                instagram:
                  "https://www.instagram.com/tcoefs?igsh=MXQwNjlvN3AwN2JyYw==",
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
            ].map((member: any) => (
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

                  {/* Extended info for specific members */}
                  {member.email && (
                    <div className="space-y-2 text-left px-2">
                      <div className="text-xs text-[#4a5b4a]">
                        <span className="font-semibold">Email:</span>{" "}
                        <a
                          href={`mailto:${member.email}`}
                          className="text-[#2d5a2d] hover:underline break-all"
                        >
                          {member.email}
                        </a>
                      </div>
                      {member.phone && (
                        <div className="text-xs text-[#4a5b4a]">
                          <span className="font-semibold">Tel:</span>{" "}
                          {member.phone}
                        </div>
                      )}
                      {member.qualification && (
                        <div className="text-xs text-[#4a5b4a]">
                          <span className="font-semibold">Qualification:</span>{" "}
                          {member.qualification}
                        </div>
                      )}
                      {member.specialization && (
                        <div className="text-xs text-[#4a5b4a] mt-2">
                          <span className="font-semibold">Specialization:</span>{" "}
                          {member.specialization}
                        </div>
                      )}

                      {/* Social Links */}
                      {(member.facebook ||
                        member.linkedin ||
                        member.instagram) && (
                        <div className="flex gap-2 justify-center mt-3 pt-3 border-t border-gray-200">
                          {member.facebook && (
                            <a
                              href={member.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#2d5a2d] hover:text-[#1e4a1e] transition-colors"
                              title="Facebook"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                              </svg>
                            </a>
                          )}
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#2d5a2d] hover:text-[#1e4a1e] transition-colors"
                              title="LinkedIn"
                            >
                              <BrandLinkedInIcon className="w-5 h-5" />
                            </a>
                          )}
                          {member.instagram && (
                            <a
                              href={member.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#2d5a2d] hover:text-[#1e4a1e] transition-colors"
                              title="Instagram"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
