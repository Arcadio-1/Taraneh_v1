import React, { useMemo } from "react";
import {
  has6Length,
  hasNumber,
  hasSpecialCharacter,
  hasUppercaseLetter,
  haslowercaseLetter,
} from "../types_validation/validation";

interface IControler {
  lengthControl: number;
  UppercaseLetterControl: number;
  lowercaseLetterControl: number;
  numberControl: number;
  specialCharacterControl: number;
  power: number;
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
    const power =
      passwordControl.UppercaseLetterControl +
      passwordControl.lowercaseLetterControl +
      passwordControl.lengthControl +
      passwordControl.numberControl +
      passwordControl.specialCharacterControl;

    const status = (): "ضعیف" | "معمولی" | "عالی" | "" => {
      if (power === 0) {
        return "";
      }
      if (power <= 6) {
        return "ضعیف";
      }
      if (power < 9) {
        return "معمولی";
      }
      return "عالی";
    };

    return {
      ...passwordControl,
      power,
      status: status(),
    };
  }, [password]);

  return { ...controler };
};

export default usePasswordControler;
