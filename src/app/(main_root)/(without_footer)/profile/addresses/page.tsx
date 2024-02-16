import { getAddress } from "@/actions/userInfo/address/getAddress";
import AddressForm from "@/components/Pages/Profile_page/util/AddressForm/AddressForm";
import ArrowLongIcon, { Arrow } from "@/components/Util/ui/icons/ArrowLongIcon";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/users/login?callback=/profile/orders");
  }

  const requestfullAddress = await getAddress();
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
      <AddressForm address={requestfullAddress.address} />
    </div>
  );
};

export default page;
