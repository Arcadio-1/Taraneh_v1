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
    product_id: string;
  };
}
export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { id: true } });
  return products.map((item) => {
    return { product_id: item.id };
  });
}

const getProduct = cache(async (id: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: id },
      include: { main_cat: true, specific_cat: true, brand: true },
    });
    if (!product) {
      return notFound();
    }
    return product;
  } catch (error) {
    return notFound();
  }
});

export async function generateMetadata({
  params: { product_id },
}: Props): Promise<Metadata> {
  const product = await getProduct(product_id);
  return {
    title: product.title,
    description: product.title,
    metadataBase: new URL("https://taraneh-v1.vercel.app/"),
    openGraph: {
      title: product.title,
      description: product.title,
      images: [
        {
          url: product.image_url,
        },
      ],
    },
    twitter: {
      // card: "summary_large_image",
      // site: "@eMartiiin94",
      title: product.title,
      description: product.title,
      images: [
        {
          url: product.image_url,
        },
      ],
    },
  };
}

const page = async ({ params: { product_id } }: Props) => {
  const session = await getServerSession(authOptions);
  const product = await getProduct(product_id);

  const breadcrumbs: BreadcrumbsType[] = [
    {
      title: product.main_cat.title,
      link: `/search/${product.main_cat.label}`,
    },
    {
      title: product.specific_cat.title,
      link: `/search/${product.specific_cat.label}`,
    },
  ];

  const cart = await getCart();

  return (
    <main className="flex flex-col gap-5 px-5">
      <div>
        <Breadcrumbs list={breadcrumbs} />
        <Main cart={cart} product={product} product_id={product_id} />
      </div>
      <Suspense fallback={<p>loading smilar products...</p>}>
        <Smilar_product_slider />
      </Suspense>

      <Suspense fallback={<p>Loading Sub Sections</p>}>
        <SubProvider
          cart={cart}
          product={product}
          product_id={product_id}
          session={session}
        />
      </Suspense>
    </main>
  );
};

export default page;
