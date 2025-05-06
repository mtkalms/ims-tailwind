import { StoreContext } from "@/contexts/StoreContext";
import { useContext } from "react";
import Link from "next/link";
import { useTable } from "tinybase/ui-react";
import { IconLock, IconPlus, IconTable } from "@tabler/icons-react";
import { isStaticBuild } from "@/static/paths";

export const getStaticProps = (async () => {
  return { props: { isStatic: isStaticBuild() } }
})

function ProjectsPage({ isStatic = false }: { isStatic: boolean }) {
  const storeContext = useContext(StoreContext);
  return (
    <div>
      <div className="flex items-center gap-2 justify-between pb-4">
        <div></div>
        <Link 
          type="button" 
          className={`button pr-2 py-1.5 flex items-center gap-2 ${isStatic ? "" : "text-white font-semibold bg-green-600 hover:bg-green-500"}`}
          title={isStatic ? "Not available in static build" : "Create new project"}
          href={isStatic ? "#" : "/projects/new"}
        >
          {isStatic ? <IconLock/> : <IconPlus/>}
          New Project
        </Link>
      </div>
      <ul className="relative overflow-x-auto rounded-lg text-sm border border-slate-600 flex flex-col">
        {Object.entries(useTable("projects", storeContext?.store)).map(([id, project]) => (
          <li className=" p-3 [&:not(:last-child)]:border-b border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800" key={id}>
            <Link href={`/${project.slug}`}>
              <div className="flex gap-3">
                <IconTable className="stroke-slate-400 w-5"/>
                <div className="flex flex-col">
                  <span className="font-bold">{project.name}</span>
                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <span>{project.description}</span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ProjectsPage;
