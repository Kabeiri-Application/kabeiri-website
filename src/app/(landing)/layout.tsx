import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {/* pt-14 is to account for the header height */}
      <main className="pt-14">{children}</main>
      <Footer />
    </>
  );
}
