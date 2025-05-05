import React, { useContext } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar";
import { IconBolt, IconHome, IconTable } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { getIncidentPaths } from "@/static/paths";
import { StoreContext } from "@/contexts/StoreContext";

export const getStaticPaths = async () => ({
  paths: getIncidentPaths(),
  fallback: false,
});
export const getStaticProps = async () => ({ props: {} });

interface ProjectMenuProps {
  projectId?: string;
  projectCount?: number;
  incidentCount?: number;
}

function ProjectNavMenu({ projectId, incidentCount }: ProjectMenuProps) {
  return (
    <Navbar.Menu>
      <Navbar.MenuItem
        label="Project"
        href={`/${projectId}`}
        icon={<IconTable className="icon-outline"/>}
      />
      <Navbar.MenuItem
        label="Incidents" root
        href={`/${projectId}/incidents`}
        icon={<IconBolt className="icon-outline"/>}
        count={incidentCount}
      />
    </Navbar.Menu>
  );
}

function NavMenu({ projectCount }: ProjectMenuProps) {
  return (
    <Navbar.Menu>
      <Navbar.MenuItem
        label="Home"
        href="/"
        icon={<IconHome className="icon-outline" />}
      />
      <Navbar.MenuItem root
        label="Projects"
        href="/projects"
        icon={<IconTable className="icon-outline" />}
        count={projectCount}
      />
    </Navbar.Menu>
  );
}

function ProjectSidebarMenu({ projectId }: ProjectMenuProps) {
  return (
    <Sidebar.Menu>
      <Sidebar.MenuItem
        label="Project"
        href={`/${projectId}`}
        icon={<IconTable className="icon-outline" />}
      />
      <Sidebar.MenuItem
        label="Incidents"
        href={`/${projectId}/incidents`}
        icon={<IconBolt className="icon-outline" />}
      />
    </Sidebar.Menu>
  );
}

function SidebarMenu() {
  return (
    <Sidebar.Menu>
      <Sidebar.MenuItem
        label="Home"
        href="/"
        icon={<IconHome className="icon-outline" />}
      />
      <Sidebar.MenuItem
        label="Projects"
        href="/projects"
        icon={<IconTable className="icon-outline" />}
      />
    </Sidebar.Menu>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const storeContext = useContext(StoreContext);
  const router = useRouter();
  const projectId = router.query.project as string;
  const projectCount = storeContext?.store.getRowCount("projects") || 0;
  const incidentCount = storeContext?.relationships?.getLocalRowIds("projectIncidents", projectId).length || 0;

  return (
    <div>
      <Navbar onToggleSidebar={() => setShowSidebar((value) => !value)}>
        {projectId ? <ProjectNavMenu projectId={projectId} incidentCount={incidentCount}/> : <NavMenu projectCount={projectCount}/>}
      </Navbar>
      <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)}>
        {projectId ? <ProjectSidebarMenu projectId={projectId} /> : <SidebarMenu />}
      </Sidebar>
      <div className="mx-auto grid w-full max-w-7xl p-8">{children}</div>
    </div>
  );
}

export default Layout;
