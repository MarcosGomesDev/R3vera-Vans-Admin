import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { MenuList } from "./components/MenuList";
import { User } from "./components/User";

export function SideMenu({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex">
        <nav className="hidden w-[85px] overflow-x-hidden pb-16 pt-5 md:flex md:flex-col xl:w-[230px]">
          <Link
            href="/"
            className="intro-x flex items-center self-center pt-8 text-center drop-shadow-md"
          >
            <Image
              src="/menu-logo.svg"
              width={80}
              height={80}
              alt="logo"
              className="self-center text-center"
              priority
            />
          </Link>

          <Separator className="my-6" />

          <MenuList />
        </nav>
        <div className="md:max-w-auto min-h-screen min-w-0 max-w-full flex-1 bg-[#F4F7FE] px-4 pb-10 pt-10 before:block before:h-px before:w-full before:content-[''] dark:bg-slate-700 md:px-[22px]">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-2xl font-semibold">Dashboard</p>
            <User />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
