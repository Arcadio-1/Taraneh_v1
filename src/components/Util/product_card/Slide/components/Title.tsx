import React from "react";

interface Props {
  title: String;
}

const Title = ({ title }: Props) => {
  return <h2 className="font-iranyekan_bold text-lg text-dark_2">{title}</h2>;
};

export default Title;
