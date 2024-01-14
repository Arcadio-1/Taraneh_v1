//deprecated******************************
import { prisma } from "@/lib/db/prisma";
import { phoneSchame } from "@/lib/util/validation";
import { Sign } from "@/types/type";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { phone: string } }
) {
  const phone = params.phone;
  try {
    const phone_validation = phoneSchame.parse({ phone });
    const existion = await prisma.user.findUnique({
      where: { phone: phone },
      include: { sessions: true },
    });
    if (existion) {
      return NextResponse.json(Sign.signin);
    } else {
      return NextResponse.json(Sign.signUp);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(Sign.error);
    // throw new Error("شماره موبایل وارد شده صحیح نیست");
  }
}
