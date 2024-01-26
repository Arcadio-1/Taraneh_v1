import React, { FC } from "react";
import Sub from "./Sub";
import { get_product_interduction } from "@/actions/getProductInterduction";
import {
  CommentWithUser,
  Product_full,
  ShoppingCart,
  Specifications_select_specifications,
} from "@/types_validation/type";
import { get_comments } from "@/actions/manageReview";
import { get_propsduct_specifications } from "@/actions/getProductSpecifications";
import { Session } from "next-auth";

interface Props {
  product_id: string;
  cart: ShoppingCart | null;
  product: Product_full;
  session: Session | null;
}

const SubProvider: FC<Props> = async ({
  cart,
  product,
  product_id,
  session,
}) => {
  const introduction = await get_product_interduction(product_id);

  const comments: CommentWithUser[] = await get_comments();

  const specifications: Specifications_select_specifications | null =
    await get_propsduct_specifications(product_id);

  return (
    <Sub
      session={session}
      comments={comments}
      introduction={introduction?.description}
      specifications={specifications}
      product_id={product_id}
      cart={cart}
      product={product}
    />
  );
};

export default SubProvider;
