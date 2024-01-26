import { urlMaker } from "@/util_functions/urlMaker";
import { OrderCartItems } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  cartItems: OrderCartItems[];
}

const CartItems = ({ cartItems }: Props) => {
  return (
    <div className="flex items-center justify-start  gap-3 ">
      {cartItems.map((item) => {
        return (
          <div key={item.id}>
            <Link
              target="_blank"
              href={`/product/${item.product.id}/${urlMaker(item.product.title)}`}
            >
              <Image
                src={item.product.image_url}
                width={60}
                height={60}
                alt={item.product.title}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;
