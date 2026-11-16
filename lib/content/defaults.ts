// What the homepage shows when nothing has been saved in the admin yet.

export type HeroSlideView = { src: string; alt: string; caption: string };
export type StatView = {
  value: number;
  suffix: string;
  label: string;
  description: string;
};

export const defaultHeroSlides: HeroSlideView[] = [
  {
    src: "/ENTERPRISE_and_DEMONSTRATION/farm-land-opt.webp",
    alt: "Research and demonstration farmland at the University of Jos",
    caption: "Research farmland",
  },
  {
    src: "/hero/compressed/4.jpg",
    alt: "The TCoEFS team and visitors at the Centre's facilities",
    caption: "The TCoEFS team",
  },
  {
    src: "/ENTERPRISE_and_DEMONSTRATION/greenhouse-1-opt.webp",
    alt: "Visitors at the Centre's greenhouse complex",
    caption: "Greenhouse complex",
  },
  {
    src: "/hero/compressed/2.jpg",
    alt: "Partners and University of Jos leadership at an institutional engagement",
    caption: "Institutional engagement",
  },
];

export const defaultStats: StatView[] = [
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
