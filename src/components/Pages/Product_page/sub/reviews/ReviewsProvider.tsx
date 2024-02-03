import { get_comments } from "@/actions/manageReview";
import { CommentWithUser } from "@/types_validation/type";
import { Session, getServerSession } from "next-auth";
import React from "react";
import Reviews from "./Reviews";
import ReactScrollElement from "../ui/ReactScrollElement";
import { authOptions } from "@/lib/auth/authOptions";

interface Props {
  product_id: string;
  product_title: string;
  rate: number;
}

const ReviewsProvider = async ({ product_id, product_title, rate }: Props) => {
  const session = await getServerSession(authOptions);
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
