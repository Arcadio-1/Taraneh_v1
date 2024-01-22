import { BASE_URL } from "@/constants/constants";
import { prisma } from "@/lib/db/prisma";
import { MetadataRoute } from "next";

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  const products = await prisma.product.findMany({ select: { id: true } });
  return products;
}

export default async function sitemap({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  //   const start = id * 50000;
  //   const end = start + 50000;
  const products = await prisma.product.findMany({
    select: { id: true, updatedAt: true },
  });
  return products.map((product) => ({
    url: `${BASE_URL}/product/${id}`,
    lastModified: product.updatedAt,
  }));
}
