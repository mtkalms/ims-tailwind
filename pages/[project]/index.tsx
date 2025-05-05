import { StoreContext } from "@/contexts/StoreContext";
import { getProjectPaths } from "@/static/paths";
import { useRouter } from "next/router";
import { useContext } from "react";

export const getStaticPaths = async () => ({
  paths: getProjectPaths(),
  fallback: false,
});
export const getStaticProps = async () => ({ props: {} });

function Project() {
  const storeContext = useContext(StoreContext);
  const router = useRouter();
  const projectId = router.query.project as string;

  const project =
    projectId && storeContext
      ? storeContext?.store.getRow("projects", projectId)
      : {
          name: "Mew",
          description: "Unknown",
        };

  return (
    <div className="relative overflow-x-auto flex flex-col gap-4">
      <div className="flex items-center gap-2 justify-between border-b border-slate-600 pb-4">
        <h1 className="flex gap-2 text-2xl">
          {project?.name}
        </h1>
        <span className="font-bold">{project?.status}</span>
      </div>
      <div className="text-sm ">
        <span className="font-bold">Description:</span> {project?.description}
      </div>
    </div>
  );
}

export default Project;
