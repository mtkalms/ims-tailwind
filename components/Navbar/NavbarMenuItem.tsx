import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface NavbarMenuItemProps {
  label: string;
  href: Url;
  icon?: React.ReactNode;
  root?: boolean;
  count?: number;
}

function NavbarMenuItem({
  label,
  href,
  icon,
  root,
  count,
}: NavbarMenuItemProps) {
  const router = useRouter();
  const active = root
    ? router.asPath.startsWith(href.toString())
    : router.asPath === href;

  return (
    <li className="navbar-menu-item list-none inline-block">
      <div
        className={active ? "border-b-2 border-b-purple-400 pb-1" : "pb-1.5"}
      >
        <Link href={href} className="menu-item flex items-center px-3 gap-2">
          {icon}
          <span>{label}</span>
          {count && (
            <span className="rounded-full bg-slate-800 w-5 h-5 text-xs py-0.5 px-1.5 font-bold">
              {count}
            </span>
          )}
        </Link>
      </div>
    </li>
  );
}

export default NavbarMenuItem;
export type { NavbarMenuItemProps };
