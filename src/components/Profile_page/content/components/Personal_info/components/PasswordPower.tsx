import usePasswordControler from "@/hook/usePasswordControler";
import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  password: string;
  setSubmitError: Dispatch<SetStateAction<string>>;
}
const PasswordPower = ({ password }: Props) => {
  const {
    numberControl,
    lengthControl,
    specialCharacterControl,
    lowercaseLetterControl,
    UppercaseLetterControl,
    status,
  } = usePasswordControler(password);

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="*:bg-red-600 grid w-full grid-cols-3 gap-x-2">
        <span
          className={cn("h-2 w-full rounded-full bg-gray-300", {
            "bg-red-600": status === "ضعیف",
            "bg-orange-400": status === "معمولی",
            "bg-green-600": status === "عالی",
          })}
        ></span>
        <span
          className={cn("h-2 w-full rounded-full bg-gray-300", {
            "bg-orange-400": status === "معمولی",
            "bg-green-600": status === "عالی",
          })}
        ></span>
        <span
          className={cn("h-2 w-full rounded-full bg-gray-300", {
            "bg-green-600": status === "عالی",
          })}
        ></span>
      </div>
      <div className="px-4">
        <h1>{status}</h1>
        <ul className="list-disc">
          <li className={`${numberControl ? "hidden" : ""}`}>
            <span className="text-lg text-dark_5">شامل عدد</span>
          </li>
          <li className={`${lengthControl ? "hidden" : ""}`}>
            <span className="text-lg text-dark_5">حداقل ۶ حرف</span>
          </li>
          <li className={`${specialCharacterControl ? "hidden" : ""}`}>
            <span className="text-lg text-dark_5">شامل علامت (!@#$%&*^)</span>
          </li>
          <li
            className={`${lowercaseLetterControl & UppercaseLetterControl ? "hidden" : ""}`}
          >
            <span className="text-lg text-dark_5">شامل یک حرف بزرگ و کوچک</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PasswordPower;
