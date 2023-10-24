import Payment from "@/components/Payment_page/Payment";
import Checkout_header, {
  Stage,
} from "@/components/Util/checkout_header/Checkout_header";
import { getCart } from "@/lib/actions/getCart";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const cart = await getCart();

  if (!cart) {
    redirect("/checkout");
  }

  return (
    <div className="max-w-[1024px] mx-auto mt-6 flex flex-col gap-2 px-4">
      <Checkout_header stage={Stage.payment} />
      <Payment cart={cart} />
    </div>
  );
};

export default page;
