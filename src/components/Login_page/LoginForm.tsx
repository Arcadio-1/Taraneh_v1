"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Sign } from "@/types_validation/type";
import PasswordForm from "./PasswordForm";
import OtpForm from "./OtpForm";
import PhoneForm from "./PhoneForm";
import Link from "next/link";
import LogoIcon from "../Util/icons/LogoIcon";

const LoginForm = () => {
  const callbackParam = useSearchParams().get("callback") || "/";

  const [phone, setPhone] = useState<string>("");
  const [signinWithOtp, setSigninWithOtp] = useState(true);
  const [sign, setSign] = useState<Sign>(Sign.undefined);
  const [hasPassword, setHasPassword] = useState(false);

  return (
    <div className="m-4 rounded-lg  p-4 md:min-w-[35rem] md:p-6 md:shadow-[0px_1px_5px_rgba(0,0,0,0.20)]">
      <Link className="flex items-center justify-center" href={"/"}>
        <LogoIcon classes="h-[8rem] w-[15rem] fill-g1_7" />
      </Link>
      {(sign === Sign.undefined || sign === Sign.error) && (
        <PhoneForm
          setHasPassword={setHasPassword}
          setPhone={setPhone}
          setSign={setSign}
          sign={sign}
        />
      )}
      {(sign === Sign.signin || sign === Sign.signUp) && signinWithOtp && (
        <OtpForm
          callbackParam={callbackParam}
          hasPassword={hasPassword}
          phone={phone}
          setSign={setSign}
          setSigninWithOtp={setSigninWithOtp}
          sign={sign}
        />
      )}
      {sign === Sign.signin && !signinWithOtp && hasPassword && (
        <PasswordForm
          callbackParam={callbackParam}
          phone={phone}
          setSign={setSign}
          setSigninWithOtp={setSigninWithOtp}
        />
      )}
    </div>
  );
};

export default LoginForm;
