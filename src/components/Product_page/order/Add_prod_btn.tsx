import React, { useTransition } from "react";
import { manageCart } from "@/lib/actions/manageCart";
import { Operate } from "@/types/type";

interface Props {
  product_id: string;
  amount: number;
}

const Add_prod_btn = ({ amount, product_id }: Props) => {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className="bg-g1_5 rounded-[6px] w py-2 w-full max-w-xl text-light_1 mt-5"
      onClick={async () => {
        startTransition(async () => {
          await manageCart(product_id, Operate.increment);
        });
      }}
      disabled={isPending}
    >
      {isPending ? (
        <span className="loading loading-dots loading-md"></span>
      ) : (
        "افزودن به سبد"
      )}
    </button>
  );
};

export default Add_prod_btn;
