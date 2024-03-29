"use Client";
import Control_amount from "@/components/Util/components/orderControl/Control_amount";
import Prod_price from "@/components/Util/components/Prod_price";
import { SheetClose } from "@/components/Util/shadcn/ui/sheet";
import { CartItemWithProduct } from "@/types_validation/type";
import { urlMaker } from "@/util_functions/urlMaker";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  cart_item: CartItemWithProduct;
  classess?: string;
  sheet: boolean;
}

const Entry_item = ({ cart_item, sheet, classess }: Props) => {
  return (
    <div
      className={`grid grid-cols-3 border-b-2 px-2 py-2 last:border-b-0 ${classess}`}
    >
      {sheet ? (
        <SheetClose asChild>
          <Link
            href={`/product/${cart_item.productId}/${urlMaker(cart_item.product.title)}`}
          >
            <Image
              src={cart_item.product.image_url}
              width={100}
              height={100}
              alt={cart_item.product.title}
            />
          </Link>
        </SheetClose>
      ) : (
        <Link
          href={`/product/${cart_item.productId}/${urlMaker(cart_item.product.title)}`}
        >
          <Image
            src={cart_item.product.image_url}
            width={100}
            height={100}
            alt={cart_item.product.title}
          />
        </Link>
      )}

      <div className="col-span-2 flex flex-col justify-between">
        <span className="font-iranyekan_bold text-xl font-bold">
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
