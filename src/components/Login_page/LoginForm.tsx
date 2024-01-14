"use client";
import React, { useEffect, useRef, useState } from "react";
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
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Sign } from "@/types/type";
import { phoneSchame } from "@/lib/util/validation";
import { checkPhone } from "@/lib/actions/phonecheck";
import { userSignup } from "@/lib/actions/userSignup";
import OtpInput from "react-otp-input";

const validationFormSchame = z.object({
  validationNumber: z.string().regex(/^\d{5}$|[۰۱۲۳۴۵۶۷۸۹]{5}$/, {
    message: "مثلا 12345",
  }),
});

const LoginForm = () => {
  const [otp, setOtp] = useState("");

  const callbackParam = useSearchParams().get("callback") || "/";
  const [sign, setSign] = useState<Sign>(Sign.undefined);

  const get_phone_form = useForm<z.infer<typeof phoneSchame>>({
    resolver: zodResolver(phoneSchame),
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

  useEffect(() => {
    Validationform.setValue("validationNumber", otp);
    validationFormSchame.safeParse({
      validationNumber: otp,
    }).success && Validationform.clearErrors();
  }, [otp]);

  const onSubmit = async (values: z.infer<typeof phoneSchame>) => {
    const existing_phone_number_check = await checkPhone(values);
    setSign(existing_phone_number_check.type);
  };

  const onSign = async (values: z.infer<typeof validationFormSchame>) => {
    if (sign === Sign.signUp) {
      await userSignup({ phone: get_phone_form.getValues().phone });
    }
    await signIn("credentials", {
      callbackUrl: callbackParam,
      phone: get_phone_form.getValues().phone,
    });
  };

  // const onSignup = async (values: z.infer<typeof validationFormSchame>) => {
  //   console.log(get_phone_form.getValues().phone);
  // const regester = await axios.post(
  //   "/api/regester",
  //   {
  //     phone: phoneNumber,
  //   },
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
  // onLogin(values);
  // await signIn("credentials", {
  //   callbackUrl: "/profile",
  //   phone: phoneNumber,
  // });
  // };

  return (
    <div className="p-4  md:p-6 md:min-w-[35rem] rounded-lg md:shadow-[0px_1px_5px_rgba(0,0,0,0.20)]">
      {sign === Sign.undefined && (
        <>
          <h1 className="text-xl mb-5">ورود | ثبت نام</h1>
          <Form {...get_phone_form}>
            <form onSubmit={get_phone_form.handleSubmit(onSubmit)}>
              <FormField
                control={get_phone_form.control}
                name="phone"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col gap-4">
                      <FormLabel className="text-lg">
                        لطفا شماره موبایل خود را وارد کنید
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="border-transparent bg-gray-100 rounded-[5px] text-2xl font-iransansnum h-12 "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-700 text-xl" />
                    </FormItem>
                  );
                }}
              />
              <div className="pt-6 space-x-1 gap-2 flex items-center justify-end">
                <Button
                  className="bg-g1_5 text-light_1 rounded-xl font-iranyekan_bold text-xl py-7 w-full hover:bg-g1_5"
                  type="submit"
                >
                  ادامه
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
      {(sign === Sign.signin || sign === Sign.signUp) && (
        <>
          {sign === Sign.signin && (
            <h1 className="text-xl mb-5">ورود به حساب کاربری</h1>
          )}
          {sign === Sign.signUp && <h1 className="text-xl mb-5">ثبت نام</h1>}

          <Form {...Validationform}>
            <form onSubmit={Validationform.handleSubmit(onSign)}>
              <FormField
                control={Validationform.control}
                name="validationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-lg mb-5">
                      {`کد تایید برای شماره ${
                        get_phone_form.getValues().phone
                      } پیامک شد`}
                    </FormLabel>
                    <div
                      dir="ltr"
                      className="flex items-center justify-center py-2 focus:outline-transparent "
                    >
                      <FormControl>
                        <OtpInput
                          shouldAutoFocus
                          containerStyle={"rtl"}
                          inputStyle={
                            "bg-gray-100 !w-14 !h-14 text-2xl iran font-iransansnum focus:outline-g1_7"
                          }
                          value={otp}
                          inputType="tel"
                          onChange={setOtp}
                          numInputs={5}
                          renderSeparator={<span className="w-4"></span>}
                          renderInput={(props) => <input {...props} />}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-red-700 text-lg" />
                    <FormLabel className="text-g1_7 font-iranyekan_bold mt-6 text-lg">
                      *لطفا یک عدد 5 رقمی وارد کنید
                    </FormLabel>
                    <div>
                      <span
                        className="mt-2 bg-g1_7 text-white opacity-60 hover:opacity-100 transition-opacity px-2 py-1 rounded-lg text-lg cursor-pointer"
                        onClick={() => {
                          setOtp("");
                          setSign(Sign.undefined);
                        }}
                      >
                        ویرایش شماره
                      </span>
                    </div>
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
      {sign === Sign.error && (
        <>
          <h1 className="mb-5 text-center text-[10rem]">😐</h1>
        </>
      )}
    </div>
  );
};

export default LoginForm;
