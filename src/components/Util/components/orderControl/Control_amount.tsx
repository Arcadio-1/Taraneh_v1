"use client";
import React, {
  //@ts-ignore
  useOptimistic,
} from "react";
import { manageCartItem } from "@/actions/ordering/cart_item/manageCartItem";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

import { Operate } from "@/types_validation/type";
import { toast } from "@/hook/use-toast";
interface Props {
  product_id: string;
  amount: number;
  classess?: string;
}

const Control_amount = ({ amount, product_id, classess }: Props) => {
  const [optimisticAmount, addOptimisticAmount] = useOptimistic<number>(
    amount,
    (state: number, operate: Operate) => {
      switch (operate) {
        case Operate.decrement: {
          return state - 1;
        }
        case Operate.remove: {
          return 0;
        }
        case Operate.increment: {
          return state + 1;
        }
      }
    },
  );

  const actionHandler = async (operation: Operate) => {
    addOptimisticAmount(operation);
    const request = await manageCartItem(product_id, operation);
    if (request.ok) {
      toast({
        duration: 2000,
        title: request.message,
        className: "bg-success text-light_1 text-xl",
      });
    } else {
      toast({
        duration: 2000,
        title: request.message,
        className: "bg-error text-light_1 text-xl",
      });
    }
  };
  return (
    <>
      {optimisticAmount ? (
        <div
          className={cn(
            `mt-5 flex w-full max-w-[35rem] items-center justify-between rounded-xl px-2 py-2 font-iransansnum shadow-[0px_1px_5px_rgba(0,0,0,0.40)] lg:px-1 lg:py-1`,
            classess,
          )}
        >
          <form action={() => actionHandler(Operate.increment)}>
            <button type="submit">
              <PlusIcon stroke="#ef4056" className="h-10 w-10 p-2" />
            </button>
          </form>

          <div className="text-2xl text-[#ef4056]">
            <span className="font-iransansnum">{optimisticAmount}</span>
          </div>
          <form action={() => actionHandler(Operate.decrement)}>
            <button type="submit">
              {optimisticAmount > 1 ? (
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
          action={() => actionHandler(Operate.increment)}
        >
          <button
            type="submit"
            className="mt-5 w-full max-w-xl rounded-[6px] bg-g1_5 py-2 text-light_1"
          >
            افزودن به سبد
          </button>
        </form>
      )}
    </>
  );
};

export default Control_amount;
