import Checkout from "@/components/Pages/CheckOut_page/Checkout";
import Navbar from "@/components/Pages/CheckOut_page/Navbar";
import EmptyCart from "@/components/Pages/CheckOut_page/emptyCart/EmptyCart";
import { getCart } from "@/actions/ordering/cart/getCart";
import React from "react";

const page = async () => {
  const cart = await getCart();
  return (
    <div className="mx-auto mt-10 max-w-[1232px]">
      <Navbar
        cart_size={cart.status === "Success" ? cart.shoppingCart.size : 0}
      />
      {cart.status === "Success" ? (
        <Checkout cart={cart.shoppingCart} />
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default page;
