import React, { useTransition } from "react";
import { manageCart } from "@/lib/actions/manageCart";
import { Operate } from "@/types/type";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";

interface Props {
  product_id: string;
  amount: number;
}

const Control_amount = ({ amount, product_id }: Props) => {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="w-full max-w-[35rem] mt-5 shadow-[0px_1px_5px_rgba(0,0,0,0.40)] rounded-xl flex items-center justify-between px-2 py-4 lg:px-1 lg:py-1">
      <button
        onClick={async () => {
          startTransition(async () => {
            await manageCart(product_id, Operate.increment);
          });
        }}
        disabled={isPending}
      >
        <PlusIcon stroke="#ef4056" className="h-11 w-11 p-2" />
      </button>

      <div className="text-3xl text-[#ef4056]">
        {isPending ? (
          <span className="loading loading-dots loading-md"></span>
        ) : (
          <span>{amount}</span>
        )}
      </div>

      <button
        onClick={async () => {
          startTransition(async () => {
            await manageCart(product_id, Operate.decrement);
          });
        }}
        disabled={isPending}
      >
        {amount > 1 ? (
          <MinusIcon stroke="#ef4056" className="h-11 w-11 p-2" />
        ) : (
          <Trash2Icon stroke="#ef4056" className="h-11 w-11 p-2" />
        )}
      </button>
    </div>
  );
};

export default Control_amount;
