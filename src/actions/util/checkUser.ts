"use server";

import { z } from "zod";
import { PhoneSchame } from "../../types_validation/validation";
import { prisma } from "../../lib/db/prisma";
import { Sign } from "@/types_validation/type";
import { convert_to_en_number } from "../../util_functions/translateNumbers";

type TCheckPhone = Promise<
  | {
      phone: string;
      password: false;
      type: Sign.signUp;
    }
  | {
      phone: string;
      password: boolean;
      type: Sign.signin;
    }
  | {
      phone: null;
      password: false;
      type: Sign.error;
    }
>;

export const checkUser = async (
  phone: z.infer<typeof PhoneSchame>,
): TCheckPhone => {
  try {
    const checked_phone = PhoneSchame.safeParse(phone);

    if (!checked_phone.success) {
      throw new Error(checked_phone.error.toString());
    }

    const conv_phone = convert_to_en_number(checked_phone.data);

    const check = await prisma.user.findUnique({
      where: { phone: conv_phone },
    });

    if (check) {
      return {
        password: check.password ? true : false,
        phone: conv_phone,
        type: Sign.signin,
      };
    }
    return {
      phone: conv_phone,
      password: false,
      type: Sign.signUp,
    };
  } catch (error) {
    console.log(error);
    return {
      phone: null,
      password: false,
      type: Sign.error,
    };
  }
};
