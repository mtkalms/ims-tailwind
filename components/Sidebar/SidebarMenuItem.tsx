import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

interface SidebarMenuItemProps {
  label: string;
  href: Url;
  icon?: React.ReactNode;
}

function SidebarMenuItem({ label, href, icon }: SidebarMenuItemProps) {
  return (
    <li className="sidebar-menu-item">
      <Link href={href} className="menu-item flex items-center">
        {icon}
        <span className="ms-3 flex-1 whitespace-nowrap">{label}</span>
      </Link>
    </li>
  );
}

export default SidebarMenuItem;
