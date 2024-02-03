import React from "react";
// import Add_prod_btn from "./Add_prod_btn";
import Control_amount from "../../../../Util/components/orderControl/Control_amount";
import Prod_price from "../../../../Util/components/Prod_price";
import { getCart } from "@/actions/getCart";

interface Props {
  price: number;
  offPercent: number;
  product_id: string;
}

const Prod_order_form = async ({ price, offPercent, product_id }: Props) => {
  const cart = await getCart();
  const amount = () => {
    if (cart) {
      const product = cart.items.find((item) => item.productId === product_id);
      if (product) {
        return product.quantity;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
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
