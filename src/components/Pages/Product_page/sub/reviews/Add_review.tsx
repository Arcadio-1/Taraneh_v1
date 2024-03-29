"use client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/Util/shadcn/ui/dialog";
import { Rating } from "@mui/material";
import React, { useState } from "react";
import Add_review_form from "./Add_review_form";
import { Session } from "next-auth";
import Login_dialog from "@/components/Util/components/login_dialog/Login_dialog";

interface Props {
  rate: number;
  session: Session | null;
  product_id: string;
  product_title: string;
  short: boolean;
}

const Add_review = ({
  rate,
  session,
  product_id,
  product_title,
  short,
}: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      {!short && (
        <>
          <div className="flex items-center gap-1 font-iransansnum">
            <span className="text-[2.2rem]">{rate / 10}</span>
            <span>از</span>
            <span>5</span>
          </div>
          <div className="flex items-center gap-2">
            <Rating
              dir="ltr"
              className="!flex !flex-row-reverse"
              name="size-medium"
              defaultValue={rate / 10}
              precision={0.5}
              readOnly
              sx={{
                ".MuiRating-decimal": {
                  direction: "rtl",
                  span: {
                    right: 0,
                  },
                },
              }}
              size="large"
            />
            <span className="text-dark_4">از مجموع 453 امتیاز</span>
          </div>
          <p className="text-lg">شما هم درباره این کالا دیدگاه ثبت کنید</p>
        </>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="rounded-lg border border-g1_7 bg-transparent px-12 py-4 text-xl text-g1_7">
            ثبت دیدگاه
          </button>
        </DialogTrigger>

        <DialogContent className="bg-light_1 bg-opacity-100 sm:max-w-[425px]">
          {session && (
            <Add_review_form
              product_id={product_id}
              product_title={product_title}
              session={session}
              setOpen={setOpen}
            />
          )}
          {!session && <Login_dialog />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Add_review;
