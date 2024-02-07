import { get_product_interduction } from "@/actions/product/getProductInterduction";
import Red_under from "@/components/Util/ui/Red_under";
import React from "react";
import ReactScrollElement from "../ui/ReactScrollElement";
// import { Element } from "react-scroll";
interface Props {
  product_id: string;
}
const Introduction = async ({ product_id }: Props) => {
  const introduction = await get_product_interduction(product_id);
  return (
    <ReactScrollElement name="Introduction">
      <div className="px-5">
        <div className="mb-8 py-4">
          <h1 className="font-iranyekan_bold text-2xl">معرفی</h1>
          <Red_under />
        </div>
        <p className="text-xl leading-10">{introduction?.description}</p>
      </div>
    </ReactScrollElement>
  );
};

export default Introduction;
