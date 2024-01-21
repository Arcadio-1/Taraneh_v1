"use client";
import { Session } from "next-auth";
import React from "react";
import Name_family_codeMeli from "./components/Name_family_codeMeli";
import Phone from "./components/Phone";
import Email from "./components/Email";
import Address from "./components/Address";

import { Address_Full } from "@/types/type";
import Link from "next/link";
import ArrowLongIcon, { Arrow } from "@/components/Util/icons/ArrowLongIcon";
import AddPassword from "./components/AddPassword";
import ChangePassword from "./components/ChangePassword";

interface Props {
  address: Address_Full | null;
  session: Session;
}

const Personal_info = ({ session, address }: Props) => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-start gap-2">
        <Link href={`/profile`}>
          <ArrowLongIcon
            classes="h-10 w-10 md:hidden fill-dark_4"
            direction={Arrow.right}
          />
        </Link>
        <h1 className=" font-iranyekan_bold text-lg text-dark_3">
          مدیریت مشخصات
        </h1>
      </div>
      <div className="grid grid-cols-1 grid-rows-2 gap-3 px-4 sm:grid-cols-2">
        <div className="flex justify-between rounded-lg bg-dark_6 bg-opacity-5 px-4 py-2">
          <div className="flex flex-col gap-2">
            <p className="text-md text-dark_4">نام و نام خانوادگی</p>
            {!!session.user.name && !!session.user.family && (
              <div>
                <p className="text xl pr-2 font-iranyekan_bold text-dark_2">
                  <span>{session.user.name}</span>
                  <span> </span>
                  <span>{session.user.family}</span>
                </p>
              </div>
            )}
            {(!session.user.name || !session.user.family) && (
              <div>
                <p className="text-red-600">تکمیل مشخصات!</p>
              </div>
            )}
          </div>
          <div>
            <Name_family_codeMeli
              name={session.user.name}
              family={session.user.family}
              code_meli={session.user.code_meli}
              userId={session.user.id}
            />
          </div>
        </div>
        <div className="flex justify-between rounded-lg bg-dark_6 bg-opacity-5 px-4 py-2">
          <div className="flex flex-col gap-2">
            <p className="text-md text-dark_4"> شماره موبایل </p>
            {!!session.user.phone && (
              <div>
                <p className="pr-2 font-iransansnum font-bold text-dark_2 ">
                  <span>{session.user.phone}</span>
                </p>
              </div>
            )}
            {!session.user.phone && (
              <div>
                <p className="text-red-600">تکمیل مشخصات!</p>
              </div>
            )}
          </div>
          <div>
            <Phone userId={session.user.id} phone={session.user.phone} />
          </div>
        </div>
        <div className="flex justify-between rounded-lg bg-dark_6 bg-opacity-5 px-4 py-2">
          <div className="flex flex-col gap-2">
            <p className="text-md text-dark_4">ایمیل</p>
            {!!session.user.email && (
              <div>
                <p className="pr-2 font-iransansnum font-bold text-dark_2 ">
                  <span>{session.user.email}</span>
                </p>
              </div>
            )}
            {!session.user.email && (
              <div>
                <p className="text-red-600">تکمیل مشخصات!</p>
              </div>
            )}
          </div>
          <div>
            <Email userId={session.user.id} email={session.user.email} />
          </div>
        </div>
        <div className="flex justify-between rounded-lg bg-dark_6 bg-opacity-5 px-4 py-2">
          <div className="flex flex-col gap-2">
            <p className="text-md text-dark_4">رمز عبور</p>
            {!!session.user.password && (
              <div>
                <p className="pr-2 font-iransansnum text-dark_2 ">
                  <span> ••••••••••• </span>
                </p>
              </div>
            )}
            {!session.user.password && (
              <div>
                <p className="text-red-600">تکمیل مشخصات!</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {session.user.password && (
              <ChangePassword
                userId={session.user.id}
                phone={session.user.phone}
              />
            )}
            <AddPassword
              hasPassword={session.user.password}
              phone={session.user.phone}
            />
          </div>
        </div>
        <div className="flex justify-between rounded-lg bg-dark_6 bg-opacity-5 px-4 py-2">
          <div className="flex flex-col gap-2">
            <p className="text-md text-dark_4">آدرس</p>
            {!!address && (
              <div>
                <p className="">
                  <span>{address.state.state_name}</span>
                  <span> </span>
                  <span>{address.city.city_name}</span>
                </p>
                <p>
                  <span> {address.address} </span>
                  <span>کدپستی : </span>
                  <span className="font-iransansnum">{address.zip_code} </span>
                  <span>پلاک : </span>
                  <span className="font-iransansnum">
                    {address.house_number}
                  </span>
                </p>
              </div>
            )}
            {!address && (
              <div>
                <p className="text-red-600">تکمیل مشخصات!</p>
              </div>
            )}
          </div>
          <div>
            <Address userId={session.user.id} address={address} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal_info;
