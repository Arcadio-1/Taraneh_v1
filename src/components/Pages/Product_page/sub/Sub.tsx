import React, { Suspense } from "react";
import Introduction from "./introduction/Introduction";
import SpecificationsComponent from "./specifications/Specifications";
import { Product_full } from "@/types_validation/type";
import Prod_order from "../main/order/Prod_order";
import Nav from "./nav/Nav";
import ReviewsProvider from "./reviews/ReviewsProvider";

interface Props {
  product: Product_full;
}

const Sub = ({ product }: Props) => {
  return (
    <div className="">
      <Nav />
      <div className="flex">
        <div className="flex flex-col gap-5">
          <Suspense fallback={<p>Introduction</p>}>
            <Introduction product_id={product.id} />
          </Suspense>
          <Suspense fallback={<p>SpecificationsComponent</p>}>
            <SpecificationsComponent product_id={product.id} />
          </Suspense>
          <Suspense fallback={<p>ReviewsProvider</p>}>
            <ReviewsProvider
              rate={product.statistics.buyerRate}
              product_id={product.id}
              product_title={product.title}
            />
          </Suspense>
        </div>
        <div className="sticky top-10 z-20 mr-auto hidden min-w-[24rem] shrink self-start px-5 py-[4rem] lg:flex">
          <Prod_order
            status={product.status}
            price={product.price}
            offPercent={product.off_percent}
            product_Id={product.id}
          />
        </div>
      </div>
    </div>
  );
};

export default Sub;
