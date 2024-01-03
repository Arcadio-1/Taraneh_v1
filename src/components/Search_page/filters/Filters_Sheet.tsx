import React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components_shadcn/ui/sheet";
import FilterIcon from "@/components/Util/icons/FilterIcon";

const Filters_Sheet = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex items-center justify-center">
          <FilterIcon clasess="w-8 h-8 fill-red" />
          <span className="text-xl font-iranyekan_bold cursor-pointer text-dark_2 px-2 py-1 rounded-lg ">
            فیلتر
          </span>
        </div>
      </SheetTrigger>
      <SheetContent side={"bottom"}>
        <SheetHeader className="flex justify-between items-start mb-5">
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
