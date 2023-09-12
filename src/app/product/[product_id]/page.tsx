import Breadcrumbs, {
  BreadcrumbsType,
} from "@/components/Util/breadcrumbs/Breadcrumbs";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
interface Props {
  params: {
    product_id: string;
  };
}
const page = async ({ params: { product_id } }: Props) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: product_id },
      include: { main_cat: true, specific_cat: true },
    });
    if (!product) {
      throw new Error();
    }
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

    return (
      <div>
        <Breadcrumbs list={breadcrumbs} />
        <section>
          <div>
            <Image
              src={product.image_url}
              alt={product.title}
              width={400}
              height={400}
            />
          </div>
        </section>
      </div>
    );
  } catch {
    notFound();
  }
};

export default page;
