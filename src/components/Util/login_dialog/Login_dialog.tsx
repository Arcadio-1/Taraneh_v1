"use client";
import React from "react";
import { DialogHeader, DialogTitle } from "@/components_shadcn/ui/dialog";
import { Divider } from "@mui/material";
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
      <div className="flex items-stretch justify-center gap-4 flex-col md:flex-row">
        <Link
          className="w-full md:w-auto bg-red-100"
          href={`/users/login?callback=${pathname}`}
        >
          <button className="bg-g1_5 w-full text-light_1 px-8 py-3 rounded-lg text-lg font-iranyekan_bold">
            ورود | ثبت نام
          </button>
        </Link>
        <DialogClose asChild>
          <button className="bg-slate-400 opacity-50 text-light_1 px-8 py-3 rounded-lg text-lg font-iranyekan_bold">
            انصراف
          </button>
        </DialogClose>
      </div>
    </>
  );
};

export default Login_dialog;
