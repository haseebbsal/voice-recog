import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/layout/sideBar";
import NextUiProvider from "@/providers/NextUiProvider";
import QueryProvider from "@/providers/QueryProvier";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "plotXY2Z",
  description: " App For Task Categorization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900  text-white `}>
        <NextUiProvider>
          <QueryProvider>
            <div className="flex flex-col min-h-[100vh]">
              <SideBar />
              <div className="w-full ">
                {children}
              </div>
            </div>
          </QueryProvider>
        </NextUiProvider>
      </body>
    </html>
  );
}
