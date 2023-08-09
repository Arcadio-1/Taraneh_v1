import React from "react";

enum SellingType {
  normal = "normal",
  spacial = "spacial",
}

interface Props {
  type: string;
}

const Status = ({ type }: Props) => {
  return (
    <div className="absolute top-10 left-0">
      {type === SellingType.normal && (
        <span className="font-iranyekan  bg-red-500 text-light_1 px-3 py-1">
          فروش ویژه
        </span>
      )}
    </div>
  );
};

export default Status;
