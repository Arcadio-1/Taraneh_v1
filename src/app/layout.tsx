import Navbar from "@/components/Util/nav/Navbar";
import "../style/globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/app/SessionProvider";
import { MainCatsWithSpecificCats } from "@/types/type";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { getCart } from "@/lib/actions/getCart";
import Provider from "./(provider)/Provider";
import { Toaster } from "@/components_shadcn/ui/toaster";
import Footer from "@/components/Util/footer/Footer";
import { Suspense } from "react";
const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "cyan" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export const metadata: Metadata = {
  title: "ترانه",
  description: "Digikala clone | کلون فروشگاه اینترنتی دیجیکالا",
  manifest: `/manifest.json`,
  metadataBase: new URL("https://taraneh-v1.vercel.app/"),
  openGraph: {
    title: "ترانه",
    description: "Digikala clone | کلون فروشگاه اینترنتی دیجیکالا",
    images: [
      {
        url: "/image/thumbnail.png",
      },
    ],
  },
  twitter: {
    title: "ترانه",
    description: "Digikala clone | کلون فروشگاه اینترنتی دیجیکالا",
    images: [
      {
        url: "/image/thumbnail.png",
      },
    ],
  },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const cats: MainCatsWithSpecificCats[] = await prisma.main_cat.findMany({
    include: { Specific_cat: true },
  });
  const cart = await getCart();

  return (
    <html lang="fa" dir="rtl">
      <body className="max-w-[1720px] m-auto font-iranyekan flex-col items-center justify-center">
        <SessionProvider>
          <Provider>
            <Navbar cats={cats} cart={cart} session={session} />
            <main className="">{children}</main>
            <Footer />
            <Toaster />
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
