"use client";
import React, { useRef } from "react";
import Introduction from "./introduction/Introduction";
import Reviews from "./reviews/Reviews";
import SpecificationsComponent from "./specifications/Specifications";
import {
  CommentWithUser,
  Product_full,
  ShoppingCart,
  Specifications_select_specifications,
} from "@/types_validation/type";
import Prod_order from "../main/order/Prod_order";
import Nav from "./nav/Nav";
import { Session } from "next-auth";

interface Props {
  session: Session | null;
  product_id: string;
  product: Product_full;
  cart: ShoppingCart | null;
  introduction: string | undefined;
  comments: CommentWithUser[] | [];
  specifications: Specifications_select_specifications | null;
}

const Sub = ({
  product_id,
  cart,
  product,
  comments,
  introduction,
  specifications,
  session,
}: Props) => {
  const reviews_ref = useRef<HTMLDivElement>(null);
  return (
    <div className="">
      <Nav reviews_ref={reviews_ref} />
      <div className="flex">
        <div className="flex flex-col gap-5">
          {introduction && <Introduction introduction={introduction} />}
          {specifications && (
            <SpecificationsComponent
              specifications={specifications.specifications}
            />
          )}
          {comments && (
            <Reviews
              reviews_ref={reviews_ref}
              session={session}
              comments={comments}
              rate={product.statistics.buyerRate}
              product_id={product_id}
              product_title={product.title}
            />
          )}
        </div>
        <div className="sticky top-10 z-20 hidden min-w-[24rem] shrink self-start px-5 py-[4rem] lg:flex">
          <Prod_order
            status={product.status}
            price={product.price}
            offPercent={product.off_percent}
            product_Id={product_id}
            cart={cart}
          />
        </div>
      </div>
    </div>
  );
};

export default Sub;
