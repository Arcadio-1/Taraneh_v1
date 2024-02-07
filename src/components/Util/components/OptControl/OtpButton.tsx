import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import sendOtp from "../../../../actions/OTP/sendOtp";
import CountdownTimer from "./CountdownTimer";
import { OtpType } from "@/types_validation/type";
import { toast } from "@/hook/use-toast";
import { getOtp } from "@/actions/OTP/redisActions/getOtp";
import SpinnerIcon from "../../ui/icons/SpinnerIcon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  phone: string;
  autoStart?: boolean;
  initialSeconds?: number;
  otpType: OtpType;
}

const OtpButton = ({
  phone,
  initialSeconds = 180,
  autoStart = false,
  className,
  otpType,
  ...props
}: ButtonProps) => {
  const [countDown, setcountDown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const geter = async () => {
      const otp = !!(await getOtp(phone)).ok;
      setcountDown(otp);
    };
    geter();
  }, []);

  const otpClickHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setLoading(true);
    const send = await sendOtp({ phone: phone, type: otpType });
    setLoading(false);
    if (!send.ok) {
      toast({
        duration: 2500,
        title: send.message,
        className: "bg-error text-light_1 text-xl",
      });
    }
    if (send.ok) {
      toast({
        duration: 2500,
        title: send.message,
        className: "bg-success text-light_1 text-xl",
      });
    }
    setcountDown(true);
  };

  return (
    <button
      dir="ltr"
      type="button"
      className={cn(
        "text-md flex shrink flex-row-reverse items-center gap-2 rounded-lg bg-g1_7  px-2 py-1 text-light_1",
        className,
        { "text-gray-300": countDown },
      )}
      {...props}
      disabled={countDown || loading}
      onClick={otpClickHandler}
    >
      {countDown ? (
        <CountdownTimer
          setcountDown={setcountDown}
          initialSeconds={initialSeconds}
        />
      ) : (
        <>
          {loading ? (
            <div className="px-14">
              <SpinnerIcon />
            </div>
          ) : (
            <p className="flex items-center gap-2 text-light_1">
              <span className="font-iransansnum text-xl">{phone}</span>
              <span>ارسال کد تایید به</span>
            </p>
          )}
        </>
      )}
    </button>
  );
};

export default OtpButton;
