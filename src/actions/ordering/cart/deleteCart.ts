import { prisma } from "@/lib/db/prisma";
import { IResponse } from "@/types_validation/type";

export const deleteCart = async (cartID: string): Promise<IResponse> => {
  try {
    await prisma.cart.delete({ where: { id: cartID } });
    return {
      message: "سبد خرید با موفقیت حذف شد",
      ok: true,
      status: "Success",
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
      message: "خطا در حذف سبد خرید",
      ok: false,
      status: "Error",
    };
  }
};
