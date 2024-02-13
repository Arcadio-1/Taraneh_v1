import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth/authOptions";
import { IResponse } from "@/types_validation/type";
import { z } from "zod";
import { PhoneSchame } from "@/types_validation/validation";

type IResponseGetUserPhone = IResponse & {
  phone: z.infer<typeof PhoneSchame> | null;
};

export const getUserPhone: () => Promise<IResponseGetUserPhone> = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("خطا در احراز هویت");
    }
    return {
      status: "Success",
      ok: true,
      phone: session.user.phone,
      message: "احراز هویت با موفقیت انجام شد",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "Error",
        ok: false,
        phone: null,
        message: error.message,
      };
    }
    return {
      status: "Error",
      ok: false,
      phone: null,
      message: "خطا در احراز هویت کد X",
    };
  }
};
