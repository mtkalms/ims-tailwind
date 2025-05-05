import { StoreContext } from "@/contexts/StoreContext";
import { getProjectPaths } from "@/static/paths";
import { IconBoltFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

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
    <ul className="relative overflow-x-auto rounded-lg text-sm border border-slate-600 flex flex-col">
      {incidents?.map((row) => (
        <li className=" p-3 [&:not(:last-child)]:border-b border-slate-600 hover:bg-slate-800" key={row.id}>
          <Link href={`/${projectId}/incidents/${row.id}`}>
            <div className="flex gap-2">
              <IconBoltFilled
                className={`w-5 ${
                  row.incident.status === "closed"
                    ? "fill-emerald-500"
                    : "fill-red-500"
                }`}
              />
              <div className="flex flex-col">
                <span className="font-bold">{row.incident.title}</span>
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <span>#{row.id}</span>
                  <span>{row.incident.description}</span>
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default IncidentsPage;
