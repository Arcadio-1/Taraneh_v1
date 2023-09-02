import { prisma } from "@/lib/db/prisma";
import { phoneSchame } from "@/lib/util/validation";
import { Sign } from "@/types/type";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { phone: string } }
) {
  const phone = params.phone;
  try {
    const phone_validation = phoneSchame.parse({ phone });
  } catch (error) {
    console.log(error);
    return NextResponse.json(Sign.error);
    // throw new Error("شماره موبایل وارد شده صحیح نیست");
  }
  const existion = await prisma.user.findUnique({
    where: { phone: phone },
    include: { sessions: true },
  });
  if (existion) {
    return NextResponse.json(Sign.signin);
  } else {
    return NextResponse.json(Sign.signUp);
  }
}
