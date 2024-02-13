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
import Divider from "@/components/Util/ui/Divider";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { comparePasswordWithCurrentPasswordScham } from "@/types_validation/validation";
import { z } from "zod";
import { toast } from "@/hook/use-toast";
import ShowIcon from "@/components/Util/ui/icons/ShowIcon";
import HideIcon from "@/components/Util/ui/icons/HideIcon";
import PasswordPower from "./PasswordPower";
import changePasswordWithCurrentPassword from "@/actions/userInfo/password/changePasswordWithCurrentPassword";
import SpinnerIcon from "@/components/Util/ui/icons/SpinnerIcon";

interface Props {
  phone: string;
  userId: string;
}

const ChangePassword = ({ phone }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string>("");

  const form = useForm<z.infer<typeof comparePasswordWithCurrentPasswordScham>>(
    {
      resolver: zodResolver(comparePasswordWithCurrentPasswordScham),
      defaultValues: {
        currentPassword: "",
        password: "",
        confirmPassword: "",
      },
    },
  );

  const onSubmitChangeWithCurrentPassword = async (
    values: z.infer<typeof comparePasswordWithCurrentPasswordScham>,
  ) => {
    startTransition(async () => {
      const changePassword = await changePasswordWithCurrentPassword(values);

      if (!changePassword.ok) {
        toast({
          duration: 5000,
          title: changePassword.message,
          className: "bg-error text-light_1 text-xl",
        });
        return;
      }
      setOpen(false);
      toast({
        duration: 2500,
        title: changePassword.message,
        className: "bg-success text-light_1 text-xl",
      });
    });
  };

  const pass = form.watch().password;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <svg
          className={"h-7 w-7 cursor-pointer fill-dark_4"}
          viewBox="0 0 48 48"
        >
          <path d="M0 0h48v48h-48z" fill="none" />
          <path d="M25.3 20c-1.65-4.66-6.08-8-11.3-8-6.63 0-12 5.37-12 12s5.37 12 12 12c5.22 0 9.65-3.34 11.3-8h8.7v8h8v-8h4v-8h-20.7zm-11.3 8c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
        </svg>
      </DialogTrigger>
      <DialogContent className="bg-light_1 bg-opacity-100 sm:max-w-[425px]">
        <DialogHeader className=" flex flex-col gap-3">
          <DialogTitle className="text-xl">ویرایش کلمه عبور</DialogTitle>
          <Divider className="my-" />
          <DialogDescription className="text-lg text-dark_2">
            <span className="flex items-center gap-2 text-g1_7">
              ویرایش از طریق کلمه عبور فعلی
            </span>
            {/* <span>{lengthControl.success && "yes"}</span> */}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmitChangeWithCurrentPassword)}
          >
            {/* for password manager */}
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
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel className="text-lg">کلمه عبور فعلی</FormLabel>
                  <span className="text-lg text-g1_5">*</span>
                  <div className="relative">
                    <FormControl>
                      <Input
                        id="current-password"
                        autoComplete="current-password"
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
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel className="text-lg">کلمه عبور جدید</FormLabel>
                  <span className="text-lg text-g1_5">*</span>
                  <div className="relative">
                    <FormControl>
                      <Input
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
                      className="absolute left-2 top-2 cursor-pointer"
                    >
                      {showPassword ? <HideIcon /> : <ShowIcon />}
                    </div>
                    <FormMessage className="text-md pt-2 text-error" />
                    <PasswordPower
                      setSubmitError={setSubmitError}
                      password={pass}
                    />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel className="text-lg">تکرار کلمه عبور</FormLabel>
                  <span className="text-lg text-g1_5">*</span>
                  <div className="relative">
                    <FormControl>
                      <Input
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
                  <FormMessage className="text-md pt-2 text-error" />
                </FormItem>
              )}
            />
            <DialogFooter className="items-end">
              <button
                className="flex items-center justify-center rounded-lg bg-g1_5 px-6 py-2 font-iranyekan_bold text-lg text-light_1 hover:scale-[1.01]"
                type="submit"
              >
                ثبت کلمه عبور
                {isPending && <SpinnerIcon className="h-5 w-5 border-2" />}
              </button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
