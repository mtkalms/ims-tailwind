import { StoreContext } from "@/contexts/StoreContext";
import { useContext } from "react";
import Link from "next/link";
import { useTable } from "tinybase/ui-react";
import { IconTable } from "@tabler/icons-react";

function ProjectsPage() {
  const storeContext = useContext(StoreContext);
  return (
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
  );
}
export default ProjectsPage;
