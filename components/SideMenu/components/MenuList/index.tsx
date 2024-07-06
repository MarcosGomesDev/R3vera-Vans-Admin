"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { twMerge } from "tailwind-merge";
import menus from "../../menuOptions.json";
import { Icon } from "../Icon";

interface Menu {
  name: string;
  icon: string;
  route: string;
}

interface Menus {
  menus: Menu[];
}

const menuData: Menus = menus;

export function MenuList() {
  const activeMenu = usePathname();

  return (
    <div className="w-full space-y-4 pl-5">
      {menuData.menus.map((menu: Menu, i: number) => (
        <Button
          key={i}
          size="lg"
          className={twMerge([
            "flex w-full items-start justify-start font-bold text-gray-400",
            activeMenu === menu.route && "text-black",
          ])}
          asChild
          variant="ghost"
        >
          <Link href={menu.route} className="relative flex items-center gap-2">
            <Icon name={menu.icon as any} />
            {menu.name}
            {activeMenu === menu.route && (
              <div className="absolute right-0 h-full w-1 rounded-s-md bg-primary"></div>
            )}
          </Link>
        </Button>
      ))}
    </div>
  );
}
