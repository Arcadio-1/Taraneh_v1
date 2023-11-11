"use client";
import React, { useEffect, useState } from "react";
import User_info from "./Address/User_info";
import Shipping_items from "./Content/shipping_items/Shipping_items";
import Delivey_date from "./Content/delivery_date/Delivey_date";
import Shipping_form from "./shipping_form/Shipping_form";
import { Address_Full, ShoppingCart } from "@/types/type";
import { Session } from "next-auth";
import { Day } from "@/lib/util/calender";

interface Props {
  address: Address_Full | null;
  session: Session;
  cart: ShoppingCart;
}

const Shipping = ({ address, session, cart }: Props) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="pb-[10rem] md:p-0 flex flex-col md:flex-row gap-2">
      <div className="grow">
        <User_info address={address} user={session} />
        <div className="border rounded-lg  py-3 px-4 flex flex-col gap-4">
          <Shipping_items cart={cart} />
          {windowSize.innerWidth > 767 && <Delivey_date sheeter={false} />}
        </div>
      </div>
      <Shipping_form address={address} user={session} cart={cart} />
    </div>
  );
};

export default Shipping;
function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
