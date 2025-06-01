import type { Metadata } from "next";
import "../globals.css";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Abibas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setCookies = async (token: string) => {
    "use server";
    cookies().set({
      name: "access_token",
      value: `Bearer ${token}`,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  const token = cookies().get("access_token")?.value;

  return (
    <div lang="en">
      <Navbar setCookies={setCookies} token={token} />
      {children}
      <Footer />
    </div>
  );
}
