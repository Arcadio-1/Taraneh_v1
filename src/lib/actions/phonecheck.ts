"use server";

import { z } from "zod";
import { phoneSchame } from "../util/validation";
import { prisma } from "../db/prisma";
import { Sign } from "@/types/type";
import { convert_to_en_number } from "../util/translateNumbers";

type TCheckPhone = Promise<
  | {
      phone: string;
      type: Sign.signUp;
    }
  | {
      phone: string;
      type: Sign.signin;
    }
  | {
      phone: null;
      type: Sign.error;
    }
>;

export const checkPhone = async (
  phone: z.infer<typeof phoneSchame>
): TCheckPhone => {
  try {
    const checked_phone = phoneSchame.safeParse(phone);

    if (!checked_phone.success) {
      throw new Error(checked_phone.error.toString());
    }

    const conv_phone = convert_to_en_number(checked_phone.data.phone);
    const check = await prisma.user.findUnique({
      where: { phone: conv_phone },
    });

    if (check) {
      return {
        phone: conv_phone,
        type: Sign.signin,
      };
    }
    return {
      phone: conv_phone,
      type: Sign.signUp,
    };
  } catch (error) {
    console.log(error);
    return {
      phone: null,
      type: Sign.error,
    };
  }
};
