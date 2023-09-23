import Control_amount from "@/components/Product_page/order/Control_amount";
import Prod_price from "@/components/Product_page/order/Prod_price";
import { CartItemWithProduct } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  cart_item: CartItemWithProduct;
}

const Entry_item = ({ cart_item }: Props) => {
  return (
    <div className="grid grid-cols-3 border-b-2 py-2 px-2 last:border-b-0">
      <Link href={`/product/${cart_item.productId}`}>
        <Image
          src={cart_item.product.image_url}
          width={200}
          height={200}
          alt={cart_item.product.title}
        />
      </Link>
      <div className="col-span-2 flex flex-col justify-between">
        <span className="text-xl font-bold font-iranyekan_bold">
          {cart_item.product.title}
        </span>
        <div className="flex items-center justify-between">
          <Control_amount
            classess="shadow-none border-2 m-2 max-w-[9rem]"
            product_id={cart_item.productId}
            amount={cart_item.quantity}
          />

          <Prod_price
            offPercent={cart_item.product.off_percent * cart_item.quantity}
            price={cart_item.product.price * cart_item.quantity}
          />
        </div>
      </div>
    </div>
  );
};

export default Entry_item;
