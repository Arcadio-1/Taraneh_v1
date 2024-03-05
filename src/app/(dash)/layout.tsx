import Aside from "@/components/Pages/Profile_page/util/aside/Aside";
import ContentWrapper from "@/components/Pages/Profile_page/util/contentWraper/ContentWrapper";
import { T_panelAsideLinks } from "@/types_validation/type";
import { Role } from "@prisma/client";
import HomeIcon from "@/components/Pages/Profile_page/util/aside/navigation/icons/HomeIcon";
import OrdersIcon from "@/components/Pages/Profile_page/util/aside/navigation/icons/OrdersIcon";
import Personal_info_icon from "@/components/Pages/Profile_page/util/aside/navigation/icons/Personal_info_icon";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoIcon from "@/components/Util/ui/icons/LogoIcon";
import HelpIcon from "@/components/Util/ui/icons/helpIcon";
import { User } from "@/components/Util/layouts/header/components/User/User";
import { SettingsIcon } from "lucide-react";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== Role.ADMIN) {
    redirect("/users/login?callback=/dashboard");
  }

  const aside_links: T_panelAsideLinks[] = [
    {
      id: "1",
      title: "خلاصه فعالیت ها",
      link: "/dashboard",
      role: Role.ADMIN,
      icon: <HomeIcon className="h-8 w-8 fill-gray-600" />,
    },
    {
      id: "2",
      title: "کاربران",
      link: "/dashboard/users",
      role: Role.ADMIN,
      icon: <Personal_info_icon className="h-8 w-8 fill-gray-600" />,
    },
    {
      id: "3",
      title: "محصولات",
      link: "/dashboard/products",
      role: Role.ADMIN,
      icon: <OrdersIcon className="h-8 w-8 stroke-gray-600" />,
    },
    {
      id: "4",
      title: "سفارشات",
      link: "/dashboard/orders",
      role: Role.ADMIN,
      icon: <OrdersIcon className="h-8 w-8 stroke-gray-600" />,
    },
    {
      id: "5",
      title: "تنظیمات",
      role: Role.ADMIN,
      link: "/dashboard/setting",
      icon: <SettingsIcon className="h-8 w-8 stroke-gray-600" />,
    },
  ];
  return (
    <>
      <section>
        <header className="flex items-center justify-between border-2 px-4">
          <Link href={"/"}>
            <LogoIcon className="h-[6rem] w-[12rem]" />
          </Link>
          <div className="flex">
            <User />
            <HelpIcon className="h-10 w-10 " />
          </div>
        </header>
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
