import type { MetadataRoute } from "next";
import { leadershipProfiles } from "@/lib/data/leadership";

const BASE = "https://www.tcoefs-unijos.org";

const routes = [
  "",
  "/about",
  "/about/leadership",
  "/about/facilities",
  "/programmes",
  "/programmes/postgraduate",
  "/programmes/research-innovation",
  "/programmes/training-extension",
  "/enterprise-demonstration",
  "/partnerships",
  "/news/newsletters-events",
  "/resources",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...routes.map((route) => ({
      url: `${BASE}${route}`,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...leadershipProfiles.map((profile) => ({
      url: `${BASE}/about/leadership/${profile.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];
}
