import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rivera Vans",
  description: "Rivera Vans Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={dmSans.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
