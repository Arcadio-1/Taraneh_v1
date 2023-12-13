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
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import {
  CommentWithUser,
  Specifications_select_specifications,
} from "@/types/type";
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
  return product;
});

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const product = await getProduct(slug[0]);
  return {
    title: "ترانه - " + product.title,
    description: product.title,
    openGraph: {
      images: [{ url: product.image_url }],
    },
  };
}

const page = async ({ params: { slug } }: Props) => {
  const product = await getProduct(slug[0]);
  const introduction = await prisma.product_description.findUnique({
    where: { product_id: slug[0] },
    select: { description: true },
  });
  const comments: CommentWithUser[] = await prisma.comments.findMany({
    include: { user: { select: { name: true, family: true, id: true } } },
  });

  const specifications: Specifications_select_specifications | null =
    await prisma.specifications.findUnique({
      where: { product_id: slug[0] },
      select: { specifications: true },
    });

  const breadcrumbs: BreadcrumbsType[] = [
    {
      title: product.main_cat.title,
      link: `/main/${product.main_cat.label}`,
    },
    {
      title: product.specific_cat.title,
      link: `/search/${product.specific_cat.label}`,
    },
    {
      title: product.title,
      link: `/product/${product.id}`,
    },
  ];
  const session = await getServerSession(authOptions);
  const cart = await getCart();

  return (
    <div className="px-5 flex flex-col gap-5">
      <div>
        <Breadcrumbs list={breadcrumbs} />
        <Main cart={cart} product={product} product_id={slug[0]} />
      </div>
      <Smilar_product_slider />
      <Sub
        session={session}
        comments={comments}
        introduction={introduction?.description}
        specifications={specifications}
        product_id={slug[0]}
        cart={cart}
        product={product}
      />
    </div>
  );
};

export default page;
