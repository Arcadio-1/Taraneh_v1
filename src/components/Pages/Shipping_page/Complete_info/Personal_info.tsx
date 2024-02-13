"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Util/shadcn/ui/form";
import { Input } from "@/components/Util/shadcn/ui/input";
import { PersonalInfoSchame } from "@/types_validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Divider from "@/components/Util/ui/Divider";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { convert_to_en_number } from "@/util_functions/translateNumbers";
import { toast } from "@/hook/use-toast";
import { addPersonalInfo } from "@/actions/userInfo/personalInfo/addPersonalInfo";

const Personal_info = () => {
  const { update } = useSession();

  const form = useForm<z.infer<typeof PersonalInfoSchame>>({
    resolver: zodResolver(PersonalInfoSchame),
    defaultValues: {
      name: "",
      family: "",
      code_meli: "",
    },
  });
  const onSubmitPresonalInfo = async (
    values: z.infer<typeof PersonalInfoSchame>,
  ): Promise<void> => {
    const personal_info: z.infer<typeof PersonalInfoSchame> = {
      name: values.name,
      family: values.family,
      code_meli: convert_to_en_number(values.code_meli),
    };
    const isValid = PersonalInfoSchame.safeParse(personal_info);
    if (!isValid.success) {
      toast({
        duration: 2500,
        title: isValid.error.message,
        className: "bg-g1_5 text-light_1 text-xl",
      });
      return;
    }

    const request = await addPersonalInfo(personal_info);

    if (!request.ok) {
      toast({
        duration: 2500,
        title: request.message,
        className: "bg-g1_5 text-light_1 text-xl",
      });
    } else {
      const updateSession = await update({
        feild: "personal_info",
      });
      if (!updateSession) {
        toast({
          duration: 2500,
          title: "لطفا مجددا به حساب کاربری خود وارد شوید",
          className: "bg-error text-light_1 text-xl",
        });
      } else {
        toast({
          duration: 2500,
          title: request.message,
          className: "bg-success text-light_1 text-xl",
        });
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    }
  };

  return (
    <div className=" bg-light_1 bg-opacity-100">
      <div className=" flex flex-col gap-3">
        <h1 className="text-xl"> لطفا اطلاعات شناسایی خود را وارد نمایید </h1>
        <Divider className="my-" />
        <p className="text-lg text-dark_2">
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
                  <span className="text-lg text-g1_5">*</span>
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
                  <span className="text-lg text-g1_5">*</span>
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
                <span className="text-lg text-g1_5">*</span>
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
              className="rounded-lg bg-g1_5 px-6 py-2 font-iranyekan_bold text-lg text-light_1 hover:scale-[1.01]"
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
