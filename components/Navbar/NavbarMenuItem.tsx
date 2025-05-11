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
  count = 0,
}: NavbarMenuItemProps) {
  const router = useRouter();
  const active = root
    ? router.asPath.startsWith(href.toString())
    : router.asPath === href;

  return (
    <li className="navbar-menu-item inline-block list-none">
      <div
        className={active ? "border-b-2 border-b-purple-400 pb-1" : "pb-1.5"}
      >
        <Link href={href} className="menu-item flex items-center gap-2 px-3">
          {icon}
          <span>{label}</span>
          {count > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-xs font-bold dark:bg-slate-700">
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
