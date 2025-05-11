import { StoreContext } from "@/contexts/StoreContext";
import { getProjectPaths, isStaticBuild } from "@/static/paths";
import { useRouter } from "next/router";
import { useContext } from "react";

export const getStaticPaths = isStaticBuild()
  ? async () => ({
      paths: getProjectPaths(),
      fallback: false,
    })
  : undefined;
export const getStaticProps = isStaticBuild()
  ? async () => ({ props: {} })
  : undefined;

function Project() {
  const storeContext = useContext(StoreContext);
  const router = useRouter();
  const projectSlug = router.query.project as string;
  const project = storeContext?.get("projects", { slug: projectSlug });

  return (
    <div className="relative flex flex-col gap-4 overflow-x-auto">
      <div className="flex items-center justify-between gap-2 border-b border-slate-600 pb-4">
        <h1 className="flex gap-2 text-2xl">{project?.name}</h1>
        <span className="font-bold">{project?.status}</span>
      </div>
      <div className="text-sm">
        <span className="font-bold">Description:</span> {project?.description}
      </div>
    </div>
  );
}

export default Project;
