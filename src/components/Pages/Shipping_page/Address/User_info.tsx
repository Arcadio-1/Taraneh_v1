"use client";
import ArrowIcon, { Arrow } from "@/components/Util/ui/icons/ArrowIcon";
import LocationIcon from "@/components/Util/ui/icons/LocationIcon";
import { Address_Full } from "@/types_validation/type";
import { Session } from "next-auth";
import Link from "next/link";
import React from "react";
import Personal_info from "../Complete_info/Personal_info";
import Address_info from "../Complete_info/Address_info";

interface Props {
  address: Address_Full | null;
  user: Session;
}
const User_info = ({ address, user }: Props) => {
  return (
    <div className="rounded-lg border  px-4 py-3">
      {address && user.user.name && user.user.family && (
        <div>
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <LocationIcon classes="h-6 w-6 fill-gray-500" />
              <div className="flex flex-col gap-2">
                <p className="text-sm text-dark_5">آدرس تحویل سفارش</p>
                <p className="text-md font-iranyekan_bold">
                  <span>{address.state.state_name}</span>
                  <span>,</span>
                  <span>{address.city.city_name}</span>
                  <span>,</span>
                  <span>{address.address}</span>
                </p>
                <p>
                  <span>{user.user.name} </span>
                  <span>{user.user.family}</span>
                </p>
              </div>
            </div>
            <Link
              className="mr-auto flex items-center text-g3_4"
              href={"/profile/user-info"}
            >
              تغیر یا ویرایش آدرس
              <ArrowIcon direction={Arrow.left} classes="h-3 w-3 fill-g3_4" />
            </Link>
          </div>
        </div>
      )}
      <div className="flex flex-wrap items-stretch gap-4">
        {(!user.user.name || !user.user.family) && (
          <div>
            <Personal_info />
          </div>
        )}
        {!address && (
          <div className="grow">
            <Address_info address={null} />
          </div>
        )}
      </div>
    </div>
  );
};

export default User_info;
