import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/login", "/api/", "/auth/", "/unauthorized"],
    },
    sitemap: "https://www.tcoefs-unijos.org/sitemap.xml",
  };
}
