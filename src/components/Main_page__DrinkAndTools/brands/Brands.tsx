import { prisma } from "@/lib/db/prisma";
import { DrinksBrands } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  drinks_id: string;
  title: string;
}

const Brands = async ({ drinks_id, title }: Props) => {
  const drinks_brands: DrinksBrands[] = await prisma.product.findMany({
    where: { main_cat_id: drinks_id },
    select: { brand: true },
  });

  const arrayUniqueByKey: DrinksBrands[] = [
    ...new Map(drinks_brands.map((item) => [item.brand.id, item])).values(),
  ];

  return (
    <div>
      <h1 className="font-bold text text-dark_2 font-iranyekan_bold text-2xl mb-4">
        {title}
      </h1>
      <div className="bg-amber-500 grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-3 p-3 ">
        {arrayUniqueByKey.length > 0 &&
          arrayUniqueByKey.map(({ brand }) => {
            return (
              <div
                className="rounded-xl border flex items-center overflow-hidden bg-white"
                key={brand.id}
              >
                <Link href={"#"}>
                  <Image
                    src={brand.image}
                    width={200}
                    height={200}
                    alt={brand.title_fr}
                  />
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Brands;
