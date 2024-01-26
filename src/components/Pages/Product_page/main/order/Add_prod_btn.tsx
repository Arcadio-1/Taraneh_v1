import React, { useTransition } from "react";
import { manageCart } from "@/actions/manageCart";
import { Operate } from "@/types_validation/type";

interface Props {
  product_id: string;
  amount: number;
}

const Add_prod_btn = ({ amount, product_id }: Props) => {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className="w mt-5 w-full max-w-xl rounded-[6px] bg-g1_5 py-2 text-light_1"
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
