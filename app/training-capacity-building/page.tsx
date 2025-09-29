import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function TrainingCapacityBuildingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Bold main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2f3e2f] leading-tight mb-8">
            Empowering People • Transforming Food Systems
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl font-semibold text-[#2f3e2f] mb-12">
            Training & Capacity Building
          </h2>

          {/* Content */}
          <div className="text-lg text-[#4a5b4a] leading-relaxed space-y-6 text-left max-w-3xl mx-auto mb-16">
            <p>
              At TCoEFS, we believe that solving Nigeria's food security
              challenge is not just about technology or infrastructure — it's
              about people. We invest heavily in human capital development,
              equipping farmers, researchers, policymakers, and entrepreneurs
              with the skills and networks to lead agricultural transformation.
            </p>

            <p>
              Our training programs bridge the gap between theory and practice,
              ensuring participants leave with practical, market-ready
              capabilities that create real-world impact.
            </p>
          </div>

          {/* Philosophy Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Practical & Hands-On",
                description:
                  "Learn by doing with real case studies and field visits",
                icon: (
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                ),
              },
              {
                title: "Evidence-Based",
                description:
                  "Curriculum grounded in latest research and best practices",
                icon: (
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Inclusive & Accessible",
                description:
                  "Opportunities for women, youth, and underserved communities",
                icon: (
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Sustainability-Focused",
                description:
                  "Skills that foster long-term resilience and growth",
                icon: (
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                ),
              },
            ].map((philosophy, index) => (
              <div
                key={index}
                className="group relative bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-[#5a7c65]/30 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-[#2d5a2d] to-[#4a5b4a] rounded-full flex items-center justify-center">
                    {philosophy.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#2f3e2f] mb-3">
                    {philosophy.title}
                  </h3>
                  <p className="text-[#4a5b4a] text-sm leading-relaxed">
                    {philosophy.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Capacity-Building Areas Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight mb-6">
              Key Capacity-Building Areas
            </h2>
            <p className="text-lg text-[#4a5b4a] max-w-3xl mx-auto">
              Comprehensive training programs designed to address every aspect
              of the agricultural value chain
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Agricultural Research & Data Skills",
                target: "Scientists, postgraduate students, extension agents",
                focus:
                  "Research design, statistical analysis, data management, scientific communication",
                icon: (
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                ),
              },
              {
                title: "Climate-Smart Agriculture",
                target: "Farmers, extension workers, development agencies",
                focus:
                  "Drought-resistant varieties, soil health, regenerative practices, water-efficient irrigation",
                icon: (
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                ),
              },
              {
                title: "Post-Harvest Management & Value Addition",
                target: "Agribusinesses and producer groups",
                focus:
                  "Reducing losses, food processing, packaging, quality assurance",
                icon: (
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                ),
              },
              {
                title: "Digital Agriculture & Precision Farming",
                target: "Agri-tech innovators and progressive farmers",
                focus:
                  "Farm mapping, sensor-based monitoring, remote advisory systems, market apps",
                icon: (
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
              },
              {
                title: "Agribusiness Management & Entrepreneurship",
                target: "Emerging agri-entrepreneurs and cooperatives",
                focus:
                  "Business planning, access to finance, branding, investment readiness",
                icon: (
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                ),
              },
              {
                title: "Policy & Leadership Development",
                target:
                  "Government officials, civil society leaders, development practitioners",
                focus:
                  "Evidence-based policy design, program management, stakeholder engagement",
                icon: (
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                ),
              },
            ].map((area, index) => (
              <div
                key={index}
                className="group relative bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg hover:bg-white/90 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#2d5a2d] to-[#4a5b4a] rounded-full flex items-center justify-center">
                  {area.icon}
                </div>

                <h3 className="text-xl font-bold text-[#2f3e2f] mb-4 text-center">
                  {area.title}
                </h3>

                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-semibold text-[#2d5a2d]">
                      For:{" "}
                    </span>
                    <span className="text-sm text-[#4a5b4a]">
                      {area.target}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#2d5a2d]">
                      Focus:{" "}
                    </span>
                    <span className="text-sm text-[#4a5b4a]">{area.focus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Models Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight mb-6">
              Our Training Models
            </h2>
            <p className="text-lg text-[#4a5b4a] max-w-3xl mx-auto">
              Flexible learning approaches designed to meet diverse needs and
              schedules
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Workshops & Seminars",
                description: "Short, intensive courses on targeted skills",
                duration: "1-3 days",
              },
              {
                title: "Certificate Courses",
                description:
                  "Multi-week programs with professional certification",
                duration: "2-8 weeks",
              },
              {
                title: "Fellowships & Internships",
                description: "Long-term professional development opportunities",
                duration: "3-12 months",
              },
              {
                title: "Farmer Field Schools",
                description: "Learning directly on demonstration plots",
                duration: "Season-long",
              },
              {
                title: "E-Learning Platforms",
                description: "Flexible access for remote participants",
                duration: "Self-paced",
              },
            ].map((model, index) => (
              <div
                key={index}
                className="group relative bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg hover:border-[#2d5a2d]/40 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-[#2f3e2f] mb-3">
                  {model.title}
                </h3>
                <p className="text-[#4a5b4a] text-sm leading-relaxed mb-4">
                  {model.description}
                </p>
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] text-white text-xs rounded-full">
                  {model.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight mb-8">
            Ready to Transform Your Skills?
          </h2>

          <p className="text-lg text-[#4a5b4a] leading-relaxed mb-12 max-w-2xl mx-auto">
            Join thousands of professionals who have enhanced their capabilities
            through our comprehensive training programs. Build the skills needed
            to lead agricultural transformation in Nigeria and beyond.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 border-2 border-[#2d5a2d] text-[#2d5a2d] hover:bg-[#2d5a2d] hover:text-white font-semibold rounded-xl transition-all duration-300">
              Contact Training Team
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
