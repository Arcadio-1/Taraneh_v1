"use client";
import React from "react";
import Control_amount from "../../../../Util/components/orderControl/Control_amount";
import Prod_price from "../../../../Util/components/Prod_price";
import { toast } from "@/hook/use-toast";
import { IResponseGetCat } from "@/actions/ordering/cart/getCart";

interface Props {
  price: number;
  offPercent: number;
  product_id: string;
  cartRequest: IResponseGetCat;
}

const Prod_order_form = ({
  cartRequest,
  price,
  offPercent,
  product_id,
}: Props) => {
  const amount = () => {
    if (!cartRequest.ok) {
      toast({
        duration: 2500,
        title: "خطا در دریافت سبد خرید",
        className: "bg-success text-light_1 text-xl",
      });
      return 0;
    }
    if (cartRequest.status === "NotFound") {
      return 0;
    }
    if ((cartRequest.status = "Success")) {
      const product = cartRequest.shoppingCart.items.find(
        (item) => item.productId === product_id,
      );
      if (product) {
        return product.quantity;
      } else {
        return 0;
      }
    }
    toast({
      duration: 2500,
      title: "Xخطا در دریافت سبد خرید",
      className: "bg-success text-light_1 text-xl",
    });
    return 0;
  };
  return (
    <div className="fixed bottom-0 right-0 z-40 w-full bg-slate-100 p-4 px-8 lg:static lg:bg-transparent lg:p-0">
      <div className="flex flex-row-reverse justify-between font-iransansnum lg:flex-col lg:items-end">
        <Prod_price offPercent={offPercent} price={price} />
        <Control_amount product_id={product_id} amount={amount()} />
      </div>
    </div>
  );
};

export default Prod_order_form;
