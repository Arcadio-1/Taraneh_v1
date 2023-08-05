import React from "react";

interface Props {
  rateNum: number;
}

const Rate = ({ rateNum }: Props) => {
  return (
    <div className="flex items-center justify-end gap-1 mt-5">
      <h2 className="font-iransansnum font-bold text-lg">{rateNum / 10}</h2>
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title />
        <path
          d="M21.82,10.74,16.7,14.45l2,6a1,1,0,0,1-.37,1.12,1,1,0,0,1-1.17,0L12,17.87,6.88,21.59a1,1,0,0,1-1.17,0,1,1,0,0,1-.37-1.12l2-6L2.18,10.74a1,1,0,0,1,.59-1.81H9.09l2-6a1,1,0,0,1,1.9,0l2,6h6.32a1,1,0,0,1,.59,1.81Z"
          className="fill-g1_3"
        />
      </svg>
    </div>
  );
};

export default Rate;
