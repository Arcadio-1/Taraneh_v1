import { DotIcon, StarIcon } from "lucide-react";
import React from "react";

interface Props {
  buyersRate: number;
}

const Statistics = ({ buyersRate }: Props) => {
  return (
    <div id="statistics" className="flex items-center">
      <div className="flex items-end">
        <StarIcon
          className="fill-yellow-500"
          stroke="none"
          height={15}
          width={15}
        />
        <span className="flex items-center gap-1 font-iransansnum">
          {buyersRate / 10}
          <span className="opacity-50">(358)</span>
        </span>
      </div>
      <DotIcon opacity={0.5} height={20} width={20} />
      <div className="text-cyan-600">
        <span className="font-iransansnum"> 132 </span>
        <span> دیدگاه</span>
      </div>
      <DotIcon opacity={0.5} height={20} width={20} />
      <div className="text-cyan-600">
        <span className="font-iransansnum"> 407 </span>
        <span> پرسش</span>
      </div>
    </div>
  );
};

export default Statistics;
