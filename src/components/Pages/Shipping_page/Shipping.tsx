"use client";
import React, { useEffect, useState } from "react";
import User_info from "./Address/User_info";
import Shipping_items from "./Content/shipping_items/Shipping_items";
import Delivey_date from "./Content/delivery_date/Delivey_date";
import Shipping_form from "./shipping_form/Shipping_form";
import { Address_Full, ShoppingCart } from "@/types_validation/type";
import { Session } from "next-auth";

interface Props {
  address: Address_Full | null;
  session: Session;
  cart: ShoppingCart;
}

const Shipping = ({ address, session, cart }: Props) => {
  return (
    <div className="flex flex-col gap-2 pb-[10rem] md:flex-row md:p-0">
      <div className="grow">
        <User_info address={address} user={session} />
        <div className="flex flex-col  gap-4 rounded-lg border px-4 py-3">
          <Shipping_items cart={cart} />
          <Delivey_date sheeter={false} />
        </div>
      </div>
      <Shipping_form address={address} user={session} cart={cart} />
    </div>
  );
};

export default Shipping;
