"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import {
  NotePencilIcon,
  HouseIcon,
  CompassIcon,
  ShieldIcon,
  UserIcon,
  ChatsIcon,
  GearIcon,
  UsersIcon,
  ChartBarIcon,
  CaretDownIcon,
} from "@phosphor-icons/react";

const navItems = [
  { href: "/home", label: "Página inicial", icon: HouseIcon },
  { href: "/explore", label: "Explorar", icon: CompassIcon },
  { href: "/team", label: "Seu time", icon: ShieldIcon },
  { href: "/profile", label: "Perfil", icon: UserIcon },
  {
    href: "/communities",
    label: "Comunidades",
    icon: UsersIcon,
    notificationCount: "99+",
  },
  {
    href: "/messages",
    label: "Mensagens",
    icon: ChatsIcon,
    notificationCount: "7",
  },
  { href: "/popular", label: "Popular", icon: ChartBarIcon },
  { href: "/settings", label: "Configurações", icon: GearIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="relative w-70 h-full py-12">
      <Image src="/logo.png" alt="logo" width={148} height={42.75} />
      <button className="mt-14 flex gap-2 items-center bg-orange w-60 h-12 justify-center rounded-lg">
        <NotePencilIcon className="text-light" size={24} />
        <p className="font-bold text-light text-[18px] mr-3 cursor-pointer">
          Novo post
        </p>
      </button>

      <ul className="mt-10">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link href={item.href} key={item.label}>
              <li
                className={clsx(
                  "mb-2 px-2 py-2 flex items-center gap-3 text-light text-[18px] cursor-pointer relative rounded-lg transition-colors hover:bg-light/10",
                  {
                    "bg-light/5 font-semibold": isActive,

                    "font-medium": !isActive,

                    "justify-between": item.notificationCount,
                  }
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon size={24} />
                  {item.label}
                </div>

                {item.notificationCount && (
                  <span className="bg-light text-black rounded-full w-10 h-6 flex items-center justify-center text-sm mr-2">
                    {item.notificationCount}
                  </span>
                )}

                {isActive && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 h-10.5 w-1 bg-light rounded"></span>
                )}
              </li>
            </Link>
          );
        })}
      </ul>

      <div className="absolute bottom-6 justify-between items-end px-2 cursor-pointer group-hover:text-white transition-colors duration-200">
        <div className="flex items-center gap-4">
          <img
            src="https://i.pinimg.com/1200x/8b/83/a3/8b83a35e5f305f9d1b763e8e305d67c8.jpg"
            alt="User"
            className="rounded-lg size-10 object-cover"
          />
          <div className="flex flex-col">
            <span className="text-light text-[16px] font-bold truncate max-w-[120px]">
              Albana Swora
            </span>
            <span className="text-light text-[14px] font-normal opacity-70 truncate max-w-[120px]">
              @alswor
            </span>
          </div>
          <CaretDownIcon size={26} className="text-light ml-4 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
