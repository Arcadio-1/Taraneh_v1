import Payment from "@/components/Pages/Payment_page/Payment";
import Checkout_header, {
  Stage,
} from "@/components/Util/components/checkout_header/Checkout_header";
import { getCart } from "@/actions/ordering/cart/getCart";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "@/lib/auth/authOptions";
import { Address_Full } from "@/types_validation/type";
import { prisma } from "@/lib/db/prisma";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/users/login?callback=/shipping");
  }
  const address: Address_Full | null = await prisma.userAddress.findFirst({
    where: { user_id: session.user.id },
    include: { state: true, city: true },
  });

  if (!address) {
    redirect("/checkout");
  }

  const cart = await getCart();
  if (!cart.ok) {
    redirect("/checkout");
  }
  if (cart.status === "NotFound") {
    redirect("/checkout");
  }

  return (
    <div className="mx-auto mt-6 flex max-w-[1024px] flex-col gap-2 px-4">
      <Checkout_header stage={Stage.payment} />
      <Payment cart={cart.shoppingCart} address={address} session={session} />
    </div>
  );
};

export default page;
