// Single source of truth for navigation, contact details and social links.

export const site = {
  name: "TETFund Centre of Excellence in Food Security",
  short: "TCoEFS",
  host: "University of Jos",
  tagline: "Feeding the future through knowledge and innovation.",
  email: "tcoefs@unijos.edu.ng",
  phone: "+234 803 437 7953",
  phoneHref: "tel:+2348034377953",
  address: ["University of Jos, Naraguta Campus", "Plateau State, Nigeria"],
  coordinates: "9.9640° N, 8.8803° E",
  mapUrl: "https://maps.app.goo.gl/TB3bqphYLNCMVNGq8",
  blogUrl: "https://blog.tcoefs-unijos.org",
};

export type NavChild = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
};

export type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

export const navItems: NavItem[] = [
  {
    label: "About",
    children: [
      {
        label: "Overview",
        href: "/about",
        description: "Mandate, vision and strategic focus areas",
      },
      {
        label: "Leadership",
        href: "/about/leadership",
        description: "The Director, deputies and scientific team",
      },
      {
        label: "Facilities",
        href: "/about/facilities",
        description: "Greenhouse, laboratory and research farmland",
      },
    ],
  },
  {
    label: "Programmes",
    href: "/programmes",
    children: [
      {
        label: "All Programmes",
        href: "/programmes",
        description: "Three pathways, one mission",
      },
      {
        label: "Postgraduate Programmes",
        href: "/programmes/postgraduate",
        description: "PGD, MSc, PhD and MBA across four clusters",
      },
      {
        label: "Research & Innovation",
        href: "/programmes/research-innovation",
        description: "Applied, interdisciplinary research areas",
      },
      {
        label: "Training & Extension",
        href: "/programmes/training-extension",
        description: "Short courses and farmer-focused clinics",
      },
    ],
  },
  { label: "Enterprise", href: "/enterprise-demonstration" },
  { label: "Partnerships", href: "/partnerships" },
  {
    label: "News",
    children: [
      {
        label: "News",
        href: "https://blog.tcoefs-unijos.org",
        description: "Stories and announcements on the Centre blog",
        external: true,
      },
      {
        label: "Newsletters & Events",
        href: "/news/newsletters-events",
        description: "Quarterly issues and upcoming events",
      },
    ],
  },
  { label: "Resources", href: "/resources" },
];

export const socials = [
  {
    label: "LinkedIn",
    handle: "TETFund Centre of Excellence in Food Security (TCoEFS)",
    href: "https://www.linkedin.com/company/tetfund-centre-of-excellence-in-food-security-tcoefs-university-of-jos/",
  },
  {
    label: "Facebook",
    handle: "TCoEFS (Official)",
    href: "https://www.facebook.com/share/19vqPg5CmF/",
  },
  {
    label: "Instagram",
    handle: "@tcoefs",
    href: "https://www.instagram.com/tcoefs?igsh=MXQwNjlvN3AwN2JyYw==",
  },
  {
    label: "YouTube",
    handle: "@TETFund_TCoEFS",
    href: "https://www.youtube.com/@TETFund_TCoEFS",
  },
];
