import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import sendOtp from "../../../../actions/OTP/sendOtp";
import CountdownTimer from "./CountdownTimer";
import { OtpType } from "@/types_validation/type";
import { toast } from "@/components_shadcn/ui/use-toast";
import { getOtp } from "@/actions/OTP/redisActions/getOtp";

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
    const send = await sendOtp({ phone: phone, type: otpType });
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
        "text-md flex shrink flex-row-reverse items-center gap-2 rounded-lg bg-g1_7  px-2 py-2 text-light_1",
        className,
        { "text-gray-300": countDown },
      )}
      {...props}
      disabled={countDown}
      onClick={otpClickHandler}
    >
      {countDown ? (
        <CountdownTimer
          setcountDown={setcountDown}
          initialSeconds={initialSeconds}
        />
      ) : (
        <p className="flex items-center gap-2 text-light_1">
          <span className="font-iransansnum text-xl">{phone}</span>
          <span>ارسال کد تایید به</span>
        </p>
      )}
    </button>
  );
};

export default OtpButton;
