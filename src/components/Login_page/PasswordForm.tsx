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
import { Sign } from "@/types/type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginPasswordSchame } from "@/lib/util/validation";
import { Input } from "@/components_shadcn/ui/input";
import ArrowIcon, { Arrow } from "../Util/icons/ArrowIcon";
import { Button } from "@/components_shadcn/ui/button";
import ArrowLongIcon from "../Util/icons/ArrowLongIcon";
import ShowIcon from "../Util/icons/ShowIcon";
import HideIcon from "../Util/icons/HideIcon";
import { signIn } from "next-auth/react";
import SpinnerIcon from "../Util/icons/SpinnerIcon";

interface Props {
  callbackParam: string;

  phone: string;
  setSign: React.Dispatch<React.SetStateAction<Sign>>;
  setSigninWithOtp: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordForm = ({
  setSigninWithOtp,
  setSign,
  phone,
  callbackParam,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logError, setLogError] = useState("");

  const passwordForm = useForm<z.infer<typeof loginPasswordSchame>>({
    resolver: zodResolver(loginPasswordSchame),
    defaultValues: {
      password: "",
    },
  });

  const onSignWithPassword = async (
    values: z.infer<typeof loginPasswordSchame>,
  ) => {
    try {
      setLoading(true);
      const req = await signIn("credentials", {
        redirect: false,
        callbackUrl: callbackParam,
        phone: phone,
        password: values.password,
        method: "password",
      });
      setLoading(false);
      if (!req?.ok && req?.error) {
        setLogError(req.error);
      }
      if (req?.ok) {
        window.location.href = callbackParam;
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <button
        className=""
        onClick={() => {
          setSign(Sign.undefined);
        }}
      >
        <ArrowLongIcon classes="h-8 w-8 fill-dark_4" direction={Arrow.right} />
      </button>
      <Form {...passwordForm}>
        <form
          onSubmit={passwordForm.handleSubmit(onSignWithPassword)}
          className=""
        >
          <FormField
            control={passwordForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" mb-5 text-lg font-bold text-dark_4">
                  رمز عبور را وارد کنید
                </FormLabel>
                <div
                  dir="ltr"
                  className="relative flex items-center justify-center py-2 focus:outline-transparent "
                >
                  <div
                    onClick={() => {
                      setShowPassword((prev) => {
                        return (prev = !prev);
                      });
                    }}
                    className="absolute left-2 cursor-pointer"
                  >
                    {showPassword ? (
                      <HideIcon className="h-8 w-8" />
                    ) : (
                      <ShowIcon className="h-8 w-8" />
                    )}
                  </div>
                  <FormControl>
                    <Input
                      disabled={loading}
                      autoComplete="off"
                      type={showPassword ? "text" : "password"}
                      className={`h-12 rounded-[5px] border-transparent bg-gray-100 pl-10 text-right font-iransansnum text-2xl ${loading ? "cursor-not-allowed" : ""}`}
                      {...field}
                    />
                  </FormControl>
                </div>
                {logError && <p className="text-xl text-g1_5">{logError}</p>}
                <FormMessage className="text-lg text-red-700" />
                <div
                  className="flex cursor-pointer items-center justify-start"
                  onClick={(e) => {
                    e.preventDefault();
                    if (loading) return;
                    setSigninWithOtp(true);
                  }}
                >
                  <span className="text-lg text-g1_7">
                    ورود با رمز یک بار مصرف
                  </span>
                  <ArrowIcon
                    classes="h-4 w-4 fill-g1_7"
                    direction={Arrow.left}
                  />
                </div>
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end gap-2 space-x-1 pt-6">
            <Button
              disabled={loading}
              className="w-full rounded-xl bg-g1_5 py-7 font-iranyekan_bold text-lg text-light_1 hover:bg-g1_5"
              type="submit"
            >
              {loading ? <SpinnerIcon /> : "ادامه"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PasswordForm;
