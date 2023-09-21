import TomanIcon from "@/components/Util/icons/TomanIcon";
import { price_format } from "@/lib/util/price_formt";
import React from "react";
import { ShoppingCart } from "@/types/type";
import Add_prod_btn from "./Add_prod_btn";
import Control_amount from "./Control_amount";

interface Props {
  price: number;
  offPercent: number;
  product_Id: string;
  amount: number;
}

const Prod_order_form = ({ price, offPercent, product_Id, amount }: Props) => {
  const pricer = price_format(price, offPercent);

  return (
    <div className="fixed bottom-0 right-0 w-full bg-slate-100 p-4 px-8 lg:static lg:p-0 lg:bg-transparent z-10">
      <div className="flex lg:flex-col lg:items-end font-iransansnum justify-between flex-row-reverse">
        <div className="flex items-center flex-col gap-4 lg:gap-2">
          {!!offPercent && (
            <div className=" flex gap-3">
              <span className="line-through text-opacity-50">
                {pricer.price}
              </span>
              <span className="bg-g1_5 text-light_1 py-[1px] px-3 rounded-2xl">
                {pricer.off_percent}
              </span>
            </div>
          )}
          <div className="flex">
            <span className="text-2xl font-bold">
              {pricer.off_percent ? pricer.off_price : pricer.price}
            </span>
            <TomanIcon classes="h-6 w-6" />
          </div>
        </div>
        {amount === 0 ? (
          <Add_prod_btn product_id={product_Id} amount={amount} />
        ) : (
          <Control_amount product_id={product_Id} amount={amount} />
        )}
      </div>
    </div>
  );
};

export default Prod_order_form;
