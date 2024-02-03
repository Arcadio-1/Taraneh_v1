"use client";
import React from "react";
import { DialogHeader, DialogTitle } from "@/components/Util/shadcn/ui/dialog";
import Divider from "@/components/Util/ui/Divider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DialogClose } from "@radix-ui/react-dialog";

interface Props {}

const Login_dialog = ({}: Props) => {
  const pathname = usePathname();
  return (
    <>
      <DialogHeader className=" flex flex-col gap-3">
        <DialogTitle className="text-xl">
          لطفا ابتدا به حساب کاربری خود وارد شوید
        </DialogTitle>
        <Divider className="my-" />
      </DialogHeader>
      <div className="flex flex-col items-stretch justify-center gap-4 md:flex-row">
        <Link
          className="w-full bg-red-100 md:w-auto"
          href={`/users/login?callback=${pathname}`}
        >
          <button className="w-full rounded-lg bg-g1_5 px-8 py-3 font-iranyekan_bold text-lg text-light_1">
            ورود | ثبت نام
          </button>
        </Link>
        <DialogClose asChild>
          <button className="rounded-lg bg-slate-400 px-8 py-3 font-iranyekan_bold text-lg text-light_1 opacity-50">
            انصراف
          </button>
        </DialogClose>
      </div>
    </>
  );
};

export default Login_dialog;
