import Success_payment from "@/components/SuccessPayment_page/Success_payment";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/auth/authOptions";
import { getCart } from "@/lib/actions/getCart";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { OrderStatus } from "@prisma/client";
import { resetCart } from "@/lib/actions/manageCart";

interface Props {
  searchParams: { tracking_code: string };
}

const page = async ({ searchParams: tracking_code }: Props) => {
  if (!tracking_code.tracking_code) {
    redirect("/");
  }
  const session = await getServerSession(authOptions);
  const cart = await getCart();
  if (!session) {
    redirect("/users/login?callback=/");
  }
  const order = await prisma.order.findFirst({
    where: {
      status: OrderStatus.NOT_CONFIRMED,
      id: tracking_code.tracking_code,
    },
  });
  if (order && cart) {
    await prisma.cart.delete({ where: { id: cart.id } });
  }
  return (
    <div>
      <Success_payment tracking_code={tracking_code.tracking_code} />
    </div>
  );
};

export default page;
