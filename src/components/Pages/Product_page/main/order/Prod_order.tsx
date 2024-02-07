import Divider from "@/components/Util/ui/Divider";
import React from "react";
import Prod_status from "./Prod_status";
import Prod_order_form from "./Prod_order_form";
import { getCart } from "@/actions/ordering/cart/getCart";

interface Props {
  status: Boolean;
  price: number;
  product_Id: string;
  offPercent: number;
}

const Prod_order = async ({ status, offPercent, price, product_Id }: Props) => {
  if (status) {
    const cart = await getCart();
    return (
      <div className="p-4 lg:flex lg:min-w-[180px] lg:max-w-[220px] lg:flex-col lg:gap-4 lg:rounded-xl lg:border-2 lg:bg-slate-100">
        <Prod_status />
        <Divider />
        <Prod_order_form
          cartRequest={cart}
          offPercent={offPercent}
          price={price}
          product_id={product_Id}
        />
      </div>
    );
  }
  return (
    <div>
      <p>ناموجود</p>
    </div>
  );
};

export default Prod_order;
