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
const ReviewItem_mobile = ({ review, session, product_id }: Props) => {
  const date = gregorian_to_jalali(review.date);
  return (
    <div className="flex flex-col border p-4 h-full">
      <div className="flex items-start flex-col ">
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
        <h2 className="font-iranyekan_bold text-xl py-3">
          {review.title.substring(0, 30)}
          {review.title.length > 30 && <span>...</span>}
        </h2>
      </div>
      <div className="px-4 flex flex-col justify-between items-stretch h-full">
        <div className="pt-6 pb-4 grow">
          <p
            className="text-xl font-iranyekan_bold leading-9 "
            style={{ wordBreak: "break-word" }}
          >
            {review.text.substring(0, 100)}
            {review.text.length > 40 && <span>...</span>}
          </p>
        </div>
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
    </div>
  );
};

export default ReviewItem_mobile;
