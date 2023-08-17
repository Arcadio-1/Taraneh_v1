import React from "react";

interface Props {
  percent: string;
}

const Off_percent = ({ percent }: Props) => {
  return (
    <p className="bg-error py-1 pb-0 px-3 rounded-md text-light_1 text-xl font-iransansnum font-thin">
      {percent}
    </p>
  );
};

export default Off_percent;
