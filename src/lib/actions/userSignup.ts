"use server";

import { z } from "zod";
import { phoneSchame } from "../util/validation";
import { checkPhone } from "./phonecheck";
import { Sign } from "@/types/type";
import { prisma } from "../db/prisma";

export const userSignup = async (phone: z.infer<typeof phoneSchame>) => {
  const check = await checkPhone(phone);
  if (check.type === Sign.signUp) {
    const signup = await prisma.user.create({
      data: { phone: check.phone, email: "" },
    });
  }
};
