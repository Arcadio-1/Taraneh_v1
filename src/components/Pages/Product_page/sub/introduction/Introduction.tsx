import Red_under from "@/components/Util/ui/Red_under";
import React from "react";
import { Element } from "react-scroll";
interface Props {
  introduction: string;
}
const Introduction = ({ introduction }: Props) => {
  return (
    <Element name="Introduction">
      <div className="px-5">
        <div className="py-4 mb-8">
          <h1 className="text-2xl font-iranyekan_bold">معرفی</h1>
          <Red_under />
        </div>
        <p className="text-xl leading-10">{introduction}</p>
      </div>
    </Element>
  );
};

export default Introduction;
