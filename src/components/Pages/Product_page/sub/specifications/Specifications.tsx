import Red_under from "@/components/Util/ui/Red_under";
import { specificationItem } from "@prisma/client";
import React from "react";
import { Element } from "react-scroll";
import { Interface } from "readline";

interface Props {
  specifications: specificationItem[];
}

const Specifications = ({ specifications }: Props) => {
  return (
    <Element name="Specifications">
      <div className="px-5">
        <div className="py-4 mb-8">
          <h1 className="text-2xl font-iranyekan_bold">مشخصات</h1>
          <Red_under />
        </div>
        <div>
          <div className="grid grid-cols-4">
            <h2 className="hidden md:block font-iransansbold text-2xl text-dark_4">
              مشخصات
            </h2>
            <div className="col-span-4 md:col-span-3">
              <div className=" flex flex-col gap-2">
                {specifications.map((item, index) => {
                  return (
                    <div key={index} className="grid grid-cols-4 items-center">
                      <span className="text-lg font-iranyekan_bold text-dark_4">
                        {item.label}
                      </span>
                      <span className="col-span-3 border-b px-1 py-4 text-lg font-iranyekan_bold">
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
    </Element>
  );
};

export default Specifications;
