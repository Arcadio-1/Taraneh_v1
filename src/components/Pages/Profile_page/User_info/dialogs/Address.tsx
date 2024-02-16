"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Util/shadcn/ui/dialog";
import { Address_Full } from "@/types_validation/type";
import { useState } from "react";
import AddressForm from "../../util/AddressForm/AddressForm";
import Divider from "@/components/Util/ui/Divider";

interface Props {
  address: Address_Full | null;
}

const Address = ({ address }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <svg viewBox="0 0 24 24" className="h-6 w-6 cursor-pointer">
          <path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z" />
        </svg>
      </DialogTrigger>
      <DialogContent className="bg-light_1 bg-opacity-100 sm:max-w-[425px]">
        <DialogHeader className=" flex flex-col gap-3">
          <DialogTitle className="text-xl">ثبت اطلاعات آدرس</DialogTitle>
          <Divider className="my-" />
          <DialogDescription className="text-lg text-dark_2">
            لطفا آدرس خود را جهت دریافت مرسوله پستی ثبت نمایید.
          </DialogDescription>
        </DialogHeader>
        <AddressForm address={address} setState={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default Address;
