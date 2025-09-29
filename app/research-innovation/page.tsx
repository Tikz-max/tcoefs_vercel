import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ResearchInnovationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Creative Background */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d5a2d] via-[#4a5b4a] to-[#2f3e2f] opacity-10">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-pulse"></div>
        </div>

        {/* Edge blending masks */}
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10"></div>
        </div>

        {/* Floating Geometric Elements */}
        <div className="absolute inset-0">
          {/* DNA Helix-inspired elements */}
          <div
            className="absolute top-20 left-10 w-4 h-4 bg-[#2d5a2d]/20 rounded-full animate-bounce"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          ></div>
          <div
            className="absolute top-32 right-20 w-6 h-6 bg-[#4a5b4a]/20 rounded-full animate-bounce"
            style={{ animationDelay: "1s", animationDuration: "4s" }}
          ></div>
          <div
            className="absolute bottom-40 left-20 w-3 h-3 bg-[#2d5a2d]/30 rounded-full animate-bounce"
            style={{ animationDelay: "2s", animationDuration: "5s" }}
          ></div>
          <div
            className="absolute bottom-20 right-10 w-5 h-5 bg-[#4a5b4a]/25 rounded-full animate-bounce"
            style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
          ></div>

          {/* Hexagonal patterns representing molecular structures */}
          <div
            className="absolute top-1/4 left-1/4 w-8 h-8 border-2 border-[#2d5a2d]/20 rotate-45 animate-spin"
            style={{ animationDuration: "20s" }}
          ></div>
          <div
            className="absolute top-3/4 right-1/4 w-6 h-6 border-2 border-[#4a5b4a]/20 rotate-12 animate-spin"
            style={{ animationDuration: "15s", animationDirection: "reverse" }}
          ></div>

          {/* Innovation circuit patterns */}
          <div className="absolute top-1/2 left-1/6 w-12 h-1 bg-gradient-to-r from-transparent via-[#2d5a2d]/20 to-transparent"></div>
          <div className="absolute top-1/3 right-1/6 w-1 h-12 bg-gradient-to-b from-transparent via-[#4a5b4a]/20 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#2f3e2f] mb-6">Turning Science into Solutions</h1>
          <p className="text-lg md:text-xl text-[#4a5b4a] max-w-3xl mx-auto leading-relaxed">
            At the TETFund Centre of Excellence in Food Security (TCoEFS), research is more than an academic pursuit —
            it is a tool for transformation. We conduct Applied Research for Development (R4D) that addresses the urgent
            realities of Nigeria's food system, ensuring that innovations are practical, scalable, and sustainable.
          </p>
        </div>
      </section>

      {/* Research Philosophy */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#2f3e2f] text-center mb-16">Our Research Philosophy</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Evidence to Action",
                description: "Research is valuable only when it leads to adoption and impact.",
              },
              {
                title: "End-User Engagement",
                description: "Farmers, processors, and policymakers are co-creators, not just beneficiaries.",
              },
              {
                title: "Interdisciplinary Collaboration",
                description: "Food security is a multi-sector challenge requiring diverse expertise.",
              },
              {
                title: "Sustainability Focus",
                description: "Innovations must protect natural resources while increasing productivity.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-[#2d5a2d] rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-[#2f3e2f] mb-2">{item.title}</h3>
                    <p className="text-[#4a5b4a]">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Research Themes */}
      <section className="py-20 px-6 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#2f3e2f] text-center mb-16">Core Research Themes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Climate-Smart Agriculture",
                description:
                  "Developing and promoting farming practices that adapt to climate variability while restoring soil health, conserving water, and reducing greenhouse gas emissions.",
                example:
                  "Regenerative potato agroforestry models that double farmer incomes and restore degraded land.",
              },
              {
                title: "Post-Harvest Technology & Value Addition",
                description:
                  "Reducing Nigeria's high post-harvest losses through innovations in storage, preservation, and processing.",
                example: "Bundled value-addition packages for Irish potato, maize, and tomato farmers.",
              },
              {
                title: "Nutrition & Food Safety",
                description: "Ensuring that food security also means dietary diversity and safety.",
                example:
                  "Nutrition-sensitive agriculture models for rural communities, integrating crop diversification and food hygiene practices.",
              },
              {
                title: "Digital Agriculture & Precision Farming",
                description:
                  "Harnessing data analytics, remote sensing, and mobile tools to optimize farm decision-making.",
                example: "Digital farmer advisory systems for climate, market, and pest alerts.",
              },
              {
                title: "Agribusiness Innovation & Policy Impact",
                description: "Linking research outputs to viable business models and policies that enable scale-up.",
                example: "Farmer Field Business Schools (FFBS) and cooperative market-linkage models.",
              },
            ].map((theme, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-[#2f3e2f] mb-4">{theme.title}</h3>
                <p className="text-[#4a5b4a] mb-4 leading-relaxed">{theme.description}</p>
                <div className="border-l-4 border-[#2d5a2d] pl-4">
                  <p className="text-sm text-[#4a5b4a] italic">
                    <strong>Example:</strong> {theme.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Projects */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#2f3e2f] text-center mb-16">Flagship Projects</h2>
          <div className="space-y-8">
            {[
              {
                title: "Livestock Genetics for 2050",
                description:
                  "In partnership with Kansas State University and US Livestock Genetic Export, advancing beef and dairy breeding for higher efficiency, resilience, and lower emissions.",
              },
              {
                title: "Potato Multi-Actor Platform (MAP)",
                description:
                  "Collaborative approach bringing together farmers, processors, policymakers, and researchers to strengthen Plateau State's potato value chain.",
              },
              {
                title: "SIFTAS Project (with SAA & GIZ)",
                description:
                  "Strengthening institutional frameworks for transformative agricultural systems in Nigeria.",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="group bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl p-8 shadow-lg hover:shadow-2xl hover:scale-[1.02] hover:bg-white/80 transition-all duration-300 ease-out cursor-pointer"
              >
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] group-hover:from-[#4a5b4a] group-hover:to-[#2d5a2d] rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#2f3e2f] group-hover:text-[#2d5a2d] mb-3 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-[#4a5b4a] leading-relaxed">{project.description}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
