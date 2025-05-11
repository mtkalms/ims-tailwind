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
  project?: string;
  projectCount?: number;
  incidentCount?: number;
}

function ProjectNavMenu({ project, incidentCount }: ProjectMenuProps) {
  return (
    <Navbar.Menu>
      <Navbar.MenuItem
        label="Project"
        href={`/${project}`}
        icon={<IconTable className="icon-outline" />}
      />
      <Navbar.MenuItem
        label="Incidents"
        root
        href={`/${project}/incidents`}
        icon={<IconBolt className="icon-outline" />}
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
      <Navbar.MenuItem
        root
        label="Projects"
        href="/projects"
        icon={<IconTable className="icon-outline" />}
        count={projectCount}
      />
    </Navbar.Menu>
  );
}

function ProjectSidebarMenu({ project }: ProjectMenuProps) {
  return (
    <Sidebar.Menu>
      <Sidebar.MenuItem
        label="Project"
        href={`/${project}`}
        icon={<IconTable className="icon-outline" />}
      />
      <Sidebar.MenuItem
        label="Incidents"
        href={`/${project}/incidents`}
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
  const projectSlug = router.query.project as string;
  const project = storeContext?.get("projects", { slug: projectSlug });
  const projectCount = storeContext?.store.getRowCount("projects") || 0;
  const incidentCount =
    storeContext?.relationships?.getLocalRowIds("projectIncidents", project.id)
      .length || 0;

  return (
    <div>
      <Navbar onToggleSidebar={() => setShowSidebar((value) => !value)}>
        {projectSlug ? (
          <ProjectNavMenu project={projectSlug} incidentCount={incidentCount} />
        ) : (
          <NavMenu projectCount={projectCount} />
        )}
      </Navbar>
      <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)}>
        {projectSlug ? (
          <ProjectSidebarMenu project={projectSlug} />
        ) : (
          <SidebarMenu />
        )}
      </Sidebar>
      {showSidebar && (
        <div
          className="fixed inset-0 z-10 bg-slate-950/10 md:max-2xl:backdrop-blur-[2px]"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}
      <div className="mx-auto grid w-full max-w-7xl p-8">{children}</div>
    </div>
  );
}

export default Layout;
