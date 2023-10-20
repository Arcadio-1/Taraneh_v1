"use client";
import React, { useState } from "react";
import User_info from "./Address/User_info";
import Shipping_items from "./Content/shipping_items/Shipping_items";
import Delivey_date, {
  DateInterface,
} from "./Content/delivery_date/Delivey_date";
import Shipping_form from "./shipping_form/Shipping_form";
import { Address_Full, ShoppingCart } from "@/types/type";
import { Session } from "next-auth";
import { Day } from "@/lib/util/calender";

interface Props {
  address: Address_Full | null;
  session: Session;
  cart: ShoppingCart;
}

export interface SlectedInterface extends Day, DateInterface {}
const Shipping = ({ address, session, cart }: Props) => {
  const [selectedDate, setSelectedDate] = useState<SlectedInterface | null>(
    null
  );

  const selectedDateHandler = (date: SlectedInterface) => {
    setSelectedDate(date);
    console.log(selectedDate);
  };
  return (
    <div className="flex gap-2">
      <div className="grow">
        <User_info address={address} user={session} />
        <div className="border rounded-lg  py-3 px-4">
          <Shipping_items cart={cart} />
          <Delivey_date selectedDateHandler={selectedDateHandler} />
        </div>
      </div>
      <Shipping_form
        cartSize={cart.size}
        subtotal={cart.subtotal}
        subDiscount={cart.subDiscount}
        subtotalWithDiscount={cart.subTotalWithDiscount}
        selectedDate={selectedDate}
        address={address}
        user={session}
        cart={cart}
      />
    </div>
  );
};

export default Shipping;
