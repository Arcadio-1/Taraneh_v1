"use client";
import React from "react";

import { Product_full } from "@/types_validation/type";
import Statistics from "./Statistics";
import Suggestion from "./Suggestion";
import Attributes from "./Attributes";
import Divider from "@/components/Util/ui/Divider";
import Notice from "./Notice";

interface Props {
  product: Product_full;
}

const Prod_specification = ({ product }: Props) => {
  return (
    <div className="col-span-2 row-span-2 flex flex-col gap-4 px-3">
      <Divider />
      <Statistics buyersRate={product.statistics.buyerRate} />
      <Suggestion />
      <Attributes />
      <Divider className="py-2" />
      <Notice category={product.specific_cat.title} />
    </div>
  );
};

export default Prod_specification;
