import React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/Util/shadcn/ui/sheet";
import FilterIcon from "@/components/Util/ui/icons/FilterIcon";

const Filters_Sheet = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex items-center justify-center">
          <FilterIcon clasess="w-8 h-8 fill-red" />
          <span className="cursor-pointer rounded-lg px-2 py-1 font-iranyekan_bold text-xl text-dark_2 ">
            فیلتر
          </span>
        </div>
      </SheetTrigger>
      <SheetContent side={"bottom"}>
        <SheetHeader className="mb-5 flex items-start justify-between">
          <SheetTitle className="font-iranyekan_bold text-xl text-dark_4">
            فیلتر ها
          </SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default Filters_Sheet;
