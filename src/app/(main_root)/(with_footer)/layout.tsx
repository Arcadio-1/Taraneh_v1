import Footer from "@/components/Util/layouts/footer/Footer";
import Header from "@/components/Util/layouts/header/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <section>{children}</section>
      <Footer />
    </>
  );
}
