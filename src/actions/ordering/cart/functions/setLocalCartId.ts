import { IResponse } from "@/types_validation/type";
import { cookies } from "next/headers";
import { AES } from "crypto-js";
import { env } from "@/types_validation/env";
import { localCartId } from "@/constants/constants";

const setLocalCartId = (cartId: string): IResponse => {
  try {
    const cipherText = AES.encrypt(cartId, env.CRYPT_SECRET).toString();
    const setCookie = cookies().set(localCartId, cipherText);
    if (!setCookie.has(localCartId)) {
      throw new Error("خطا در ایجاد کوکی کد سبد خرید");
    }
    return {
      status: "Success",
      ok: true,
      message: "کد سبد خرید با موفقیت در کوکی ایجاد شد",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
        ok: false,
        status: "Error",
      };
    }
    return {
      message: "خطا در ایجاد کوکی کد سبد خرید",
      ok: false,
      status: "Error",
    };
  }
};

export default setLocalCartId;
