import Checkout_header, {
  Stage,
} from "@/components/Util/components/checkout_header/Checkout_header";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";
import { Address_Full } from "@/types_validation/type";
import { getCart } from "@/actions/ordering/cart/getCart";
import Shipping from "@/components/Pages/Shipping_page/Shipping";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/users/login?callback=/shipping");
  }
  const address: Address_Full | null = await prisma.userAddress.findFirst({
    where: { user_id: session.user.id },
    include: { state: true, city: true },
  });

  const cart = await getCart();
  if (!cart.ok) {
    redirect("/checkout");
  }
  if (cart.status === "NotFound") {
    redirect("/checkout");
  }
  return (
    <div className="mx-auto mt-6 flex max-w-[1024px] flex-col gap-2 px-4">
      <Checkout_header stage={Stage.shipping} />
      <Shipping address={address} session={session} cart={cart.shoppingCart} />
    </div>
  );
};

export default page;
