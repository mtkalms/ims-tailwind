import { IconMenu2, IconMeteor } from "@tabler/icons-react";
import ThemeModeToggle from "../ThemeModeToggle";
import NavbarMenu from "./NavbarMenu";
import NavbarMenuItem from "./NavbarMenuItem";
import Link from "next/link";

interface NavbarProps {
  children?: React.ReactNode;
  onToggleSidebar?: () => void;
}

function Navbar({ children, onToggleSidebar }: NavbarProps) {
  return (
    <div className="navbar border-b-1 border-slate-700 flex flex-col">
      <div className="flex items-center justify-between p-4 pb-0">
        <div className="flex items-center gap-4">
          <button onClick={onToggleSidebar} className="navbar-toggle button">
            <IconMenu2 className="icon-outline" />
          </button>
          <div className="rounded-full bg-purple-600 p-1">
            <Link href="/">
              <IconMeteor className="stroke-amber-400" />
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <ThemeModeToggle />
        </div>
      </div>
      <nav className="flex items-center pt-2 pb-0">{children}</nav>
    </div>
  );
}

Navbar.Menu = NavbarMenu;
Navbar.MenuItem = NavbarMenuItem;

export default Navbar;
export type { NavbarProps };
