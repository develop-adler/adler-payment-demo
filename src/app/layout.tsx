import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";

import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",

});

export const metadata: Metadata = {
  title: "Adler Payment Demo",
  description: "A demo for Adler Payment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
