import Aside from "@/components/Pages/Profile_page/aside/Aside";
import Header from "@/components/Util/layouts/header/Header";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/users/login?callback=/profile");
  }
  return (
    <>
      <Suspense fallback={<p>heather loading</p>}>
        <Header />
      </Suspense>
      <section>
        <div className="mx-auto mt-6 grid max-w-[1124px] grid-cols-[repeat(8,minmax(0,1fr))] gap-4">
          <div className="col-span-2 hidden md:block">
            <Aside session={session} />
          </div>
          {children}
        </div>
      </section>
    </>
  );
}
