"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Util/shadcn/ui/dialog";
import Divider from "@/components/Util/ui/Divider";
import { useEffect, useState } from "react";
import { PhoneSchame } from "@/types_validation/validation";
import { z } from "zod";
import AuthIconOne from "@/components/Util/ui/icons/AuthIconOne";
import AuthIconTwo from "@/components/Util/ui/icons/AuthIconTwo";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import { getNewPhone } from "@/actions/userInfo/changePhone/redisActions/getNewPhone";

interface Props {
  phone: string;
}

const Phone = ({ phone }: Props) => {
  const [mount, setMount] = useState(false);
  const [open, setOpen] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState<z.infer<
    typeof PhoneSchame
  > | null>(null);
  // const [newPhoneNumber, setNewPhoneNumber] = useState<z.infer<
  //   typeof PhoneSchame
  // > | null>("09183704735");

  useEffect(() => {
    const geter = async () => {
      const request = await getNewPhone();
      if (request.ok && request) {
        setNewPhoneNumber(request.phone);
      }
    };
    geter();
  }, [newPhoneNumber]);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) {
    <></>;
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <svg viewBox="0 0 24 24" className="h-6 w-6 cursor-pointer">
          <path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z" />
        </svg>
      </DialogTrigger>
      <DialogContent className="bg-light_1 bg-opacity-100 sm:max-w-[425px]">
        <DialogHeader className=" flex flex-col gap-3">
          <DialogTitle className="text-xl">ویرایش شماره موبایل</DialogTitle>
          <Divider />
          <ul className="flex items-center justify-between gap-2 px-20">
            <li className="flex flex-col items-center justify-center gap-2">
              <AuthIconOne isActive />
              {/* <span className="select-none whitespace-nowrap text-xl text-g1_7">
                احراز هویت
              </span> */}
            </li>
            <li
              className={`h-[2px] w-full grow ${!!newPhoneNumber ? "bg-g1_7" : "bg-gray-300"} opacity-60`}
            ></li>
            <li className="flex flex-col items-center justify-center gap-2">
              <AuthIconTwo isActive={!!newPhoneNumber} />
              {/* <span
                className={`select-none whitespace-nowrap text-xl  ${!!newPhoneNumber ? "text-g1_7" : "text-gray-300"}`}
              >
                احراز هویت
              </span> */}
            </li>
          </ul>
        </DialogHeader>
        {newPhoneNumber ? (
          <SecondStep setOpen={setOpen} newPhoneNumber={newPhoneNumber} />
        ) : (
          <FirstStep
            currentPhone={phone}
            setNewPhoneNumber={setNewPhoneNumber}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Phone;
