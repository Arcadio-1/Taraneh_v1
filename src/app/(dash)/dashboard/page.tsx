import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

const page = async () => {
  const session = await getServerSession(authOptions);

  return <div></div>;
};
export default page;
