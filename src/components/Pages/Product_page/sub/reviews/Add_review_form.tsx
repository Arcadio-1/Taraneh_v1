"use client";
import React from "react";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Util/shadcn/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Util/shadcn/ui/form";
import Divider from "@/components/Util/ui/Divider";
import { useForm } from "react-hook-form";
import { commentSchame } from "@/types_validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/Util/shadcn/ui/input";
import { Slider } from "@/components/Util/shadcn/ui/slider";
import DotIcon from "@/components/Util/ui/icons/DotIcon";
import { Textarea } from "@/components/Util/shadcn/ui/textarea";
import { Session } from "next-auth";
import { Recommendation } from "@prisma/client";
import { add_comment } from "@/actions/product/manageReview";
// import { toast } from "@/components/Util/shadcn/ui/use-toast";
// import { useToast } from "@/components/Util/shadcn/ui/use-toast";
import { toast } from "@/hook/use-toast";
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
          className: "bg-g1_5 text-light_1 text-xl",
        });
      }
    }
  };

  return (
    <>
      <DialogHeader className=" flex flex-col gap-3">
        <DialogTitle className="text-xl">دیدگاه شما</DialogTitle>
        <Divider className="my-" />
        <DialogDescription className="font-iranyekan_bold text-lg text-dark_2">
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
                <FormLabel className="font-iranyekan_bold text-lg">
                  امتیاز شما
                </FormLabel>
                <span className="text-lg text-g1_5">*</span>
                <div className="flex items-center gap-3">
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
                        className={`z-10 rounded-lg bg-g1_7`}
                      />
                    </FormControl>
                    <div className="absolute bottom-[-19px] flex w-full items-center justify-between">
                      {rateRange.map((number) => {
                        return (
                          <div key={number} className="flex flex-col">
                            <DotIcon classes="h-6 w-6 fill-g1_7" />
                            <span className="mx-auto w-full grow text-center font-iransansnum text-xl">
                              {number}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <FormMessage className="text-md pt-2 font-iranyekan_bold text-red-800" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel className="font-iranyekan_bold text-lg">
                  عنوان
                </FormLabel>
                <span className="text-lg text-g1_5">*</span>
                <FormControl>
                  <Input
                    className="rounded-[4px] border border-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-md font-iranyekan_bold text-red-800" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel className="font-iranyekan_bold text-lg">
                  متن دیدگاه
                </FormLabel>
                <span className="text-lg text-g1_5">*</span>
                <FormControl>
                  <Textarea
                    className="rounded-[4px] border border-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-md font-iranyekan_bold text-red-800" />
              </FormItem>
            )}
          />
          <DialogFooter className="items-end">
            <button
              className="mt-8 rounded-lg bg-g1_7 px-6 py-2 font-iranyekan_bold text-lg text-light_1 hover:scale-[1.01]"
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
