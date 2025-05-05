import { StoreContext } from "@/contexts/StoreContext";
import { DEFAULT_PROJECTS } from "@/data/store";
import { useRouter } from "next/router";
import { useContext } from "react";

export function getProjectPaths() {
  return Object.entries(DEFAULT_PROJECTS).map(([project]) => ({
    params: { project },
  }));
}

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
    <div>
      {projectId}
      <span>{project.name}</span>
      <h1>{project.Name}</h1>
      <p>{project.description}</p>
    </div>
  );
}

export default Project;
