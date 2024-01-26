import Header from "@/components/Util/layouts/header/Header";
import { Suspense } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<p>heather loading</p>}>
        <Header />
      </Suspense>
      <section>{children}</section>
    </>
  );
}
