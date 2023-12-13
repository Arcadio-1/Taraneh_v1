import Red_under from "@/components/Util/ui/Red_under";
import React from "react";
import Add_review from "./Add_review";
import ReviewItem from "./ReviewItem";
import { CommentWithUser } from "@/types/type";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { Session } from "next-auth";
import { Element } from "react-scroll";

interface Props {
  comments: CommentWithUser[];
  product_id: string;
  product_title: string;
  rate: number;
  session: Session | null;
  reviews_ref: React.RefObject<HTMLDivElement>;
}

const Reviews = ({
  comments,
  rate,
  product_id,
  product_title,
  session,
  reviews_ref,
}: Props) => {
  return (
    <Element name="Reviews">
      <div className="flex flex-col gap-10">
        <div className="py-4 mb-8">
          <h1 className="text-2xl font-iranyekan_bold">
            امتیاز ودیدگاه کاربران
          </h1>
          <Red_under />
        </div>
        <div className="flex gap-4 relative">
          <div className="sticky top-10 px-5 py-[4rem] bg-white self-start shrink min-w-[22rem]">
            <Add_review
              product_title={product_title}
              product_id={product_id}
              rate={rate}
              session={session}
            />
          </div>
          <div className="flex flex-col gap-4 grow">
            {comments.map((item) => {
              return (
                <ReviewItem
                  session={session}
                  review={item}
                  key={item.id}
                  product_id={product_id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Element>
  );
};

export default Reviews;
