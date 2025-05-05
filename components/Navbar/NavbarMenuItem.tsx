import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface NavbarMenuItemProps {
  label: string;
  href: Url;
  icon?: React.ReactNode;
}

function NavbarMenuItem({ label, href, icon }: NavbarMenuItemProps) {
  const router = useRouter();
  const active = router.asPath === href;

  return (
    <li className="navbar-menu-item list-none inline-block">
      <div className={active ? "border-b-2 border-b-purple-400 pb-1" : "pb-1.5"}>
        <Link href={href} className="menu-item flex items-center px-3 gap-1">
          {icon}
          <span>{label}</span>
        </Link>
      </div>
    </li>
  );
}

export default NavbarMenuItem;
export type { NavbarMenuItemProps };
