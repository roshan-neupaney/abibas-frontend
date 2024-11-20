import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../../components/themeProvider";
import Navbar from "../../components/Navbar/navbar";
import localFont from "next/font/local";
import Footer from "../../components/Footer/footer";
import { Toaster } from "react-hot-toast";

const AdihausDIN = localFont({
  src: [
    {
      path: "./font/adihausdin_500.otf",
      weight: '400'
    },
    {
      path: "./font/adihausdin_700.otf",
      weight: '700'
    },
  ],
  variable: "--font-adihaus",
});
const AdineuePRO = localFont({
  src: [
    {
      path: "./font/adineue PRO.ttf",
    },
    {
      path: "./font/adineue PRO KZ Bold_0.ttf",
    },
  ],
  display: "swap",
  variable: "--font-adineue",
});

export const metadata: Metadata = {
  title: "Abibas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${AdihausDIN.variable} ${AdineuePRO.variable} antialiased m-0 p-0 relative box-border h-screen overflow-visible`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
