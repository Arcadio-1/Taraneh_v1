import Success_payment from "@/components/Pages/SuccessPayment_page/Success_payment";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/auth/authOptions";
import { getCart } from "@/actions/ordering/cart/getCart";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { OrderStatus, PayMethod } from "@prisma/client";
import Smilar_product_slider from "@/components/Pages/Product_page/smilar_products_slider/Smilar_product_slider";

interface Props {
  searchParams: { tracking_code: string };
}

const page = async ({ searchParams: tracking_code }: Props) => {
  if (!tracking_code.tracking_code) {
    redirect("/");
  }
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/users/login?callback=/successPayment");
  }
  const cart = await getCart();
  if (!cart.ok || cart.status === "NotFound") {
    redirect("/");
  }

  const order = await prisma.order.findFirst({
    where: {
      status: OrderStatus.NOT_CONFIRMED,
      id: tracking_code.tracking_code,
    },
  });
  if (!order) {
    redirect("/");
  }

  if (!order.payment_method && order.payment_method === PayMethod.NOT_PAYED) {
    redirect("/");
  }

  await prisma.cart.delete({ where: { id: cart.shoppingCart.id } });

  return (
    <div className="flec flex-col items-center justify-center">
      <Success_payment
        payment_method={order?.payment_method}
        tracking_code={tracking_code.tracking_code}
      />
      <Smilar_product_slider title="پیشنهاد ویژه" />
    </div>
  );
};

export default page;
