import React, { useMemo } from "react";
import { z } from "zod";

const has6Length = z.string().min(6, { message: "شامل 6 حرف باشد" });
const hasUppercaseLetter = z.string().regex(/^(?=.*[A-Z]){1,}/);
const haslowercaseLetter = z.string().regex(/^(?=.*[a-z]){1,}/);
const hasNumber = z.string().regex(/^(?=.*\d){1,}/);
const hasSpecialCharacter = z
  .string()
  .regex(/^(?=.*[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]){1,}/);

interface IControler {
  lengthControl: number;
  UppercaseLetterControl: number;
  lowercaseLetterControl: number;
  numberControl: number;
  specialCharacterControl: number;
  powerRate: number;
  status: "ضعیف" | "معمولی" | "عالی" | "";
}
export const usePasswordControler = (password: string): IControler => {
  const controler = useMemo(() => {
    const passwordControl = {
      lengthControl: has6Length.safeParse(password).success ? 5 : 0,
      UppercaseLetterControl: hasUppercaseLetter.safeParse(password).success
        ? 1
        : 0,
      lowercaseLetterControl: haslowercaseLetter.safeParse(password).success
        ? 1
        : 0,
      numberControl: hasNumber.safeParse(password).success ? 1 : 0,
      specialCharacterControl: hasSpecialCharacter.safeParse(password).success
        ? 1
        : 0,
    };
    const powerRate =
      passwordControl.UppercaseLetterControl +
      passwordControl.lowercaseLetterControl +
      passwordControl.lengthControl +
      passwordControl.numberControl +
      passwordControl.specialCharacterControl;

    const status = (): "ضعیف" | "معمولی" | "عالی" | "" => {
      if (powerRate === 0) {
        return "";
      }
      if (powerRate <= 6) {
        return "ضعیف";
      }
      if (powerRate < 9) {
        return "معمولی";
      }
      if (powerRate >= 9) {
        return "معمولی";
      }
      return "عالی";
    };

    return {
      ...passwordControl,
      powerRate,
      status: status(),
    };
  }, [password]);

  return { ...controler };
};

export default usePasswordControler;
