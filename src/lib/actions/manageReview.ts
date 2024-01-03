"use server";
import { z } from "zod";
import { commentSchame } from "../util/validation";
import { prisma } from "../db/prisma";
import { revalidatePath } from "next/cache";
import { CommentWithUser, LikeMethod } from "@/types/type";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";

export const get_comments = async () => {
  try {
    const comments: CommentWithUser[] = await prisma.comments.findMany({
      include: { user: { select: { name: true, family: true, id: true } } },
      orderBy: { date: "desc" },
    });
    return comments;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const add_comment = async (
  comment: z.infer<typeof commentSchame>,
  product_id: string
) => {
  try {
    await prisma.comments.create({ data: comment });
    revalidatePath(`/product/${product_id}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const like_manage = async (
  user_id: string,
  comment_id: string,
  product_id: string,
  like_method: LikeMethod
) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("you should login first");
    }
    const comment = await prisma.comments.findFirst({
      where: {
        id: comment_id,
      },
    });

    if (!comment) {
      throw new Error("comment not found");
    }

    const is_there_like = comment.like.find((item) => {
      if (item.userId === user_id) {
        return true;
      }
    });
    const is_there_dislike = comment.dislike.find((item) => {
      if (item.userId === user_id) {
        return true;
      }
    });
    if (like_method === LikeMethod.Like) {
      if (!is_there_like && !is_there_dislike) {
        await prisma.comments.update({
          where: { id: comment_id },
          data: { like: { push: { userId: user_id } } },
        });
      }
      if (is_there_like) {
        await prisma.comments.update({
          where: { id: comment_id },
          data: { like: { deleteMany: { where: { userId: user_id } } } },
        });
      }
      if (is_there_dislike) {
        await prisma.comments.update({
          where: { id: comment_id },
          data: {
            dislike: { deleteMany: { where: { userId: user_id } } },
            like: { push: { userId: user_id } },
          },
        });
      }
    }
    if (like_method === LikeMethod.Dislike) {
      if (!is_there_like && !is_there_dislike) {
        await prisma.comments.update({
          where: { id: comment_id },
          data: { dislike: { push: { userId: user_id } } },
        });
      }
      if (is_there_dislike) {
        await prisma.comments.update({
          where: { id: comment_id },
          data: { dislike: { deleteMany: { where: { userId: user_id } } } },
        });
      }
      if (is_there_like) {
        await prisma.comments.update({
          where: { id: comment_id },
          data: {
            like: { deleteMany: { where: { userId: user_id } } },
            dislike: { push: { userId: user_id } },
          },
        });
      }
    }
    revalidatePath(`/product/${product_id}`);
  } catch (error) {
    console.log(error);
  }
};
