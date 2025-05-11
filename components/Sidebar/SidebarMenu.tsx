interface SidebarMenuProps {
  title?: string;
  children?: React.ReactNode;
}

function SidebarMenu({ title, children }: SidebarMenuProps) {
  return (
    <div className="sidebar-menu overflow-y-auto py-4">
      {title && <span className="text-lg font-semibold">{title}</span>}
      <ul className="space-y-2 font-medium">{children}</ul>
    </div>
  );
}

export default SidebarMenu;
