import { OrderCartItems } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  cartItems: OrderCartItems[];
}

const CartItems = ({ cartItems }: Props) => {
  return (
    <div className="flex gap-3 items-center  justify-start ">
      {cartItems.map((item) => {
        return (
          <div key={item.id}>
            <Link target="_blank" href={`/product/${item.product.id}`}>
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
