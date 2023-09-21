import React from "react";

interface Props {
  price: string;
  off_price: string;
  off_percent: number;
}

const Final_price = ({ off_percent, off_price, price }: Props) => {
  return (
    <div className={`flex flex-col justify-start items-end gap-1`}>
      <p className="grow-0 text-2xl text-dark_3">{price}</p>
      {!!off_percent && <p className="line-through opacity-50">{off_price}</p>}
    </div>
  );
};

export default Final_price;
