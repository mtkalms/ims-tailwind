import { IconMenu2, IconMeteor } from "@tabler/icons-react";
import ThemeModeToggle from "../ThemeModeToggle";
import NavbarMenu from "./NavbarMenu";
import NavbarMenuItem from "./NavbarMenuItem";
import Link from "next/link";
import { getIncidentPaths } from "@/static/paths";
import { useRouter } from "next/router";
import { StoreContext } from "@/contexts/StoreContext";
import React, { useContext } from "react";

export const getStaticPaths = async () => ({
  paths: getIncidentPaths(),
  fallback: false,
});
export const getStaticProps = async () => ({ props: {} });

interface NavbarProps {
  children?: React.ReactNode;
  onToggleSidebar?: () => void;
}

function Navbar({ children, onToggleSidebar }: NavbarProps) {
  const storeContext = useContext(StoreContext);
  const router = useRouter();
  const projectId = router.query.project as string;
  const project = storeContext?.store.getRow("projects", projectId);

  return (
    <div className="navbar flex flex-col border-b-1 border-slate-700">
      <div className="flex items-center justify-between p-4 pb-0">
        <div className="flex items-center gap-4">
          <button onClick={onToggleSidebar} className="navbar-toggle btn">
            <IconMenu2 className="icon-outline" />
          </button>
          <Link href="/" className="rounded-full bg-purple-600 p-1">
            <IconMeteor className="stroke-amber-400" />
          </Link>
          {project && (
            <Link href={`/${projectId}`} className="text-lg font-semibold">
              {project.name}
            </Link>
          )}
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
