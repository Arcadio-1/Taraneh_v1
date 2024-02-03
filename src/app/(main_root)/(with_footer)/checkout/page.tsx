import Checkout from "@/components/Pages/CheckOut_page/Checkout";
import Navbar from "@/components/Pages/CheckOut_page/Navbar";
import EmptyCart from "@/components/Pages/CheckOut_page/emptyCart/EmptyCart";
import { getCart } from "@/actions/getCart";
import React from "react";

const page = async () => {
  const cart = await getCart();
  return (
    <div className="mx-auto mt-10 max-w-[1232px]">
      <Navbar cart_size={cart?.size || 0} />
      {cart && cart.size > 0 ? <Checkout cart={cart} /> : <EmptyCart />}
    </div>
  );
};

export default page;
