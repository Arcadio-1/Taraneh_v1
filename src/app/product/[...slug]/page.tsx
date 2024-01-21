import Breadcrumbs, {
  BreadcrumbsType,
} from "@/components/Util/breadcrumbs/Breadcrumbs";
import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import React, { Suspense, cache } from "react";
import { Metadata } from "next";
import { getCart } from "@/lib/actions/getCart";
import Main from "@/components/Product_page/main/Main";
import Smilar_product_slider from "@/components/Product_page/smilar_products_slider/Smilar_product_slider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import SubProvider from "@/components/Product_page/sub/SubProvider";
interface Props {
  params: {
    slug: string[];
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id: id },
    include: { main_cat: true, specific_cat: true, brand: true },
  });
  const description = await prisma.product_description.findUnique({
    where: { id: id },
  });
  if (!product) notFound();
  return { product, description };
});

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const product = await getProduct(slug[0]);
  return {
    title: product.product.title,
    description: product.description?.description || product.product.title,
    openGraph: {
      images: [{ url: product.product.image_url }],
    },
  };
}

const page = async ({ params: { slug } }: Props) => {
  const product = await getProduct(slug[0]);

  const breadcrumbs: BreadcrumbsType[] = [
    {
      title: product.product.main_cat.title,
      link: `search/${product.product.main_cat.label}`,
    },
    {
      title: product.product.specific_cat.title,
      link: `/search/${product.product.specific_cat.label}`,
    },
  ];
  const session = await getServerSession(authOptions);
  const cart = await getCart();

  return (
    <main className="px-5 flex flex-col gap-5">
      <div>
        <Breadcrumbs list={breadcrumbs} />
        <Main cart={cart} product={product.product} product_id={slug[0]} />
      </div>
      <Suspense fallback={<p>loading smilar products...</p>}>
        <Smilar_product_slider />
      </Suspense>

      <Suspense fallback={<p>Loading Sub Sections</p>}>
        <SubProvider
          cart={cart}
          product={product.product}
          product_id={slug[0]}
          session={session}
        />
      </Suspense>
    </main>
  );
};

export default page;
