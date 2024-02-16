import DotIcon from "@/components/Util/ui/icons/DotIcon";
import { Skeleton } from "@/components/Util/shadcn/ui/skeleton";
import Divider from "@/components/Util/ui/Divider";
import React from "react";

const CartItemSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-8 rounded-lg border">
        <div>
          <div className="flex items-center gap-2 px-6 py-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-5 w-32  rounded-lg" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-16 rounded-lg " />
            <DotIcon classes="h-5 w-5 fill-dark_5" />
            <Skeleton className="h-3 w-24 rounded-lg " />
            <DotIcon classes="h-5 w-5 fill-dark_5" />
            <Skeleton className="h-3 w-16 rounded-lg " />
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-6 px-6 py-3">
          <div className="flex">
            <div className="flex grow flex-col gap-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-7 rounded-lg" />
                <Skeleton className="h-4 w-12 rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-4 w-72 rounded-lg" />
              </div>
            </div>
            <div className="flex grow items-center justify-center">
              <Skeleton className=" h-4 w-[25rem] rounded-lg" />
            </div>
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-16 w-16 rounded-lg" />
            <Skeleton className="h-16 w-16 rounded-lg" />
            <Skeleton className="h-16 w-16 rounded-lg" />
            <Skeleton className="h-16 w-16 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 rounded-lg border">
        <div>
          <div className="flex items-center gap-2 px-6 py-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-5 w-32  rounded-lg" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-16 rounded-lg " />
            <DotIcon classes="h-5 w-5 fill-dark_5" />
            <Skeleton className="h-3 w-24 rounded-lg " />
            <DotIcon classes="h-5 w-5 fill-dark_5" />
            <Skeleton className="h-3 w-16 rounded-lg " />
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-6 px-6 py-3">
          <div className="flex">
            <div className="flex grow flex-col gap-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-7 rounded-lg" />
                <Skeleton className="h-4 w-12 rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-4 w-72 rounded-lg" />
              </div>
            </div>
            <div className="flex grow items-center justify-center">
              <Skeleton className=" h-4 w-[25rem] rounded-lg" />
            </div>
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-16 w-16 rounded-lg" />
            <Skeleton className="h-16 w-16 rounded-lg" />
            <Skeleton className="h-16 w-16 rounded-lg" />
            <Skeleton className="h-16 w-16 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 rounded-lg border">
        <div>
          <div className="flex items-center gap-2 px-6 py-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-5 w-32  rounded-lg" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-16 rounded-lg " />
            <DotIcon classes="h-5 w-5 fill-dark_5" />
            <Skeleton className="h-3 w-24 rounded-lg " />
            <DotIcon classes="h-5 w-5 fill-dark_5" />
            <Skeleton className="h-3 w-16 rounded-lg " />
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-6 px-6 py-3">
          <div className="flex">
            <div className="flex grow flex-col gap-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-7 rounded-lg" />
                <Skeleton className="h-4 w-12 rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-4 w-72 rounded-lg" />
              </div>
            </div>
            <div className="flex grow items-center justify-center">
              <Skeleton className=" h-4 w-[25rem] rounded-lg" />
            </div>
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-16 w-16 rounded-lg" />
            <Skeleton className="h-16 w-16 rounded-lg" />
            <Skeleton className="h-16 w-16 rounded-lg" />
            <Skeleton className="h-16 w-16 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemSkeleton;
