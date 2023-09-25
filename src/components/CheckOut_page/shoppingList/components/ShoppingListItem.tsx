import Control_amount from "@/components/Product_page/order/Control_amount";
import Prod_status from "@/components/Product_page/order/Prod_status";
import { CartItemWithProduct } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ShoppingListItemPrice from "./ShoppingListItemPrice";

interface Props {
  cart_item: CartItemWithProduct;
}

const ShoppingListItem = ({ cart_item }: Props) => {
  return (
    <div className="flex gap-4 border-b py-4 px-4 last:border-b-0">
      <div className="flex flex-col items-center shrink">
        <Link href={`/product/${cart_item.productId}`}>
          <Image
            src={cart_item.product.image_url}
            width={100}
            height={100}
            alt={cart_item.product.title}
          />
        </Link>
        <Control_amount
          product_id={cart_item.productId}
          amount={cart_item.quantity}
          classess="max-w-[10rem]  shadow-none border"
        />
      </div>
      <div className="grow flex justify-between">
        <div className="flex flex-col gap-4">
          <p className="font-iransansbold font-bold text-lg">
            {cart_item.product.title}
          </p>
          <Prod_status />
        </div>
        <div className="mt-auto">
          <ShoppingListItemPrice
            price={cart_item.product.price}
            off_percent={cart_item.product.off_percent}
            quantity={cart_item.quantity}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingListItem;
