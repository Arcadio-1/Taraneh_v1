import DotIcon from "@/components/Util/icons/DotIcon";
import { gregorian_to_jalali } from "@/lib/util/calender";
import { CommentWithUser } from "@/types/type";
import { Divider } from "@mui/material";
import React from "react";
import Like_form from "./Like_form";
import { Session } from "next-auth";
interface Props {
  review: CommentWithUser;
  session: Session | null;
  product_id: string;
}

const ReviewItem = ({ review, session, product_id }: Props) => {
  const date = gregorian_to_jalali(review.date);
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <p
          className={`text-lg font-iransansnum px-3 rounded-[3px] text-light_2 ${
            review.rate === 50 ? "bg-green-600" : ""
          } ${review.rate === 40 ? "bg-green-500" : ""} ${
            review.rate === 30 ? "bg-lime-700" : ""
          } ${review.rate === 20 ? "bg-lime-600" : ""} ${
            review.rate === 10 ? "bg-orange-400" : ""
          }`}
        >
          <span>{review.rate / 10}</span>
          <span>.</span>
          <span>0</span>
        </p>
        <h2 className="font-iranyekan_bold text-2xl py-3">{review.title}</h2>
      </div>
      <div className="px-4">
        <div className="flex flex-col gap-3 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center  text-dark_4 gap-1">
              <span>{review.user.name}</span>
              <span>{review.user.family}</span>
            </div>
            <DotIcon classes="fill-dark_4 h-3 w-3" />
            <div className="flex items-center gap-1 text-dark_4">
              <span className=" font-iransansnum">{date.day}</span>
              <span className="">{date.monthLabel}</span>
              <span className=" font-iransansnum">{date.year}</span>
            </div>
          </div>
        </div>
        <Divider className="opacity-50" />
        <div className="pt-6 pb-4">
          <p
            className="text-xl font-iranyekan_bold leading-9 "
            style={{ wordBreak: "break-word" }}
          >
            {review.text}
          </p>
        </div>
        <Divider className="opacity-50" />
        <div className="flex items-center gap-6 justify-end py-5">
          <p>آیا این دیدگته مفید بود؟</p>
          <Like_form
            comment_id={review.id}
            session={session}
            dislike={review.dislike.length}
            like={review.like.length}
            likes={review.like}
            dislikes={review.dislike}
            product_id={product_id}
          />
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default ReviewItem;
