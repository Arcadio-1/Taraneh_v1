"use client";
import DisLikeIcon from "@/components/Util/icons/DisLikeIcon";
import LikeIcon from "@/components/Util/icons/LikeIcon";
import Login_dialog from "@/components/Util/login_dialog/Login_dialog";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components_shadcn/ui/dialog";
import { like_manage } from "@/lib/actions/manageReview";
import { LikeMethod } from "@/types/type";
import { CircularProgress } from "@mui/material";
import { User_id_type } from "@prisma/client";
import { Session } from "next-auth";
import React, { useState } from "react";

interface Props {
  like: number;
  dislike: number;
  session: Session | null;
  comment_id: string;
  product_id: string;
  likes: User_id_type[];
  dislikes: User_id_type[];
}

const Like_form = ({
  like,
  dislike,
  session,
  comment_id,
  product_id,
  dislikes,
  likes,
}: Props) => {
  const [like_status, set_like_status] = useState<boolean>(false);
  const is_there_like = likes.find((item) => {
    if (item.userId === session?.user.id) {
      return true;
    }
  });
  const is_there_dislike = dislikes.find((item) => {
    if (item.userId === session?.user.id) {
      return true;
    }
  });
  return (
    <div>
      {session ? (
        <div>
          {like_status ? (
            <div>
              <CircularProgress size={20} />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={async () => {
                  set_like_status(true);
                  await like_manage(
                    session.user.id,
                    comment_id,
                    product_id,
                    LikeMethod.Like
                  );
                  set_like_status(false);
                }}
                className="flex items-center gap-1 cursor-pointer"
              >
                <span className="font-iransansnum text-xl">{like}</span>
                <LikeIcon
                  classes={`h-8 w-8 fill-dark_5 ${
                    is_there_like ? "fill-green-600" : ""
                  }`}
                />
              </button>
              <button
                onClick={async () => {
                  set_like_status(true);
                  await like_manage(
                    session.user.id,
                    comment_id,
                    product_id,
                    LikeMethod.Dislike
                  );
                  set_like_status(false);
                }}
                className="flex items-center gap-1 cursor-pointer"
              >
                <span className="font-iransansnum text-xl">{dislike}</span>
                <DisLikeIcon
                  classes={`h-8 w-8 fill-dark_5 ${
                    is_there_dislike ? "fill-red-600" : ""
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      ) : (
        <Dialog>
          <div className="flex items-center gap-3">
            <DialogTrigger asChild>
              <button className="flex items-center gap-1 cursor-pointer">
                <span className="font-iransansnum text-xl">{like}</span>
                <LikeIcon classes="h-8 w-8 fill-dark_5" />
              </button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1 cursor-pointer">
                <span className="font-iransansnum text-xl">{dislike}</span>
                <DisLikeIcon classes="h-8 w-8 fill-dark_5" />
              </button>
            </DialogTrigger>
          </div>
          <DialogContent className="sm:max-w-[425px] bg-opacity-100 bg-light_1">
            <Login_dialog />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Like_form;
