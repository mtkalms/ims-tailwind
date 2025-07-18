import { StoreContext } from "@/contexts/StoreContext";
import { useContext } from "react";
import Link from "next/link";
import { useTable } from "tinybase/ui-react";
import { IconLock, IconPlus, IconTable } from "@tabler/icons-react";
import { isStaticBuild } from "@/static/paths";
import List from "@/components/List";

export const getStaticProps = async () => {
  return { props: { isStatic: isStaticBuild() } };
};

function ProjectsPage({ isStatic = false }: { isStatic: boolean }) {
  const storeContext = useContext(StoreContext);
  const projects = useTable("projects", storeContext?.store);
  return (
    <div>
      <div className="flex items-center justify-end gap-2 pb-4">
        <Link href={isStatic ? "#" : "/projects/new"}>
          <button
            type="button"
            className={`${isStatic ? "btn" : "btn-add"} flex items-center`}
            title={
              isStatic ? "Not available in static build" : "Create new project"
            }
          >
            {isStatic ? <IconLock /> : <IconPlus />}
            <span>New Project</span>
          </button>
        </Link>
      </div>
      {Object.entries(useTable("projects", storeContext?.store)).length ? (
        <List className="relative flex flex-col">
          {Object.entries(projects).map(([id, project]) => (
            <List.Item key={id}>
              <Link href={`/${project.slug}`}>
                <div className="flex gap-3">
                  <IconTable className="w-5 stroke-slate-400" />
                  <div className="flex flex-col">
                    <span className="font-bold">{project.name}</span>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{project.description}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </List.Item>
          ))}
        </List>
      ) : (
        <div className="text-center text-slate-500">
          No projects found. Create a new project to get started.
        </div>
      )}
    </div>
  );
}
export default ProjectsPage;
