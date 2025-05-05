import { StoreContext } from "@/contexts/StoreContext";
import { useContext } from "react";
import Link from "next/link";
import { useTable } from "tinybase/ui-react";

function ProjectsPage() {
  const storeContext = useContext(StoreContext);
  return (
    <div>
      <h1>Projects</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(useTable("projects", storeContext?.store)).map(
            ([id, project]) => (
              <tr key={id}>
                <td><Link href={`/${id}`}>{project.name}</Link></td>
                <td>{project.description}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
export default ProjectsPage;
