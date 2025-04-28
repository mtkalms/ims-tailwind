import { StoreContext } from "@/contexts/StoreContext";
import { useRouter } from "next/router";
import { useContext } from "react";

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
