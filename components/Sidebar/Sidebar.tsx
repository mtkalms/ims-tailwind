import SidebarMenu from "./SidebarMenu";
import SidebarMenuItem from "./SidebarMenuItem";

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
      <div className="h-10">
        <span className="text-lg font-semibold">
          Sidebar
        </span>
        <button type="button" onClick={onClose} className="button absolute border-0 top-2.5 end-2.5 inline-flex items-center" >
          <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
      </div>
      {children}
    </div>
  );
}

Sidebar.Menu = SidebarMenu;
Sidebar.MenuItem = SidebarMenuItem;

export default Sidebar;
