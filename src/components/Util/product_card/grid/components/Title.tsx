import React from "react";

interface Props {
  title: String;
}

const Title = ({ title }: Props) => {
  return (
    <h2 className="font-iransansnum font-bold text-dark_2 text-xl">{title}</h2>
  );
};

export default Title;
