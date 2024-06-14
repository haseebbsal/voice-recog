import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/layout/sideBar";
import NextUiProvider from "@/providers/NextUiProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Voice Recognition",
  description: " App For Voice Recognition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white `}>
        <NextUiProvider>
          <div className="flex flex-col h-[100vh]">
            <SideBar />
            <div className="w-full h-[80%]">
              {children}
            </div>
          </div>
        </NextUiProvider>
      </body>
    </html>
  );
}
