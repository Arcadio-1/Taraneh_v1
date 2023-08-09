import "../style/globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
      <body className="bg-g1_1">
        <main className="max-w-[1720px] bg-violet-50 m-auto  flex-col items-center justify-center overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
