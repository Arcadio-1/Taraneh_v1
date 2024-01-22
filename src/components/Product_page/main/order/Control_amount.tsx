"use client";
import React, { useTransition } from "react";
import { manageCart } from "@/actions/manageCart";
import { Operate } from "@/types_validation/type";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useGlobalContext } from "@/app/(provider)/Provider";

interface Props {
  product_id: string;
  amount: number;
  classess?: string;
}

const Control_amount = ({ amount, product_id, classess }: Props) => {
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={`mt-5 flex w-full max-w-[35rem] items-center justify-between rounded-xl px-2 py-4 shadow-[0px_1px_5px_rgba(0,0,0,0.40)] lg:px-1 lg:py-1 ${classess}`}
    >
      <button
        onClick={async () => {
          startTransition(async () => {
            await manageCart(product_id, Operate.increment);
          });
        }}
        disabled={isPending}
      >
        <PlusIcon stroke="#ef4056" className="h-10 w-10 p-2" />
      </button>

      <div className="text-2xl text-[#ef4056]">
        {isPending ? (
          <span className="loading loading-dots loading-md"></span>
        ) : (
          <span className="font-iransansnum">{amount}</span>
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
          <MinusIcon stroke="#ef4056" className="h-10 w-10 p-2" />
        ) : (
          <Trash2Icon stroke="#ef4056" className="h-10 w-10 p-2" />
        )}
      </button>
    </div>
  );
};

export default Control_amount;
