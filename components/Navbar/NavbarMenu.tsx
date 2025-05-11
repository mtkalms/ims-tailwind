interface NavbarMenuProps {
  children?: React.ReactNode;
}

function NavbarMenu({ children }: NavbarMenuProps) {
  return (
    <div className="navbar-menu pt-2">
      <ul className="flex flex-row items-center justify-between gap-2 px-2">
        {children}
      </ul>
    </div>
  );
}

export default NavbarMenu;
export type { NavbarMenuProps };
