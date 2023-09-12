import React from "react";

interface Props {
  params: {
    product_id: string[];
  };
}

const page = ({ params: { product_id } }: Props) => {
  console.log(product_id);
  return <div>multi</div>;
};

export default page;
