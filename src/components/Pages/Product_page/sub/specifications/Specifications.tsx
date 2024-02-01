import { get_propsduct_specifications } from "@/actions/getProductSpecifications";
import Red_under from "@/components/Util/ui/Red_under";
import { Specifications_select_specifications } from "@/types_validation/type";
import React from "react";
import ReactScrollElement from "../ui/ReactScrollElement";

interface Props {
  product_id: string;
}

const Specifications = async ({ product_id }: Props) => {
  const specifications: Specifications_select_specifications =
    await get_propsduct_specifications(product_id);

  return (
    <ReactScrollElement name="Specifications">
      <div className="px-5">
        <div className="mb-8 py-4">
          <h1 className="font-iranyekan_bold text-2xl">مشخصات</h1>
          <Red_under />
        </div>
        <div>
          <div className="grid grid-cols-4">
            <h2 className="hidden font-iransansbold text-2xl text-dark_4 md:block">
              مشخصات
            </h2>
            <div className="col-span-4 md:col-span-3">
              <div className=" flex flex-col gap-2">
                {specifications?.specifications.map((item, index) => {
                  return (
                    <div key={index} className="grid grid-cols-4 items-center">
                      <span className="font-iranyekan_bold text-lg text-dark_4">
                        {item.label}
                      </span>
                      <span className="col-span-3 border-b px-1 py-4 font-iranyekan_bold text-lg">
                        {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactScrollElement>
  );
};

export default Specifications;
