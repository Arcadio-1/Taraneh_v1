"use server";

import { z } from "zod";
import { phoneSchame } from "../types_validation/validation";
import { IResponse } from "@/types_validation/type";
import { prisma } from "../lib/db/prisma";
import { OTPEnum } from "@prisma/client";

const Number = z.string().regex(/^\d{5}/);

interface CreateOtpProps {
  number: z.infer<typeof Number>;
  phoneObj: z.infer<typeof phoneSchame>;
  type: OTPEnum;
}

export const createOtp: ({
  number,
  phoneObj,
}: CreateOtpProps) => Promise<IResponse> = async ({
  phoneObj,
  number,
  type,
}) => {
  try {
    const request = await prisma.otp.create({
      data: { phone: phoneObj.phone, type: type, number: number },
    });
    if (!request) {
      throw new Error("خطا در ایجاد رمز یکبار مصرف کد 1");
    }
    return {
      status: "Success",
      ok: true,
      message: "افزودن رمز یکبار مصرف به دیتابیس با موفقیت انجام شد",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "Error",
        ok: false,
        message: error.message,
      };
    }
    return {
      status: "Error",
      ok: false,
      message: "خطا در ایجاد رمز یکبار مصرف در دیتابیس",
    };
  }
};

// interface GetOtpProps {
//   phoneObj: z.infer<typeof phoneSchame>;
//   type: OTPEnum;
// }

// interface IResponseWithNumber extends IResponse {
//   number: z.infer<typeof Number>;
//     date: Date;
// }

// export const getOtp: ({
//   phoneObj,
// }: GetOtpProps) => Promise<IResponseWithNumber> = async ({
//   phoneObj,
//   type,
// }) => {
//   try {
//     const request = await prisma.otp.findFirst({
//       where: { phone: phoneObj.phone, type: type },
//     });
//     if (!request) {
//       throw new Error("خطا در دریافت رمز یکبار مصرف کد 1");
//     }
//     return {
//       status: "Success",
//         ok: true,

//       message: "دریافت رمز یکبار مصرف به دیتابیس با موفقیت انجام شد",
//     };
//   } catch (error) {
//     if (error instanceof Error) {
//       return {
//         status: "Error",
//         ok: false,
//         message: error.message,
//       };
//     }
//     return {
//       status: "Error",
//       ok: false,
//       message: "خطا در دریافت رمز یکبار مصرف در دیتابیس",
//     };
//   }
// };
