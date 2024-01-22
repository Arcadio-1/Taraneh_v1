import { cn } from "@/lib/utils";
import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import axios from "axios";
import sendOtp from "../../../actions/sendOtp";
import { createOtp } from "@/actions/createOtp";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  phone: string;
  autoStart?: boolean;
  initialSeconds?: number;
}

const OtpButton = ({
  phone,
  initialSeconds = 300,
  autoStart = false,
  className,
  ...props
}: ButtonProps) => {
  const [countDown, setcountDown] = useState<boolean>(autoStart);

  const otpClickHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    console.log("run");
    e.preventDefault();
    // if (countDown) {
    const req = await createOtp({
      phoneObj: { phone: "09183704735" },
      number: "12345",
      type: "changePassword",
    });
    console.log(req);
    // await sendOtp(phone);
    // }
    setcountDown(true);
  };

  return (
    <button
      dir="ltr"
      type="button"
      className={cn(
        "text-md flex shrink flex-row-reverse items-center gap-2 rounded-lg border-2 border-dark_4 border-opacity-50 px-2 py-1 text-dark_2",
        className,
        { "text-dark_4": countDown },
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
        " ارسال رمز یکبار مصرف"
      )}
    </button>
  );
};

export default OtpButton;

interface CountdownTimerProps {
  setcountDown: Dispatch<SetStateAction<boolean>>;
  initialSeconds: number;
}
const CountdownTimer = ({
  initialSeconds,
  setcountDown,
}: CountdownTimerProps) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  if (seconds === 0) {
    setcountDown(false);
  }
  useEffect(() => {
    if (seconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex items-center gap-2">
      <span>...ارسال مجدد</span>
      <p>{formatTime(seconds)}</p>
    </div>
  );
};
