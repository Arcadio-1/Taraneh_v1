"use client";
import { Address_Full } from "@/types_validation/type";
import React from "react";
import AddressForm from "../../Profile_page/util/AddressForm/AddressForm";
import Divider from "@/components/Util/ui/Divider";

interface Props {
  address: Address_Full | null;
}

const Address_info = ({ address }: Props) => {
  return (
    <div className=" w-full bg-light_1 bg-opacity-100">
      <div className=" flex flex-col gap-3">
        <h1 className="text-xl">ثبت اطلاعات آدرس</h1>
        <Divider />
        <p className="text-lg text-dark_2">
          لطفا آدرس خود را جهت دریافت مرسوله پستی ثبت نمایید.
        </p>
      </div>
      <AddressForm address={address} />
    </div>
  );
};

export default Address_info;
