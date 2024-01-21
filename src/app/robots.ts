import { BASE_URL } from "@/lib/constants/constants";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/profile/",
    },
    sitemap: `${BASE_URL}sitemap.xml`,
  };
}
