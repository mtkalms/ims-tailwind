import { StoreContext } from "@/contexts/StoreContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import { getProjectPaths } from "..";

export const getStaticPaths = async () => ({
  paths: getProjectPaths(),
  fallback: false,
});
export const getStaticProps = async () => ({ props: {} });

function IncidentsPage() {
  const storeContext = useContext(StoreContext);
  const router = useRouter();
  const projectId = router.query.project as string;
  const incidents = storeContext?.relationships
    ?.getLocalRowIds("projectIncidents", projectId)
    .map((id) => ({
      id: id,
      incident: storeContext?.store.getRow("incidents", id),
    }));

  return (
    <div>
      <h1>Incidents</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {incidents?.map((row) => (
            <tr key={row.id}>
              <th>{row.id}</th>
              <td>{row.incident.title}</td>
              <td>{row.incident.description}</td>
              <td>{row.incident.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IncidentsPage;
