import { IconMeteor, IconX } from "@tabler/icons-react";
import SidebarMenu from "./SidebarMenu";
import SidebarMenuItem from "./SidebarMenuItem";
import Link from "next/link";

interface SidebarProps {
  children?: React.ReactNode;
  show?: boolean;
  onClose?: () => void;
}

function Sidebar({ children, show, onClose }: SidebarProps) {
  return (
    <div
      className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${
        show ? "-translate-none" : "-translate-x-full"
      } bg-background rounded-r-xl border-r-1 border-slate-600`}
      tabIndex={-1}
    >
      <div className="flex items-center pb-6">
        <Link href="/" className="rounded-full bg-purple-600 p-1">
          <IconMeteor className="stroke-amber-400" />
        </Link>
        <button type="button" onClick={onClose} className="button absolute border-0 top-2.5 end-2.5 inline-flex items-center" >
          <IconX className="icon-outline" />
          <span className="sr-only">Close Menu</span>
        </button>
      </div>
      {children}
    </div>
  );
}

Sidebar.Menu = SidebarMenu;
Sidebar.MenuItem = SidebarMenuItem;

export default Sidebar;
