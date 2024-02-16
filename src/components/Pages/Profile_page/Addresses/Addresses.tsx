import { Address_Full } from "@/types_validation/type";
import React from "react";
import Link from "next/link";
import ArrowLongIcon, { Arrow } from "@/components/Util/ui/icons/ArrowLongIcon";
import AddressForm from "../util/AddressForm/AddressForm";

interface Props {
  address: Address_Full | null;
}
const Addresses = ({ address }: Props) => {
  return (
    <div className=" bg-light_1 bg-opacity-100 ">
      <div className="mb-5 flex items-center justify-start gap-2">
        <Link href={`/profile`}>
          <ArrowLongIcon
            classes="h-10 w-10 md:hidden fill-dark_4"
            direction={Arrow.right}
          />
        </Link>
        <h1 className=" font-iranyekan_bold text-lg text-dark_3">
          مدیریت آدرس
        </h1>
      </div>
      <AddressForm address={address} />
    </div>
  );
};

export default Addresses;
