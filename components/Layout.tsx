import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar";
import { IconHome, IconTable } from "@tabler/icons-react";

function Layout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <div>
      <Navbar onToggleSidebar={() => setShowSidebar(value => !value)}>
        <Navbar.Menu>
          <Navbar.MenuItem
            label="Home"
            href="/"
            icon={<IconHome className="icon-outline"/>}
          />
          <Navbar.MenuItem
            label="Projects"
            href="/projects"
            icon={<IconTable className="icon-outline"/>}
          />
        </Navbar.Menu>
      </Navbar>
      <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)}>
        <Sidebar.Menu>
          <Sidebar.MenuItem
            label="Home"
            href="/"
            icon={<IconHome className="icon-outline"/>}
          />
          <Sidebar.MenuItem
            label="Projects"
            href="/projects"
            icon={<IconTable className="icon-outline"/>}
          />
        </Sidebar.Menu>
      </Sidebar>
      <div className="mx-auto grid w-full max-w-7xl p-8">
        {children}
      </div>
    </div>
  );
}

export default Layout;
