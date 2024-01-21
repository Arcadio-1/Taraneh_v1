import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";

export const getUserId = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  return session.user.id;
};
