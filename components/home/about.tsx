import { Reveal, RevealImage, ScrubText } from "@/components/site/motion";
import { StatRow } from "@/components/site/blocks";
import { Eyebrow, TextLink } from "@/components/site/ui";

const stats = [
  {
    value: 30,
    suffix: "+",
    label: "Scientific team members",
    description: "Researchers, faculty, and field scientists driving TCoEFS work",
  },
  {
    value: 500,
    suffix: "+",
    label: "Farmers trained",
    description: "In climate-smart agriculture and value addition practices",
  },
  {
    value: 15,
    suffix: "+",
    label: "Postgraduate programmes developed",
    description:
      "Accredited programmes building the next generation of food security experts",
  },
  {
    value: 10,
    suffix: "+",
    label: "Strategic partnerships activated",
    description: "With national institutions, industry, and international bodies",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-paper py-16 sm:py-20 lg:py-24">
      <div className="shell">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <Reveal y={12} className="lg:col-span-3">
            <Eyebrow index="01">About the Centre</Eyebrow>
          </Reveal>
          <div className="lg:col-span-9">
            <ScrubText
              className="text-[clamp(1.25rem,1.9vw,1.625rem)] font-medium leading-snug tracking-[-0.01em] text-ink"
              text="The TETFund Centre of Excellence in Food Security, University of Jos, is a multidisciplinary research and training institution established to strengthen sustainable food systems in Nigeria and across Africa."
            />
          </div>
        </div>

        <div className="mt-20 grid gap-x-12 gap-y-14 lg:mt-28 lg:grid-cols-12">
          <div className="grid grid-cols-5 items-end gap-4 sm:gap-6 lg:col-span-7">
            <RevealImage
              src="/spotlight-images/spotlight-card3/img3.png"
              alt="TCoEFS staff and partners outside the Centre building at the University of Jos"
              sizes="(min-width: 1024px) 34vw, 60vw"
              className="col-span-3 aspect-[4/5] rounded-lg"
            />
            <RevealImage
              src="/hero/compressed/1.jpg"
              alt="A TCoEFS team member holding a young goat on the farm"
              sizes="(min-width: 1024px) 22vw, 40vw"
              delay={0.15}
              parallax={10}
              className="col-span-2 aspect-[3/4] rounded-lg"
              imageClassName="object-[center_20%]"
            />
          </div>

          <div className="flex flex-col justify-end lg:col-span-5">
            <Reveal>
              <p className="prose-body text-stone">
                The Centre operates under the mandate of the Tertiary Education
                Trust Fund (TETFund) to deliver measurable impact in research
                excellence, postgraduate education, institutional
                sustainability, and agricultural innovation.
              </p>
            </Reveal>
            <dl className="mt-10">
              <Reveal delay={0.05}>
                <div className="border-t border-line py-6">
                  <dt className="eyebrow mb-3 text-wheat-deep">Our vision</dt>
                  <dd className="text-[1.125rem] font-semibold leading-snug">
                    To be a Centre of Excellence for training and applied
                    research that enhances household food security and improves
                    livelihoods in Nigeria and Africa.
                  </dd>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="border-y border-line py-6">
                  <dt className="eyebrow mb-3 text-wheat-deep">Our mission</dt>
                  <dd className="text-[1.125rem] font-semibold leading-snug">
                    To enhance access by all people to safe and nutritious food
                    needed to maintain a healthy and active life.
                  </dd>
                </div>
              </Reveal>
            </dl>
            <Reveal delay={0.15} className="mt-9">
              <TextLink href="/about" className="text-pine">
                More about the Centre
              </TextLink>
            </Reveal>
          </div>
        </div>


        <StatRow stats={stats} className="mt-24 lg:mt-32" />
      </div>
    </section>
  );
}
