import { cn } from "@/lib/utils";
import React, { useState, useEffect, SetStateAction, Dispatch } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  autoStart?: boolean;
  initialSeconds?: number;
}

const OtpButton = ({
  initialSeconds = 60,
  autoStart = false,
  className,
  ...props
}: ButtonProps) => {
  const [countDown, setcountDown] = useState<boolean>(autoStart);

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
      onClick={(e) => {
        e.preventDefault();
        console.log("Enter 12345");
        setcountDown(true);
      }}
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
