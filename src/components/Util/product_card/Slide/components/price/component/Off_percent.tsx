import React from "react";

interface Props {
  percent: string;
}

const Off_percent = ({ percent }: Props) => {
  return (
    <p className="bg-error px-3 text-light_1 text-lg font-iransansnum font-thin rounded-full">
      {percent}
    </p>
  );
};

export default Off_percent;
