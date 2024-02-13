import Payment from "@/components/Pages/Payment_page/Payment";
import Checkout_header, {
  Stage,
} from "@/components/Util/components/checkout_header/Checkout_header";
import { getCart } from "@/actions/ordering/cart/getCart";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "@/lib/auth/authOptions";
import { getAddress } from "@/actions/userInfo/address/getAddress";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/users/login?callback=/shipping");
  }
  const address = await getAddress();

  if (address.status !== "Success") {
    redirect("/checkout");
  }

  const cart = await getCart();
  if (!cart.ok || cart.status === "NotFound") {
    redirect("/checkout");
  }

  return (
    <div className="mx-auto mt-6 flex max-w-[1024px] flex-col gap-2 px-4">
      <Checkout_header stage={Stage.payment} />
      <Payment
        cart={cart.shoppingCart}
        address={address.address}
        session={session}
      />
    </div>
  );
};

export default page;
