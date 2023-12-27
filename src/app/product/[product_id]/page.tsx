import Breadcrumbs, {
  BreadcrumbsType,
} from "@/components/Util/breadcrumbs/Breadcrumbs";
import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import React, { cache } from "react";
import { Metadata } from "next";
import { getCart } from "@/lib/actions/getCart";
import Main from "@/components/Product_page/main/Main";
import Smilar_product_slider from "@/components/Product_page/smilar_products_slider/Smilar_product_slider";
import Sub from "@/components/Product_page/sub/Sub";
import {
  CommentWithUser,
  Specifications_select_specifications,
} from "@/types/type";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

interface Props {
  params: {
    product_id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id: id },
    include: { main_cat: true, specific_cat: true, brand: true },
  });
  if (!product) notFound();
  return product;
});

export async function generateMetadata({
  params: { product_id },
}: Props): Promise<Metadata> {
  const product = await getProduct(product_id);
  return {
    title: "ترانه - " + product.title,
    description: product.title,
    metadataBase: new URL("https://taraneh-v1.vercel.app/"),
    openGraph: {
      title: "ترانه - " + product.title,
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
      title: "ترانه - " + product.title,
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

  const introduction = await prisma.product_description.findUnique({
    where: { product_id: product_id },
    select: { description: true },
  });
  const comments: CommentWithUser[] = await prisma.comments.findMany({
    include: { user: { select: { name: true, family: true, id: true } } },
    orderBy: { date: "desc" },
  });

  const specifications: Specifications_select_specifications | null =
    await prisma.specifications.findUnique({
      where: { product_id: product_id },
      select: { specifications: true },
    });

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
    <div className="px-5 flex flex-col gap-5">
      <div>
        <Breadcrumbs list={breadcrumbs} />
        <Main cart={cart} product={product} product_id={product_id} />
      </div>
      <Smilar_product_slider />
      <Sub
        session={session}
        comments={comments}
        introduction={introduction?.description}
        specifications={specifications}
        product_id={product_id}
        cart={cart}
        product={product}
      />
    </div>
  );
};

export default page;
