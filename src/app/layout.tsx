import "../style/globals.scss";
import type { Metadata } from "next";
import SessionProvider from "@/app/SessionProvider";
import { Toaster } from "@/components/Util/shadcn/ui/toaster";
import Provider from "./provider/Provider";

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
  title: { default: "ترانه", template: "%s - ترانه" },
  description: "Digikala clone | کلون فروشگاه اینترنتی دیجیکالا",
  manifest: `/manifest.json`,
  metadataBase: new URL("https://taraneh-v1.vercel.app/"),
  openGraph: {
    title: { default: "ترانه", template: "%s - ترانه" },
    description: "Digikala clone | کلون فروشگاه اینترنتی دیجیکالا",
    images: [
      {
        url: "/image/thumbnail.png",
      },
    ],
  },
  twitter: {
    title: { default: "ترانه", template: "%s - ترانه" },
    description: "Digikala clone | کلون فروشگاه اینترنتی دیجیکالا",
    card: "summary_large_image",
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
  return (
    <html lang="fa" dir="rtl">
      <body className="m-auto max-w-[1720px] flex-col items-center justify-center font-iranyekan">
        <SessionProvider>
          <Provider>
            <main className="">{children}</main>
            <Toaster />
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
