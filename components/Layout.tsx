import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar";
import { IconBolt, IconHome, IconTable } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { Url } from "next/dist/shared/lib/router/router";
import { getIncidentPaths } from "@/static/paths";

interface NavbarProps {
  children?: React.ReactNode;
  onToggleSidebar?: () => void;
}

export const getStaticPaths = async () => ({
  paths: getIncidentPaths(),
  fallback: false,
});
export const getStaticProps = async () => ({ props: {} });

interface ProjectNavMenuProps {
  project: string;
}

function ProjectNavMenu({ project }: ProjectNavMenuProps) {
  return <Navbar.Menu>
    <Navbar.MenuItem
      label="Project"
      href={`/${project}`}
      icon={<IconTable className="icon-outline"/>}
    />
    <Navbar.MenuItem
      label="Incidents"
      href={`/${project}/incidents`}
      icon={<IconBolt className="icon-outline"/>}
    />
  </Navbar.Menu>
}

function NavMenu() {
  return <Navbar.Menu>
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
}

function Layout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = React.useState(false);

  const router = useRouter();
  const project = router.query.project as string;

  return (
    <div>
      <Navbar onToggleSidebar={() => setShowSidebar(value => !value)}>
        {project ? <ProjectNavMenu project={project} /> : <NavMenu />}
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
