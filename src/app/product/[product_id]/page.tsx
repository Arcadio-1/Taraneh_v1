import Breadcrumbs, {
  BreadcrumbsType,
} from "@/components/Util/breadcrumbs/Breadcrumbs";
import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import React, { cache } from "react";
import ProdImage from "@/components/Product_page/image/ProdImage";
import Prod_specification from "@/components/Product_page/specifications/Prod_specification";
import Header from "@/components/Product_page/header/Header";
import Prod_order from "@/components/Product_page/order/Prod_order";
import { Metadata } from "next";
import { getCart } from "@/lib/actions/getCart";
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
    openGraph: {
      images: [{ url: product.image_url }],
    },
  };
}

const page = async ({ params: { product_id } }: Props) => {
  const product = await getProduct(product_id);
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

  const cart = await getCart();

  const amount = async () => {
    if (cart) {
      const product = cart.items.find((item) => item.productId === product_id);
      if (product) {
        return product.quantity;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  return (
    <div>
      <Breadcrumbs list={breadcrumbs} />
      <section className="lg:grid lg:grid-cols-3 flex flex-col">
        <ProdImage
          product_image_url={product.image_url}
          product_title={product.title}
        />
        <div className="col-span-2">
          <Header
            product_brand={product.brand}
            product_title={product.title}
            product_cat={product.specific_cat.title}
          />

          <div className="grid lg:grid-cols-3 lg:grid-rows-2 grid-cols-1">
            <Prod_specification product={product} />
            <Prod_order
              status={product.status}
              price={product.price}
              offPercent={product.off_percent}
              product_Id={product_id}
              amount={await amount()}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
