"use server";
import { authOptions } from "@/lib/auth/authOptions";
import { prisma } from "@/lib/db/prisma";
import { Address_Full } from "@/types_validation/type";
import { getServerSession } from "next-auth";

type TGetAddress =
  | {
      status: "Success";
      ok: true;
      message: string;
      address: Address_Full;
    }
  | {
      status: "NotFound";
      ok: true;
      message: string;
      address: null;
    }
  | {
      status: "Error";
      ok: false;
      message: string;
      address: null;
    };

export const getAddress = async (): Promise<TGetAddress> => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("لطفا به حساب کاربری خود وارد شوید");
    }
    const request = await prisma.userAddress.findFirst({
      where: { user_id: session.user.id },
      include: { state: true, city: true },
    });
    if (!request) {
      return {
        status: "NotFound",
        ok: true,
        message: "آدرس شما شما ثبت نشده",
        address: null,
      };
    }
    return {
      status: "Success",
      ok: true,
      message: "آدرس شما با موفقیت دریافت شد",
      address: request,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        address: null,
        message: error.message,
        ok: false,
        status: "Error",
      };
    }
    return {
      address: null,
      message: "خطا در دریافت آدرس",
      ok: false,
      status: "Error",
    };
  }
};
