import { IResponse } from "@/types_validation/type";
import { cookies } from "next/headers";
import { AES, enc } from "crypto-js";
import { env } from "@/types_validation/env";
import { localCartId } from "@/constants/constants";
type GetLocalCartIdIResponse =
  | {
      status: "Success";
      ok: true;
      message: string;
      cartId: string;
    }
  | {
      status: "Error";
      ok: false;
      message: string;
      cartId: null;
    };

const getLocalCartId = (): GetLocalCartIdIResponse => {
  try {
    const localCartIdCrypted = cookies().get(localCartId)?.value;
    if (!localCartIdCrypted) {
      throw new Error("کد سبد خرید در کوکی یافت نشد");
    }
    const decryptedLocalCartId = AES.decrypt(
      localCartIdCrypted,
      env.CRYPT_SECRET,
    ).toString(enc.Utf8);
    return {
      status: "Success",
      ok: true,
      message: "کد سبد خرید با موفقیت در کوکی ایجاد شد",
      cartId: decryptedLocalCartId,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
        ok: false,
        status: "Error",
        cartId: null,
      };
    }
    return {
      message: "خطا در ایجاد کوکی",
      ok: false,
      status: "Error",
      cartId: null,
    };
  }
};

export default getLocalCartId;
