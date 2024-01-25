import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface CountdownTimerProps {
  setcountDown: Dispatch<SetStateAction<boolean>>;
  initialSeconds: number;
}
const CountdownTimer = ({
  initialSeconds,
  setcountDown,
}: CountdownTimerProps) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      setcountDown(false);
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, setcountDown]);

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

export default CountdownTimer;
