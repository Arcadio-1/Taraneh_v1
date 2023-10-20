"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components_shadcn/ui/form";
import { Input } from "@/components_shadcn/ui/input";
import { personalInfoFormSchame } from "@/lib/util/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  userId: string;
}

const Personal_info = ({ userId }: Props) => {
  const { update } = useSession();

  const form = useForm<z.infer<typeof personalInfoFormSchame>>({
    resolver: zodResolver(personalInfoFormSchame),
    defaultValues: {
      name: "",
      family: "",
      code_meli: "",
    },
  });

  const onSubmitPresonalInfo = async (
    values: z.infer<typeof personalInfoFormSchame>
  ) => {
    const res = update({
      feild: "personal_info",
      id: userId,
      data: { ...values },
    });
    const res2 = await res;
    if (res2) {
      location.reload();
    }
  };

  return (
    <div className=" bg-opacity-100 bg-light_1">
      <div className=" flex flex-col gap-3">
        <h1 className="text-xl"> لطفا اطلاعات شناسایی خود را وارد نمایید </h1>
        <Divider className="my-" />
        <p className="text-dark_2 text-lg">
          لطفا اطلاعات شناسایی خود را وارد کنید. نام و نام خانوادگی شما باید با
          اطلاعاتی که وارد می‌کنید همخوانی داشته باشند.
        </p>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmitPresonalInfo)}
        >
          <div className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel className="text-md">نام</FormLabel>
                  <span className="text-g1_5 text-lg">*</span>
                  <FormControl>
                    <Input
                      className="rounded-[4px] border border-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="family"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">نام خانوادگی</FormLabel>
                  <span className="text-g1_5 text-lg">*</span>
                  <FormControl>
                    <Input
                      className="rounded-[4px] border border-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="code_meli"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">کد ملی</FormLabel>
                <span className="text-g1_5 text-lg">*</span>
                <FormControl>
                  <Input
                    className="rounded-[4px] border border-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <button
              className="bg-g1_5 text-light_1 rounded-lg hover:scale-[1.01] px-6 py-2 text-lg font-iranyekan_bold"
              type="submit"
            >
              ثبت اطلاعات شناسایی
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Personal_info;
