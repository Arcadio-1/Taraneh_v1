import { ShoppingCart } from "@/types/type";
import React from "react";
import ShoppingList from "./shoppingList/ShoppingList";
import CheckoutForm from "./CheckoutForm";

interface Props {
  cart: ShoppingCart;
}

const Checkout = ({ cart }: Props) => {
  return (
    <div className="flex gap-2 mt-2">
      <ShoppingList cart={cart} />
      <CheckoutForm
        subtotal={cart.subtotal}
        subDiscount={cart.subDiscount}
        cartSize={cart.size}
        subtotalWithDiscount={cart.subTotalWithDiscount}
      />
    </div>
  );
};

export default Checkout;
