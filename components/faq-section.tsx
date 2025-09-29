"use client"

import { useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

const faqData = [
  {
    question: "What is the TETFUND Centre of Excellence in Food Security (TCoEFS)?",
    answer:
      "The TCoEFS is a specialized Centre established at the University of Jos through the Tertiary Education Trust Fund (TETFUND). Its mandate is to advance research, training, innovation, and policy development in food security, with a focus on sustainable agricultural practices and institutional capacity building.",
  },
  {
    question: "What are the main objectives of the Centre?",
    answer:
      "The Centre is designed to: • Promote world-class research in food security and agriculture. • Build capacity through postgraduate training and staff development. • Drive innovation and knowledge transfer in agriculture and related sectors. • Foster partnerships with government, industry, and development agencies. • Support evidence-based policy for sustainable food systems.",
  },
  {
    question: "Who can participate in the Centre's programmes?",
    answer:
      "Participation is open to: • Postgraduate students and researchers in agriculture, food security, and related disciplines. • Academic staff and institutional partners seeking capacity development. • Policymakers, industry stakeholders, and NGOs interested in agricultural innovation. • Local communities and farmer organizations through outreach and training programmes.",
  },
  {
    question: "What training opportunities does the Centre offer?",
    answer:
      "The TCoEFS offers: • Postgraduate programmes (Masters and PhD) with interdisciplinary curricula. • Short-term training courses and workshops on food security, innovation, and sustainable agriculture. • Capacity-building sessions for staff, industry stakeholders, and policymakers. • Farmer-focused training through demonstration plots and Farmer Field Business Schools (FFBS).",
  },
  {
    question: "How does the Centre collaborate with industry and stakeholders?",
    answer:
      "The Centre actively fosters partnerships with industry players, research institutions, NGOs, and government agencies. These collaborations focus on: • Joint research projects. • Innovation and entrepreneurship programmes. • Policy engagement and advocacy. • Technology transfer and commercialization of research outputs.",
  },
  {
    question: "How is the Centre contributing to national development?",
    answer:
      "TCoEFS contributes to Nigeria's food security agenda by: • Developing human capital through advanced training. • Strengthening agricultural value chains. • Promoting climate-smart and regenerative agricultural practices. • Influencing agricultural policies that improve productivity, resilience, and sustainability.",
  },
  {
    question: "Can external organizations partner with the Centre?",
    answer:
      "Yes. The Centre welcomes collaborations with universities, development partners, private sector organizations, and donor agencies. Partnerships are structured to promote innovation, research, and capacity building in food systems.",
  },
  {
    question: "How can students apply for programmes at the Centre?",
    answer:
      "Admission into postgraduate programmes is managed through the University of Jos. Applicants can visit the University's admission portal or contact the Centre directly for programme details, eligibility, and application guidelines.",
  },
  {
    question: "How is the Centre funded?",
    answer:
      "The Centre is primarily funded by the Tertiary Education Trust Fund (TETFUND), with additional support from external partners, research grants, and collaborative projects.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const displayedFAQs = showAll ? faqData : faqData.slice(0, 4)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#2f3e2f] mb-4">Frequently Asked Questions</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2d5a2d] to-[#4a7c59] mx-auto mb-6"></div>
          <p className="text-lg text-[#4a5b4a] max-w-2xl mx-auto">
            Find answers to common questions about the TCoEFS and our programmes
          </p>
        </div>

        <div className="space-y-4">
          {displayedFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-white/50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-[#2f3e2f] pr-4">{faq.question}</h3>
                <ChevronDownIcon
                  className={`w-5 h-5 text-[#2d5a2d] transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5">
                  <div className="pt-2 border-t border-gray-200/50">
                    <p className="text-[#4a5b4a] leading-relaxed whitespace-pre-line">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {!showAll && faqData.length > 4 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center px-6 py-3 bg-[#2d5a2d] text-white font-semibold rounded-lg hover:bg-[#2f3e2f] transition-colors duration-200"
            >
              See More
              <ChevronDownIcon className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}

        {showAll && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(false)}
              className="inline-flex items-center px-6 py-3 bg-[#2d5a2d] text-white font-semibold rounded-lg hover:bg-[#2f3e2f] transition-colors duration-200"
            >
              See Less
              <ChevronDownIcon className="w-4 h-4 ml-2 rotate-180" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
