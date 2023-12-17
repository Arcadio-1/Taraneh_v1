"use client";
import React, { useEffect, useState } from "react";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components_shadcn/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components_shadcn/ui/form";
import { Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { commentSchame } from "@/lib/util/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components_shadcn/ui/input";
import { Slider } from "@/components_shadcn/ui/slider";
import DotIcon from "@/components/Util/icons/DotIcon";
import { Textarea } from "@/components_shadcn/ui/textarea";
import { Session } from "next-auth";
import { Recommendation } from "@prisma/client";
import { add_comment } from "@/lib/actions/manageReview";
// import { toast } from "@/components_shadcn/ui/use-toast";
// import { useToast } from "@/components_shadcn/ui/use-toast";
import { toast } from "@/components_shadcn/ui/use-toast";
enum RateEnum {
  Empty = 0,
  Very_bad = 10,
  Bad = 20,
  Good = 30,
  Very_good = 40,
  Excellent = 50,
}

interface Props {
  session: Session;
  product_id: string;
  product_title: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Add_review_form = ({
  session,
  product_id,
  product_title,
  setOpen,
}: Props) => {
  const rateRange = [0, 1, 2, 3, 4, 5];
  const form = useForm<z.infer<typeof commentSchame>>({
    resolver: zodResolver(commentSchame),
    defaultValues: {
      text: "",
      title: "",
      rate: 0,
      buyer: false,
      like: [],
      dislike: [],
      parent: null,
      date: new Date(),
      product_id: product_id,
      userId: session.user.id,
      recommendation: Recommendation.NOT_RECOMMENDED,
    },
  });
  const onSubmit = async (values: z.infer<typeof commentSchame>) => {
    const validation = commentSchame.safeParse(values);
    if (validation.success) {
      const request = await add_comment(validation.data, product_id);
      console.log(request);
      if (request) {
        setOpen(false);
        toast({
          duration: 2500,
          title: "دیدگاه شما با موفقیت ثبت شد",
          className: "bg-success text-light_1 text-xl",
        });
      }
      if (!request) {
        toast({
          duration: 2500,
          title: "خطا در ثبت دیدگاه",
          className: "bg-success text-light_1 text-xl",
        });
      }
    }
  };

  return (
    <>
      <DialogHeader className=" flex flex-col gap-3">
        <DialogTitle className="text-xl">دیدگاه شما</DialogTitle>
        <Divider className="my-" />
        <DialogDescription className="text-dark_2 text-lg font-iranyekan_bold">
          {product_title}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem className="grow pb-5">
                <FormLabel className="text-lg font-iranyekan_bold">
                  امتیاز شما
                </FormLabel>
                <span className="text-g1_5 text-lg">*</span>
                <div className="flex gap-3 items-center">
                  <div className="relative grow">
                    <FormControl>
                      <Slider
                        // {...field}
                        dir="rtl"
                        defaultValue={[RateEnum.Empty]}
                        max={RateEnum.Excellent}
                        step={10}
                        onValueChange={(e) => {
                          console.log(e[0]);
                          form.setValue("rate", e[0]);
                        }}
                        className={`bg-g1_7 rounded-lg z-10`}
                      />
                    </FormControl>
                    <div className="flex items-center justify-between absolute bottom-[-19px] w-full">
                      {rateRange.map((number) => {
                        return (
                          <div key={number} className="flex flex-col">
                            <DotIcon classes="h-6 w-6 fill-g1_7" />
                            <span className="text-center text-xl font-iransansnum w-full grow mx-auto">
                              {number}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <FormMessage className="pt-2 text-md text-red-800 font-iranyekan_bold" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel className="text-lg font-iranyekan_bold">
                  عنوان
                </FormLabel>
                <span className="text-g1_5 text-lg">*</span>
                <FormControl>
                  <Input
                    className="rounded-[4px] border border-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-md text-red-800 font-iranyekan_bold" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel className="text-lg font-iranyekan_bold">
                  متن دیدگاه
                </FormLabel>
                <span className="text-g1_5 text-lg">*</span>
                <FormControl>
                  <Textarea
                    className="rounded-[4px] border border-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-md text-red-800 font-iranyekan_bold" />
              </FormItem>
            )}
          />
          <DialogFooter className="items-end">
            <button
              className="bg-g1_7 mt-8 text-light_1 rounded-lg hover:scale-[1.01] px-6 py-2 text-lg font-iranyekan_bold"
              type="submit"
            >
              ثبت دیدگاه
            </button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default Add_review_form;
