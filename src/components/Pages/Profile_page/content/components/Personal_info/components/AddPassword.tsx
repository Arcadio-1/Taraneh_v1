"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Util/shadcn/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Util/shadcn/ui/form";
import { Input } from "@/components/Util/shadcn/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  comparePasswordWithOtpScham,
  otpFormSchame,
} from "@/types_validation/validation";
import { z } from "zod";
import { toast } from "@/components/Util/shadcn/ui/use-toast";
import OTPInput from "react-otp-input";
import ShowIcon from "@/components/Util/ui/icons/ShowIcon";
import HideIcon from "@/components/Util/ui/icons/HideIcon";
import addPassword from "@/actions/addPassword";
import SpinnerIcon from "@/components/Util/ui/icons/SpinnerIcon";
import PasswordPower from "./PasswordPower";
import OtpButton from "@/components/Util/components/OptControl/OtpButton";
import { OtpType } from "@/types_validation/type";

interface Props {
  phone: string;
  hasPassword: boolean;
}

const AddPassword = ({ phone, hasPassword }: Props) => {
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { update } = useSession();

  const addPasswordform = useForm<z.infer<typeof comparePasswordWithOtpScham>>({
    resolver: zodResolver(comparePasswordWithOtpScham),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  useEffect(() => {
    addPasswordform.setValue("otpNumber", otp);
    otpFormSchame.safeParse({
      otpNumber: otp,
    }).success && addPasswordform.clearErrors();
  }, [otp]);

  const onSubmit = async (
    values: z.infer<typeof comparePasswordWithOtpScham>,
  ) => {
    setLoading(true);
    const request = await addPassword(values);
    if (!request.ok) {
      toast({
        duration: 2500,
        title: request.message,
        className: "bg-error text-light_1 text-xl",
      });
      setLoading(false);
      return;
    }
    if (!hasPassword) {
      const res = await update({
        feild: "addPasswordAndChangeWithOth",
        data: { password: values.password },
      });
      if (!res || !res.user.password) {
        toast({
          duration: 2500,
          title: "لطفا با رمز جدید مجددا به حساب کاربری خود وارد شوید",
          className: "bg-error text-light_1 text-xl",
        });
        setLoading(false);
        signOut({ callbackUrl: "/profile/personal-info" });
        return;
      }
    }
    setLoading(false);
    setOpen(false);
    toast({
      duration: 2500,
      title: request.message,
      className: "bg-success text-light_1 text-xl",
    });
    setTimeout(() => {
      location.reload();
    }, 2000);
    return;
  };
  const [open, setOpen] = useState(false);
  const pass = addPasswordform.watch().password;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <svg
          className={"h-7 w-7 cursor-pointer fill-dark_4"}
          viewBox="0 0 48 48"
        >
          <path d="M35,31.938V36H13V4h22v11h4V0H9v48h30V31.938H35z M24,43.959c-1.104,0-2-0.896-2-2s0.896-2,2-2  c1.105,0,2,0.896,2,2S25.105,43.959,24,43.959z" />
          <polygon points="29,17.999 29,28.5 29,29.062 29,32.094 33.062,29.062 45,29.062 45,17.999 " />
        </svg>
      </DialogTrigger>
      <DialogContent className="bg-light_1 bg-opacity-100 sm:max-w-[425px]">
        <DialogHeader className=" flex flex-col gap-3">
          <DialogTitle className="text-xl">
            {hasPassword
              ? "ویرایش کلمه عبور از طریق رمز یکبار مصرف"
              : "افزودن رمز عبور"}
          </DialogTitle>
          <Divider className="my-" />
          <DialogDescription className="text-lg text-dark_2">
            لطفا کلمه عبور مورد نظر خود را وارد نمایید
          </DialogDescription>
        </DialogHeader>
        <Form {...addPasswordform}>
          <form
            className="flex flex-col gap-4"
            onSubmit={addPasswordform.handleSubmit(onSubmit)}
          >
            {/* for Password Manager */}
            <input
              value={phone}
              readOnly={true}
              autoComplete="username"
              id="username"
              type="text"
              name="username"
              className="hidden"
              required
            />
            <FormField
              control={addPasswordform.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel className="text-md">کلمه عبور</FormLabel>
                  <span className="text-lg text-g1_5">*</span>
                  <div className="relative">
                    <FormControl>
                      <Input
                        disabled={loading}
                        autoComplete="new-password"
                        type={showPassword ? "text" : "password"}
                        // type="hidden"
                        className="rounded-[4px] border border-gray-400 text-xl"
                        {...field}
                      />
                    </FormControl>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPassword((prev) => {
                          return !prev;
                        });
                      }}
                      className="absolute left-2 top-2"
                    >
                      {showPassword ? <HideIcon /> : <ShowIcon />}
                    </div>
                  </div>
                  <FormMessage />
                  <PasswordPower
                    setSubmitError={setSubmitError}
                    password={pass}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={addPasswordform.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel className="text-md">تکرار کلمه عبور</FormLabel>
                  <span className="text-lg text-g1_5">*</span>
                  <div className="relative">
                    <FormControl>
                      <Input
                        disabled={loading}
                        autoComplete="new-password"
                        type={showPassword ? "text" : "password"}
                        className="rounded-[4px] border border-gray-400 text-xl"
                        {...field}
                      />
                    </FormControl>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPassword((prev) => {
                          return !prev;
                        });
                      }}
                      className="absolute left-2 top-2"
                    >
                      {showPassword ? <HideIcon /> : <ShowIcon />}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={addPasswordform.control}
              name="otpNumber"
              render={({ field }) => (
                <FormItem className="grow">
                  {/* <FormLabel className="text-md">
                    رمز یکبار مصرف
                    <span className="px-2 font-iransansnum font-bold">
                      ({phone})
                    </span>
                  </FormLabel>
                  <span className="text-lg text-g1_5">*</span> */}
                  <div
                    dir="ltr"
                    className="flex flex-col items-end justify-evenly gap-4"
                  >
                    <OtpButton phone={phone} otpType={OtpType.changePassword} />
                    <FormControl>
                      <OTPInput
                        shouldAutoFocus
                        containerStyle={"rtl"}
                        inputStyle={`bg-gray-100 !w-14 !h-14 text-2xl iran font-iransansnum focus:outline-g1_7 ${loading ? "cursor-not-allowed" : ""}`}
                        value={otp}
                        inputType="tel"
                        onChange={setOtp}
                        numInputs={5}
                        renderSeparator={<span className="w-4"></span>}
                        renderInput={(props) => (
                          <input disabled={loading} {...props} />
                        )}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-lg text-g1_5" />
                </FormItem>
              )}
            />
            <DialogFooter className="items-end">
              <button
                disabled={loading}
                className="rounded-lg bg-g1_5 px-6 py-2 font-iranyekan_bold text-lg text-light_1 hover:scale-[1.01]"
                type="submit"
              >
                {loading ? <SpinnerIcon /> : "ثبت کلمه عبور"}
              </button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPassword;
