"use client";
import React, { useState } from "react";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components_shadcn/ui/form";
import { Input } from "@/components_shadcn/ui/input";
import { Button } from "@/components_shadcn/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Sign } from "@/types/type";
import axios from "axios";

const formSchame = z.object({
  phone: z.union([
    z.string().regex(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$/, {
      message: "شماره موبایل وارد شده صحیح نمیباشد مثال (09120001122)",
    }),
    z
      .string()
      .regex(
        /۰۹(۱[۰۱۲۳۴۵۶۷۸۹]|۳[۱۲۳۴۵۶۷۸۹]|۰[۱۲۳۴۵۶۷۸۹]|۲[۱۲۳۴۵۶۷۸۹])-?[۰۱۲۳۴۵۶۷۸۹]{3}-?[۰۱۲۳۴۵۶۷۸۹]{4}$/,
        { message: "(شماره موبایل وارد شده صحیح نمیباشد مثال (09120001122" }
      ),
  ]),
});
const validationFormSchame = z.object({
  validationNumber: z.string().regex(/[0-9]{5}$/, {
    message: "مثلا 12345",
  }),
});

// const formSchame = z.object({
//   phone: z.string().min(3, { message: "نام مورد نظر باید حداقل 3 حرف باشد" }),
// });

const LoginForm = () => {
  const router = useRouter();
  const [validationNumber, setValidationNumber] = useState(false);
  const [showValidationForm, setShowValidationForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [sign, setSign] = useState<Sign>();

  const form = useForm<z.infer<typeof formSchame>>({
    resolver: zodResolver(formSchame),
    defaultValues: {
      phone: "",
    },
  });
  const Validationform = useForm<z.infer<typeof validationFormSchame>>({
    resolver: zodResolver(validationFormSchame),
    defaultValues: {
      validationNumber: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchame>) => {
    setShowValidationForm(true);
    setPhoneNumber(values.phone);
    const signType = await fetch(`/api/log_type/${values.phone}`);
    const res: Sign = await signType.json();
    setSign((prev) => {
      return (prev = res);
    });
  };
  const onLogin = async (values: z.infer<typeof validationFormSchame>) => {
    await signIn("credentials", {
      callbackUrl: "/",
      phone: phoneNumber,
    });
  };

  const onSignup = async (values: z.infer<typeof validationFormSchame>) => {
    const regester = await axios.post(
      "/api/regester",
      {
        phone: phoneNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(regester);

    await signIn("credentials", {
      callbackUrl: "/",
      phone: phoneNumber,
    });
  };

  return (
    <div className="p-4 md:border md:p-6 md:min-w-[30rem]">
      {!showValidationForm && (
        <>
          <h1 className="text-xl mb-5">ورود | ثبت نام</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-5">
                      لطفا شماره موبایل خود را وارد کنید
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border-transparent bg-gray-200 rounded-[5px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-700" />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-1 gap-2 flex items-center justify-end">
                <Button
                  className="bg-g1_5 text-light_1 rounded-xl font-iranyekan_bold text-lg py-7 w-full hover:bg-g1_5"
                  type="submit"
                >
                  ادامه
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
      {showValidationForm && sign === Sign.signin && (
        <>
          <h1 className="text-xl mb-5">ورود به حساب کاربری</h1>
          <Form {...Validationform}>
            <form onSubmit={Validationform.handleSubmit(onLogin)}>
              <FormField
                control={Validationform.control}
                name="validationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-5 text-base">
                      {`کد تایید برای شماره ${phoneNumber} پیامک شد`}
                    </FormLabel>
                    <FormControl>
                      <Input
                        // type="str"
                        // max={5}
                        // min={5}
                        maxLength={5}
                        // pattern="\b\d{5}\b"
                        className="border-transparent bg-gray-200 rounded-[5px] text-xl tracking-[3rem] text-center"
                        {...field}
                      />
                    </FormControl>
                    <FormLabel className="text-green-600 font-iranyekan_bold">
                      لطفا یک عدد 5 رقمی وارد کنید
                    </FormLabel>
                    <FormMessage className="text-red-700" />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-1 gap-2 flex items-center justify-end">
                <Button
                  className="bg-g1_5 text-light_1 rounded-xl font-iranyekan_bold text-lg py-7 w-full hover:bg-g1_5"
                  type="submit"
                >
                  ادامه
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
      {showValidationForm && sign === Sign.signUp && (
        <>
          <h1 className="text-xl mb-5">ثبت نام</h1>
          <Form {...Validationform}>
            <form onSubmit={Validationform.handleSubmit(onSignup)}>
              <FormField
                control={Validationform.control}
                name="validationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-5 text-base">
                      {`کد تایید برای شماره ${phoneNumber} پیامک شد`}
                    </FormLabel>
                    <FormControl>
                      <Input
                        // type="str"
                        // max={5}
                        // min={5}
                        maxLength={5}
                        // pattern="\b\d{5}\b"
                        className="border-transparent bg-gray-200 rounded-[5px] text-xl tracking-[3rem] text-center"
                        {...field}
                      />
                    </FormControl>
                    <FormLabel className="text-green-600 font-iranyekan_bold">
                      لطفا یک عدد 5 رقمی وارد کنید
                    </FormLabel>
                    <FormMessage className="text-red-700" />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-1 gap-2 flex items-center justify-end">
                <Button
                  className="bg-g1_5 text-light_1 rounded-xl font-iranyekan_bold text-lg py-7 w-full hover:bg-g1_5"
                  type="submit"
                >
                  ادامه
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
      {showValidationForm && sign === Sign.error && (
        <>
          <h1 className="text-xl mb-5">کونت میخاره؟</h1>
          <Form {...Validationform}>
            <form onSubmit={Validationform.handleSubmit(onLogin)}>
              <FormField
                control={Validationform.control}
                name="validationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-5 text-base">
                      {`کد تایید برای شماره ${phoneNumber} پیامک شد`}
                    </FormLabel>
                    <FormControl>
                      <Input
                        // type="str"
                        // max={5}
                        // min={5}
                        maxLength={5}
                        // pattern="\b\d{5}\b"
                        className="border-transparent bg-gray-200 rounded-[5px] text-xl tracking-[3rem] text-center"
                        {...field}
                      />
                    </FormControl>
                    <FormLabel className="text-green-600 font-iranyekan_bold">
                      لطفا یک عدد 5 رقمی وارد کنید
                    </FormLabel>
                    <FormMessage className="text-red-700" />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-1 gap-2 flex items-center justify-end">
                <Button
                  className="bg-g1_5 text-light_1 rounded-xl font-iranyekan_bold text-lg py-7 w-full hover:bg-g1_5"
                  type="submit"
                >
                  ادامه
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </div>
  );
};

export default LoginForm;
