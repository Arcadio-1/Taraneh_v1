import DotIcon from "@/components/Util/ui/icons/DotIcon";
import { gregorian_to_jalali } from "@/util_functions/calender";
import { CommentWithUser } from "@/types_validation/type";
import Divider from "@/components/Util/ui/Divider";
import React from "react";
import Like_form from "./Like_form";
import { Session } from "next-auth";

interface Props {
  review: CommentWithUser;
  session: Session | null;
  product_id: string;
}
const ReviewItem_mobile = ({ review, session, product_id }: Props) => {
  const date = gregorian_to_jalali(review.date);
  return (
    <div className="flex h-full flex-col border p-4">
      <div className="flex flex-col items-start ">
        <p
          className={`rounded-[3px] px-3 font-iransansnum text-lg text-light_2 ${
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
        <h2 className="py-3 font-iranyekan_bold text-xl">
          {review.title.substring(0, 30)}
          {review.title.length > 30 && <span>...</span>}
        </h2>
      </div>
      <div className="flex h-full flex-col items-stretch justify-between px-4">
        <div className="grow pb-4 pt-6">
          <p
            className="font-iranyekan_bold text-xl leading-9 "
            style={{ wordBreak: "break-word" }}
          >
            {review.text.substring(0, 100)}
            {review.text.length > 40 && <span>...</span>}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center  gap-1 text-dark_4">
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
    </div>
  );
};

export default ReviewItem_mobile;
