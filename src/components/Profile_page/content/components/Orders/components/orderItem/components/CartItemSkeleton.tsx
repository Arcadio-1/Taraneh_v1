import DotIcon from "@/components/Util/icons/DotIcon";
import { Skeleton } from "@/components_shadcn/ui/skeleton";
import { Divider } from "@mui/material";
import React from "react";

const CartItemSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col border rounded-lg gap-8">
        <div>
          <div className="flex gap-2 items-center px-6 py-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-5 w-32  rounded-lg" />
          </div>
          <div className="flex gap-2 items-center">
            <Skeleton className="h-3 w-16 rounded-lg " />
            <DotIcon classes="h-5 w-5 fill-dark_5" />
            <Skeleton className="h-3 w-24 rounded-lg " />
            <DotIcon classes="h-5 w-5 fill-dark_5" />
            <Skeleton className="h-3 w-16 rounded-lg " />
          </div>
        </div>
        <Divider />
        <div className="px-6 py-3 flex flex-col gap-6">
          <div className="flex">
            <div className="flex flex-col gap-3 grow">
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-7 rounded-lg" />
                <Skeleton className="h-4 w-12 rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-4 w-72 rounded-lg" />
              </div>
            </div>
            <div className="grow flex items-center justify-center">
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
      <div className="flex flex-col border rounded-lg gap-8">
        <div>
          <div className="flex gap-2 items-center px-6 py-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-5 w-32  rounded-lg" />
          </div>
          <div className="flex gap-2 items-center">
            <Skeleton className="h-3 w-16 rounded-lg " />
            <DotIcon classes="h-5 w-5 fill-dark_5" />
            <Skeleton className="h-3 w-24 rounded-lg " />
            <DotIcon classes="h-5 w-5 fill-dark_5" />
            <Skeleton className="h-3 w-16 rounded-lg " />
          </div>
        </div>
        <Divider />
        <div className="px-6 py-3 flex flex-col gap-6">
          <div className="flex">
            <div className="flex flex-col gap-3 grow">
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-7 rounded-lg" />
                <Skeleton className="h-4 w-12 rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-4 w-72 rounded-lg" />
              </div>
            </div>
            <div className="grow flex items-center justify-center">
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
      <div className="flex flex-col border rounded-lg gap-8">
        <div>
          <div className="flex gap-2 items-center px-6 py-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-5 w-32  rounded-lg" />
          </div>
          <div className="flex gap-2 items-center">
            <Skeleton className="h-3 w-16 rounded-lg " />
            <DotIcon classes="h-5 w-5 fill-dark_5" />
            <Skeleton className="h-3 w-24 rounded-lg " />
            <DotIcon classes="h-5 w-5 fill-dark_5" />
            <Skeleton className="h-3 w-16 rounded-lg " />
          </div>
        </div>
        <Divider />
        <div className="px-6 py-3 flex flex-col gap-6">
          <div className="flex">
            <div className="flex flex-col gap-3 grow">
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-7 rounded-lg" />
                <Skeleton className="h-4 w-12 rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-4 w-72 rounded-lg" />
              </div>
            </div>
            <div className="grow flex items-center justify-center">
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
