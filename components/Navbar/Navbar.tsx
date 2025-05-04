import ThemeModeToggle from "../ThemeModeToggle";
import NavbarMenu from "./NavbarMenu";
import NavbarMenuItem from "./NavbarMenuItem";

interface NavbarProps {
  children?: React.ReactNode;
  onToggleSidebar?: () => void;
}

function Navbar({ children, onToggleSidebar }: NavbarProps) {

  return (
    <div className="navbar border-b-1 border-slate-700 flex flex-col">
      <div className="flex items-center justify-between p-4 pb-0">
        <div className="flex items-center">
          <button onClick={onToggleSidebar} className="navbar-toggle button">
            <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="icon-solid h-4 w-4">
              <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"></path>
            </svg>
          </button>
        </div>
        <div className="flex items-center">
          <ThemeModeToggle/>
        </div>
      </div>
      <nav className="flex items-center pt-2 pb-0">
        {children}
      </nav>
    </div>
  );
}

Navbar.Menu = NavbarMenu;
Navbar.MenuItem = NavbarMenuItem;

export default Navbar;
export type { NavbarProps };

