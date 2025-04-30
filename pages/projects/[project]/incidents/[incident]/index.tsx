import { StoreContext } from "@/contexts/StoreContext";
import { DEFAULT_PROJECTS } from "@/data/store";
import { useRouter } from "next/router";
import { useContext } from "react";

const NUM_STATIC_INCIDENTS = 50;

type Path = { params: { incident: string; project: string } };

export function getIncidentPaths(): Path[] {
  const paths: Path[] = [];
  Object.entries(DEFAULT_PROJECTS).forEach(([project]) => {
    Array.from(Array(NUM_STATIC_INCIDENTS).keys()).forEach((incident) => {
      paths.push({
        params: { incident: `${incident + 1}`, project: project },
      });
    });
  });
  return paths;
}

export const getStaticPaths = async () => ({
  paths: getIncidentPaths(),
  fallback: false,
});
export const getStaticProps = async () => ({ props: {} });

function Page() {
  const storeContext = useContext(StoreContext);
  const router = useRouter();
  const projectId = router.query.project as string;
  const incidentId = router.query.incident as string;
  const project = storeContext?.store.getRow("projects", projectId);
  const incident = storeContext?.store.getRow("incidents", incidentId);

  return (
    <div>
      <span>
        {project?.name}/Incidents/{incidentId}
      </span>
      <h1>{incident?.title}</h1>
      <p>{incident?.description}</p>
    </div>
  );
}

export default Page;
