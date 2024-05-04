import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from 'next/head';
const inter = Inter({ subsets: ["latin"] });
import 'react-toastify/dist/ReactToastify.css';
export const metadata: Metadata = {
  title: "Url Shortner",
  description: "Create short url",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
