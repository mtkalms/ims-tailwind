interface SidebarMenuProps {
  title?: string;
  children?: React.ReactNode;
}

function SidebarMenu({ title, children }: SidebarMenuProps) {
  return (
    <div className="sidebar-menu py-4 overflow-y-auto">
      {title && <span className="text-lg font-semibold">{title}</span>}
      <ul className="space-y-2 font-medium">{children}</ul>
    </div>
  );
}

export default SidebarMenu;
