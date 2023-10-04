import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();
    await prisma.user.create({
      data: { phone: phone, email: "" },
    });
    return NextResponse.json({ status: "success" });
  } catch (error) {
    return NextResponse.json({ response: "error", message: error });
  }
}
