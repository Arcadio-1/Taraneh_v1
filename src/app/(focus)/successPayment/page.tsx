import Success_payment from "@/components/Pages/SuccessPayment_page/Success_payment";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/auth/authOptions";
import { getCart } from "@/actions/ordering/cart/getCart";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { OrderStatus, PayMethod } from "@prisma/client";
import { deleteCart } from "@/actions/ordering/cart/deleteCart";

interface Props {
  searchParams: { tracking_code: string };
}
const page = async ({ searchParams: code }: Props) => {
  if (!code.tracking_code) {
    redirect("/");
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/users/login?callback=/successPayment");
  }

  const order = await prisma.order.findFirst({
    where: {
      id: code.tracking_code,
    },
  });
  // if (!order) {
  //   redirect("/");
  // }

  // if (!order.payment_method && order.payment_method === PayMethod.NOT_PAYED) {
  //   redirect("/");
  // }
  console.log(order?.status);
  const cart = await getCart();
  if (cart.status === "Success") {
    await deleteCart(cart.shoppingCart.id);
  }

  return (
    <div className="grid h-dvh place-content-center">
      <Success_payment
        payment_method={order?.payment_method}
        tracking_code={code.tracking_code}
      />
      {/* <Smilar_product_slider title="پیشنهاد ویژه" /> */}
    </div>
  );
};

export default page;
