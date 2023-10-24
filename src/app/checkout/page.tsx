import Checkout from "@/components/CheckOut_page/Checkout";
import Navbar from "@/components/CheckOut_page/Navbar";
import EmptyCart from "@/components/CheckOut_page/emptyCart/EmptyCart";
import { getCart } from "@/lib/actions/getCart";
import React from "react";

export const revalidate = true;

const page = async () => {
  const cart = await getCart();
  return (
    <div className="max-w-[1232px] mx-auto mt-10">
      <Navbar cart_size={cart?.size || 0} />
      {cart && cart.size > 0 ? <Checkout cart={cart} /> : <EmptyCart />}
    </div>
  );
};

export default page;
