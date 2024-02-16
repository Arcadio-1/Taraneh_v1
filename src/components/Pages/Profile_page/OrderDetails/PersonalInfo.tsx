import DotIcon from "@/components/Util/ui/icons/DotIcon";
import { Address_Full } from "@/types_validation/type";
import React from "react";

interface Props {
  address: Address_Full;
  name: string;
  family: string;
  phone: string;
}

const PersonalInfo = ({ address, family, name, phone }: Props) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <label className="text-dark_5"> تحویل گیرنده</label>
            <p className="flex gap-1">
              <span className="font-bold text-dark_1">{name}</span>
              <span className="font-bold text-dark_1">{family}</span>
            </p>
          </div>
          <DotIcon classes=" h-2 w-2 fill-dark_5" />
          <div className="flex gap-2">
            <label className="text-dark_5"> شماره موبایل</label>
            <span className="font-iransansnum text-lg font-bold text-dark_1">
              {phone}
            </span>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <label className="text-dark_5"> آدرس</label>
            <p className="flex gap-1">
              <span className="font-bold text-dark_1">
                {address.state.state_name}
              </span>
              <span className="font-bold text-dark_1">
                {address.city.city_name}
              </span>
              <span className="font-bold text-dark_1">{address.address}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
