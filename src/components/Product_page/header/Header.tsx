import { Brand, Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  product_cat: string;
  product_brand: Brand;
  product_title: string;
}

const Header = ({ product_title, product_brand, product_cat }: Props) => {
  return (
    <div className="flex items-center gap-2 pb-4 flex-wrap">
      {product_brand.image && (
        <div className="h-12 w-12">
          <Image
            className="w-full h-full"
            height={30}
            width={30}
            src={product_brand.image}
            alt={product_title}
          />
        </div>
      )}
      <div>
        <p className="flex gap-2 pb-3">
          <Link
            href={`#`}
            className="text-xl text-cyan-500 font-iranyekan_bold"
          >
            {product_brand.title_fr}
          </Link>
          <span className="text-xl text-cyan-300">/</span>
          <Link
            href={`#`}
            className="text-xl text-cyan-500 font-iranyekan_bold"
          >
            {product_cat}
          </Link>
        </p>
        <h1 className="text-3xl">{product_title}</h1>
      </div>
    </div>
  );
};

export default Header;
