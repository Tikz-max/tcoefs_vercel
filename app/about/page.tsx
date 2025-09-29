import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";
import TeamSection from "@/components/team-section";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <AnimatedSection animation="fade">
        <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Bold main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2f3e2f] leading-tight mb-8">
              Research • Innovation • Impact
            </h1>

            {/* Subtitle */}
            <h2 className="text-2xl md:text-3xl font-semibold text-[#2f3e2f] mb-12">
              Who We Are
            </h2>

            {/* Content */}
            <div className="text-lg text-[#4a5b4a] leading-relaxed space-y-6 text-left max-w-3xl mx-auto mb-16">
              <p>
                The TETFund Centre of Excellence in Food Security (TCoEFS) at
                the University of Jos is a national hub for agricultural
                research, innovation, and capacity development.
              </p>

              <p>
                We exist to confront one of Nigeria's most urgent challenges,
                ensuring access to safe, nutritious, and affordable food for
                all. Through applied research, hands-on training, policy
                engagement, and technology transfer, we work to build resilient,
                sustainable, and inclusive food systems that can thrive in the
                face of climate change, economic shocks, and demographic
                pressures.
              </p>

              <p>
                Founded under the Tertiary Education Trust Fund (TETFund)
                initiative, TCoEFS connects the classroom to the farm, the
                laboratory to the marketplace, and evidence to policy, ensuring
                that knowledge leads to real-world change.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Vision Card */}
              <div className="group relative">
                <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl" />

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#2d5a2d] to-[#4a5b4a] rounded-full flex items-center justify-center">
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>

                    <h3 className="text-2xl font-bold text-[#2f3e2f] mb-4">
                      Our Vision
                    </h3>

                    <p className="text-[#4a5b4a] leading-relaxed">
                      To be a Centre of Excellence for training and applied
                      research that enhances household food security and
                      improves livelihoods in Nigeria and Africa.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mission Card */}
              <div className="group relative">
                <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl" />

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#2d5a2d] to-[#4a5b4a] rounded-full flex items-center justify-center">
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
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>

                    <h3 className="text-2xl font-bold text-[#2f3e2f] mb-4">
                      Our Mission
                    </h3>

                    <p className="text-[#4a5b4a] leading-relaxed">
                      To enhance access by all people to safe and nutritious
                      food needed to maintain a healthy and active life,
                      ensuring they are not at risk of losing such access.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Core Mandate Section */}
      <AnimatedSection animation="slide-up" delay={100}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Title on the left */}
              <div className="lg:w-1/3">
                <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight">
                  Our Core Mandate
                </h2>
              </div>

              {/* Cards flowing from right to left */}
              <div className="lg:w-2/3">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Applied Research for Development",
                      description:
                        "Generating solutions that solve real problems in agriculture and food systems.",
                    },
                    {
                      title: "Capacity Building",
                      description:
                        "Training farmers, researchers, and policymakers in modern, market-ready skills.",
                    },
                    {
                      title: "Policy & Advocacy",
                      description:
                        "Providing evidence to shape national and regional food security strategies.",
                    },
                    {
                      title: "Technology Transfer",
                      description:
                        "Bundling proven innovations for adoption at scale.",
                    },
                    {
                      title: "Partnership Development",
                      description:
                        "Building alliances across government, industry, academia, and civil society.",
                    },
                  ].map((mandate, index) => (
                    <div
                      key={index}
                      className="group relative bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />

                      <h3 className="text-lg font-semibold text-[#2f3e2f] mb-3">
                        {mandate.title}
                      </h3>
                      <p className="text-[#4a5b4a] text-sm leading-relaxed">
                        {mandate.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Strategic Focus Areas Section */}
      <AnimatedSection animation="slide-left" delay={150}>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              {/* Title on the right */}
              <div className="lg:w-1/3">
                <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight text-right">
                  Our Strategic Focus Areas
                </h2>
              </div>

              {/* Cards flowing from left to right */}
              <div className="lg:w-2/3">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Climate-Smart Agriculture",
                      description:
                        "Practices and technologies to adapt to changing climates while protecting natural resources.",
                    },
                    {
                      title: "Value Addition & Post-Harvest Innovation",
                      description:
                        "Reducing losses, improving quality, and expanding market opportunities.",
                    },
                    {
                      title: "Nutrition & Food Safety",
                      description:
                        "Promoting dietary diversity and ensuring food meets health and safety standards.",
                    },
                    {
                      title: "Digital Agriculture",
                      description:
                        "Leveraging data, analytics, and precision technologies for smarter farming.",
                    },
                    {
                      title: "Agribusiness & Market Systems",
                      description:
                        "Strengthening the profitability and sustainability of agricultural enterprises.",
                    },
                  ].map((focus, index) => (
                    <div
                      key={index}
                      className="group relative bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />

                      <h3 className="text-lg font-semibold text-[#2f3e2f] mb-3">
                        {focus.title}
                      </h3>
                      <p className="text-[#4a5b4a] text-sm leading-relaxed">
                        {focus.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Why TCoEFS Matters Section */}
      <AnimatedSection animation="slide-up" delay={100}>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2f3e2f] leading-tight mb-12">
              Why TCoEFS Matters
            </h2>

            <div className="text-lg text-[#4a5b4a] leading-relaxed space-y-6 text-left">
              <p>
                Nigeria's food system is at a crossroads. Rising demand, climate
                disruptions, and market challenges threaten food security and
                rural livelihoods. The TCoEFS stands at the centre of a movement
                to transform how food is produced, distributed, and consumed —
                turning research into resilience, and innovation into impact.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Director's Message Section */}
      <AnimatedSection animation="fade" delay={200}>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Director's Image - Squared */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="/people/dauda-bawa.png"
                      alt="Prof. Dauda Bawa, Director of TCoEFS"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Quote and Attribution */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Large quotation mark */}
                  <div className="text-6xl md:text-7xl text-[#2f3e2f] font-serif leading-none mb-4 opacity-80">
                    "
                  </div>

                  {/* Quote text */}
                  <blockquote className="text-xl md:text-2xl text-[#2f3e2f] leading-relaxed mb-8 font-medium">
                    Food security is not just about ending hunger — it is about
                    building systems that nourish people, protect the planet,
                    and create prosperity. At TCoEFS, we are committed to
                    connecting knowledge with action, and action with lasting
                    change.
                  </blockquote>

                  {/* Attribution */}
                  <div className="border-l-4 border-[#2d5a2d] pl-6">
                    <p className="text-lg font-semibold text-[#2f3e2f] mb-1">
                      Prof. Dauda Bawa
                    </p>
                    <p className="text-[#4a5b4a]">
                      Director, TCoEFS, University of Jos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <TeamSection />

      <Footer />
    </div>
  );
}
