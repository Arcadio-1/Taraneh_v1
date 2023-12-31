"use client";
import { cancelOrder } from "@/lib/actions/manageOrders";
import React, { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components_shadcn/ui/alert-dialog";
import { useRouter } from "next/navigation";

import { useToast } from "@/components_shadcn/ui/use-toast";
interface Props {
  order_id: string;
}

const OrderCancling = ({ order_id }: Props) => {
  const route = useRouter();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="flex items-center justify-end ">
              <button className="bg-g1_5 text-light_1 px-10 py-2 rounded-lg">
                لغو مرسوله
              </button>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-light_1">
            <AlertDialogHeader className="flex flex-col items-start">
              <AlertDialogTitle>
                آیا از لغو سفارش خود مطمئن هستید؟
              </AlertDialogTitle>
              <AlertDialogDescription className="text-md text-right">
                در صورت لغو سفارش مبلغ پرداختی شما در 48 ساعت آینده عودت داده
                میشود
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex gap-5">
              <AlertDialogAction
                className="bg-g1_5 text-light_1 hover:bg-g1_5 text-lg"
                onClick={async () => {
                  const canceling = await cancelOrder(order_id);
                  if (canceling) {
                    toast({
                      duration: 2500,
                      title: "لغو سفارش انجام شد !",
                      className: "bg-g1_5 text-light_1 text-xl",
                    });
                  }
                }}
              >
                بله
              </AlertDialogAction>
              <AlertDialogCancel className="text-lg">خیر</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default OrderCancling;
