import { localCartId } from "@/constants/constants";
import { IResponse } from "@/types_validation/type";
import { cookies } from "next/headers";

const deleteLocalCartId = (): IResponse => {
  try {
    const setCookie = cookies().delete(localCartId);
    if (setCookie.has(localCartId)) {
      throw new Error("خطا در حذف کوکی کد سبد خرید");
    }
    return {
      status: "Success",
      ok: true,
      message: "کد سبد خرید با موفقیت در کوکی حذف شد",
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
      message: "خطا در حذف کوکی کد سبد خرید",
      ok: false,
      status: "Error",
    };
  }
};

export default deleteLocalCartId;
