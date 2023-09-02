import Navbar from "@/components/Util/nav/Navbar";
import "../style/globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/app/SessionProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ترانه",
  description: "Developed and Designed By Rkdo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="max-w-[1720px] bg-light_1 m-auto font-iranyekan flex-col items-center justify-center">
        <SessionProvider>
          <Navbar />
          <main className="">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
