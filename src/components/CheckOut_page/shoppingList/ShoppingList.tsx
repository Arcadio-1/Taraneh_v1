import { ShoppingCart } from "@/types/type";
import React from "react";
import Header from "./components/Header";
import ShoppingListItem from "./components/ShoppingListItem";
import { MenuSquareIcon } from "lucide-react";
import { MenuButton } from "@mui/base";

interface Props {
  cart: ShoppingCart;
}

const ShoppingList = ({ cart }: Props) => {
  return (
    <div className="grow border rounded-lg py-6">
      <Header cart_size={cart.size} cart_id={cart.id} />
      <div className="flex flex-col items-stretch">
        {cart.items.map((item) => {
          return <ShoppingListItem key={item.productId} cart_item={item} />;
        })}
      </div>
    </div>
  );
};

export default ShoppingList;
