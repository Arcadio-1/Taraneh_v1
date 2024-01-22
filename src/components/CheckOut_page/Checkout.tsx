import { ShoppingCart } from "@/types_validation/type";
import React from "react";
import ShoppingList from "./shoppingList/ShoppingList";
import CheckoutForm from "./CheckoutForm";

interface Props {
  cart: ShoppingCart;
}

const Checkout = ({ cart }: Props) => {
  return (
    <div className="mt-2 flex flex-col gap-2 pb-[10rem] md:flex-row md:p-0">
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
