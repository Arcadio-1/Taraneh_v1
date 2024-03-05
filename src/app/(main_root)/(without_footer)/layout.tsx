import Header from "@/components/Util/layouts/header/Header";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ContentWrapper from "@/components/Pages/Profile_page/util/contentWraper/ContentWrapper";
import Aside from "@/components/Pages/Profile_page/util/aside/Aside";
import { T_panelAsideLinks } from "@/types_validation/type";
import { Role } from "@prisma/client";
import HomeIcon from "@/components/Pages/Profile_page/util/aside/navigation/icons/HomeIcon";
import OrdersIcon from "@/components/Pages/Profile_page/util/aside/navigation/icons/OrdersIcon";
import AddressesIcon from "@/components/Pages/Profile_page/util/aside/navigation/icons/AddressesIcon";
import Personal_info_icon from "@/components/Pages/Profile_page/util/aside/navigation/icons/Personal_info_icon";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/users/login?callback=/profile");
  }
  const aside_links: T_panelAsideLinks[] = [
    {
      id: "1",
      title: "خلاصه فعالیت ها",
      link: "/profile",
      role: Role.USER,
      icon: <HomeIcon className="h-8 w-8 fill-gray-600" />,
    },
    {
      id: "2",
      title: "سفارش ها",
      link: "/profile/orders",
      role: Role.USER,
      icon: <OrdersIcon className="h-8 w-8 stroke-gray-600" />,
    },
    {
      id: "3",
      title: " آدرس ها",
      link: "/profile/addresses",
      role: Role.USER,
      icon: <AddressesIcon className="h-8 w-8 fill-gray-600" />,
    },
    {
      id: "4",
      title: "اطلاعات حساب کاربری",
      role: Role.USER,
      link: "/profile/user-info",
      icon: <Personal_info_icon className="h-8 w-8 fill-gray-600" />,
    },
  ];
  return (
    <>
      <Header />
      <section>
        <div className="mx-auto mt-6 grid max-w-[1124px] grid-cols-[repeat(8,minmax(0,1fr))]">
          <div className="col-span-2 hidden md:block">
            <Aside links={aside_links} session={session} />
          </div>
          <ContentWrapper>{children}</ContentWrapper>
        </div>
      </section>
    </>
  );
}
