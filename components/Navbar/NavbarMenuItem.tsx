import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface NavbarMenuItemProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

function NavbarMenuItem({ label, href, icon }: NavbarMenuItemProps) {
  const router = useRouter();
  const active = router.pathname === href;

  return (
    <li className="navbar-menu-item list-none inline-block">
      <div className={active ? "border-b-2 border-b-purple-400 pb-1" : "pb-1"}>
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
