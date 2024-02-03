"use client";
import React, { useTransition } from "react";
import { manageCartItem } from "@/actions/manageCartItem";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

import { Operate } from "@/types_validation/type";
interface Props {
  product_id: string;
  amount: number;
  classess?: string;
}

const Control_amount = ({ amount, product_id, classess }: Props) => {
  const [isPending, startTransition] = useTransition();

  const orderHandler = async (operation: Operate) => {
    startTransition(async () => {
      await manageCartItem(product_id, operation);
    });
  };

  return (
    <>
      {amount ? (
        <div
          className={cn(
            `mt-5 flex w-full max-w-[35rem] items-center justify-between rounded-xl px-2 py-4 shadow-[0px_1px_5px_rgba(0,0,0,0.40)] lg:px-1 lg:py-1`,
            classess,
          )}
        >
          <form action={orderHandler.bind(null, Operate.increment)}>
            <button type="submit" disabled={isPending}>
              <PlusIcon stroke="#ef4056" className="h-10 w-10 p-2" />
            </button>
          </form>
          <div className="text-2xl text-[#ef4056]">
            {isPending ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              <span className="font-iransansnum">{amount}</span>
            )}
          </div>
          <form action={orderHandler.bind(null, Operate.decrement)}>
            <button type="submit" disabled={isPending}>
              {amount > 1 ? (
                <MinusIcon stroke="#ef4056" className="h-10 w-10 p-2" />
              ) : (
                <Trash2Icon stroke="#ef4056" className="h-10 w-10 p-2" />
              )}
            </button>
          </form>
        </div>
      ) : (
        <form
          className="w-full"
          action={orderHandler.bind(null, Operate.increment)}
        >
          <button
            type="submit"
            className="mt-5 w-full max-w-xl rounded-[6px] bg-g1_5 py-2 text-light_1"
            disabled={isPending}
          >
            {isPending ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              "افزودن به سبد"
            )}
          </button>
        </form>
      )}
    </>
  );
};

export default Control_amount;
