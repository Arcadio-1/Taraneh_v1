import { get_comments } from "@/actions/manageReview";
import { CommentWithUser } from "@/types_validation/type";
import { Session } from "next-auth";
import React from "react";
import Reviews from "./Reviews";
import ReactScrollElement from "../ui/ReactScrollElement";

interface Props {
  product_id: string;
  product_title: string;
  rate: number;
  session: Session | null;
}

const ReviewsProvider = async ({
  product_id,
  product_title,
  rate,
  session,
}: Props) => {
  const comments: CommentWithUser[] = await get_comments();
  return (
    <ReactScrollElement name="Reviews">
      <Reviews
        session={session}
        comments={comments}
        rate={rate}
        product_id={product_id}
        product_title={product_title}
      />
    </ReactScrollElement>
  );
};

export default ReviewsProvider;
