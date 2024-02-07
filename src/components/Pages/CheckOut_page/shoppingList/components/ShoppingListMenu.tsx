"use client";
import React, { useState } from "react";
import MenuDotIcon from "@/components/Util/ui/icons/MenuDotIcon";
import { Trash2Icon } from "lucide-react";
import { clear_cart_items } from "@/actions/ordering/cart_item/clear_cart_items";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/Util/shadcn/ui/popover";
import { Command, CommandItem } from "@/components/Util/shadcn/ui/command";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/Util/shadcn/ui/sheet";
import { toast } from "@/hook/use-toast";

interface Props {
  cart_id: string;
}

const ShoppingListMenu = ({ cart_id }: Props) => {
  const [open, setOpen] = useState(false);

  const clearCartHandler = async () => {
    const request = await clear_cart_items(cart_id);
    if (request.ok) {
      setOpen(false);
      toast({
        duration: 2500,
        title: request.message,
        className: "bg-success text-light_1 text-xl",
      });
    }
    if (!request.ok) {
      toast({
        duration: 2500,
        title: request.message,
        className: "bg-g1_5 text-light_1 text-xl",
      });
    }
    setOpen(false);
  };
  return (
    <div>
      <div className="hidden md:block">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>
            <MenuDotIcon />
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="!bg-transparent p-0 !shadow-transparent"
          >
            <Command className=" rounded-lg py-2 shadow-lg">
              <CommandItem
                className="flex flex-col items-start justify-start"
                onSelect={clearCartHandler}
              >
                <div className="flex cursor-pointer  items-start gap-2 px-2">
                  <Trash2Icon className=" h-6 w-6" />
                  <span className="text-md font-iranyekan_bold text-lg text-dark_4">
                    پاکسازی سبد خرید
                  </span>
                </div>
              </CommandItem>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuDotIcon />
          </SheetTrigger>
          <SheetContent
            className="flex flex-col gap-6 rounded-lg border pt-[5rem] shadow-lg"
            side={"bottom"}
          >
            <SheetClose asChild>
              <div
                onClick={clearCartHandler}
                className="flex w-full cursor-pointer items-center justify-between px-2"
              >
                <div className="flex items-start gap-2">
                  <Trash2Icon className=" h-6 w-6" />
                  <span className="text-md font-iranyekan_bold text-lg text-dark_4">
                    پاکسازی سبد خرید
                  </span>
                </div>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default ShoppingListMenu;
