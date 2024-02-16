import { getAddress } from "@/actions/userInfo/address/getAddress";
import Address from "@/components/Pages/Profile_page/User_info/dialogs/Address";
import Email from "@/components/Pages/Profile_page/User_info/dialogs/Email";
import Name_family_codeMeli from "@/components/Pages/Profile_page/User_info/dialogs/Name_family_codeMeli";
import Phone from "@/components/Pages/Profile_page/User_info/dialogs/changePhone/Phone";
import AddPassword from "@/components/Pages/Profile_page/User_info/dialogs/password/AddPassword";
import ChangePassword from "@/components/Pages/Profile_page/User_info/dialogs/password/ChangePassword";
import RefreshButton from "@/components/Util/components/refreshButton/RefreshButton";
import ArrowLongIcon, { Arrow } from "@/components/Util/ui/icons/ArrowLongIcon";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    notFound();
  }
  const { name, family, code_meli, id, password, phone, email } = session.user;
  const requestaddress = await getAddress();
  if (!requestaddress.ok) {
    return (
      <div>
        <div className="flex items-center justify-start gap-2 px-3">
          <Link href={`/profile`}>
            <ArrowLongIcon
              classes="h-10 w-10 md:hidden fill-dark_3"
              direction={Arrow.right}
            />
          </Link>
          <h1 className=" font-iranyekan_bold text-lg text-dark_3">
            تاریخچه سفارشات
          </h1>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg px-4 py-4">
            <div className="flex gap-2">
              <h1 className="text-2xl">{requestaddress.message}</h1>
            </div>
            <RefreshButton />
          </div>
        </div>
      </div>
    );
  }
  const { address } = requestaddress;
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
            {!!name && !!family && (
              <div>
                <p className="text xl pr-2 font-iranyekan_bold text-dark_2">
                  <span>{name}</span>
                  <span> </span>
                  <span>{family}</span>
                </p>
              </div>
            )}
            {(!name || !family) && (
              <div>
                <p className="text-red-600">تکمیل مشخصات!</p>
              </div>
            )}
          </div>
          <div>
            <Name_family_codeMeli
              name={name}
              family={family}
              code_meli={code_meli}
            />
          </div>
        </div>
        <div className="flex justify-between rounded-lg bg-dark_6 bg-opacity-5 px-4 py-2">
          <div className="flex flex-col gap-2">
            <p className="text-md text-dark_4"> شماره موبایل </p>
            {!!phone && (
              <div>
                <p className="pr-2 font-iransansnum font-bold text-dark_2 ">
                  <span>{phone}</span>
                </p>
              </div>
            )}
            {!phone && (
              <div>
                <p className="text-red-600">تکمیل مشخصات!</p>
              </div>
            )}
          </div>
          <div>
            <Phone phone={phone} />
          </div>
        </div>
        <div className="flex justify-between rounded-lg bg-dark_6 bg-opacity-5 px-4 py-2">
          <div className="flex flex-col gap-2">
            <p className="text-md text-dark_4">ایمیل</p>
            {!!email && (
              <div>
                <p className="pr-2 font-iransansnum font-bold text-dark_2 ">
                  <span>{email}</span>
                </p>
              </div>
            )}
            {!email && (
              <div>
                <p className="text-red-600">تکمیل مشخصات!</p>
              </div>
            )}
          </div>
          <div>
            <Email email={email} />
          </div>
        </div>
        <div className="flex justify-between rounded-lg bg-dark_6 bg-opacity-5 px-4 py-2">
          <div className="flex flex-col gap-2">
            <p className="text-md text-dark_4">رمز عبور</p>
            {!!password && (
              <div>
                <p className="pr-2 font-iransansnum text-dark_2 ">
                  <span> ••••••••••• </span>
                </p>
              </div>
            )}
            {!password && (
              <div>
                <p className="text-red-600">تکمیل مشخصات!</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {password && <ChangePassword userId={id} phone={phone} />}
            <AddPassword hasPassword={password} phone={phone} />
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
            <Address address={address} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
