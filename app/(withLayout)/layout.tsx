import { SideMenu } from "@/components/SideMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SideMenu>{children}</SideMenu>
    </div>
  );
}
