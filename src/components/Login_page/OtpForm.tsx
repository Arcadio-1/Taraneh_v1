import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components_shadcn/ui/form";
import { Button } from "@/components_shadcn/ui/button";
import { userSignup } from "@/actions/userSignup";
import { otpFormSchame } from "@/types_validation/validation";
import { Sign } from "@/types_validation/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import OtpInput from "react-otp-input";
import ArrowLongIcon, { Arrow } from "../Util/icons/ArrowLongIcon";
import ArrowIcon from "../Util/icons/ArrowIcon";
import SpinnerIcon from "../Util/icons/SpinnerIcon";
import OtpButton from "../Util/ui/OtpButton";

interface Props {
  phone: string;
  sign: Sign;
  setSign: React.Dispatch<React.SetStateAction<Sign>>;
  setSigninWithOtp: React.Dispatch<React.SetStateAction<boolean>>;
  callbackParam: string;
  hasPassword: boolean;
}
const OtpForm = ({
  phone,
  setSign,
  setSigninWithOtp,
  sign,
  callbackParam,
  hasPassword,
}: Props) => {
  const [otp, setOtp] = useState("");
  const [logError, setLogError] = useState("");
  const [loading, setLoading] = useState(false);
  const otpform = useForm<z.infer<typeof otpFormSchame>>({
    resolver: zodResolver(otpFormSchame),
    defaultValues: {
      otpNumber: "",
    },
  });

  useEffect(() => {
    otpform.setValue("otpNumber", otp);

    otpFormSchame.safeParse({
      otpNumber: otp,
    }).success && otpform.clearErrors();
  }, [otp]);

  const onSignWithOtp = async (values: z.infer<typeof otpFormSchame>) => {
    setLogError("");
    setLoading(true);
    values.otpNumber;
    if (sign === Sign.signUp) {
      await userSignup({ phone: phone }, values.otpNumber);
    }
    try {
      const req = await signIn("credentials", {
        redirect: false,
        callbackUrl: callbackParam,
        phone: phone,
        otpNum: values.otpNumber,
        method: "otp",
      });
      setLoading(false);
      if (!req?.ok && req?.error) {
        setLogError(req.error);
      }
      console.log(req);
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
      {sign === Sign.signin && <h1 className="mb-5 text-xl">ورود</h1>}
      {sign === Sign.signUp && <h1 className="mb-5 text-xl">ثبت نام</h1>}
      <Form {...otpform}>
        <form onSubmit={otpform.handleSubmit(onSignWithOtp)}>
          <FormField
            control={otpform.control}
            name="otpNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" mb-5 flex items-center justify-start gap-1 text-lg text-dark_4">
                  <span>کد تایید برای شماره</span>
                  <span className="font-iransansnum">{phone}</span>
                  <span>ارسال شد</span>
                </FormLabel>
                <div
                  dir="ltr"
                  className="flex items-center justify-center py-6 focus:outline-transparent"
                >
                  <FormControl>
                    <OtpInput
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
                {logError && <p className="text-xl text-g1_5">{logError}</p>}
                <FormMessage className="text-lg text-red-700" />
                <div className="flex gap-1 font-iranyekan_bold text-lg text-dark_5">
                  <span>لطفا</span>
                  <span className="text-xl tracking-wider text-g1_5">
                    12345
                  </span>
                  <span>را وارد کنید</span>
                </div>
                <OtpButton phone={phone} autoStart={true} initialSeconds={20} />

                {hasPassword && (
                  <div
                    className="flex cursor-pointer items-center justify-start"
                    onClick={(e) => {
                      e.preventDefault();
                      setOtp("");
                      setSigninWithOtp(false);
                    }}
                  >
                    <span className="text-lg text-g1_7">ورود با رمز عبور</span>
                    <ArrowIcon
                      classes="h-4 w-4 fill-g1_7"
                      direction={Arrow.left}
                    />
                  </div>
                )}
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

export default OtpForm;
