import List from "@/components/List";
import { StoreContext } from "@/contexts/StoreContext";
import { getProjectPaths, isStaticBuild } from "@/static/paths";
import { IconBoltFilled, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
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

function IncidentsPage() {
  const storeContext = useContext(StoreContext);
  const router = useRouter();
  const projectSlug = router.query.project as string;
  const project = storeContext?.get("projects", { slug: projectSlug });
  const incidents = storeContext?.relationships
    ?.getLocalRowIds("projectIncidents", project.id)
    .map((id) => ({
      id: id,
      incident: storeContext?.store.getRow("incidents", id),
    }));

  return (
    <>
      <div className="flex items-center justify-end gap-2 pb-4">
        <Link href={`/${project.slug}/incidents/new`}>
          <button
            type="button"
            className={`btn-add flex items-center`}
            title="Report a new incident"
          >
            <IconPlus />
            <span>New Incident</span>
          </button>
        </Link>
      </div>
      {incidents?.length ? (
        <List striped className="relative flex flex-col">
          {incidents?.map((row) => (
            <List.Item key={row.id}>
              <Link href={`/${project.slug}/incidents/${row.id}`}>
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
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>#{row.id}</span>
                      <span>{row.incident.description}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </List.Item>
          ))}
        </List>
      ) : (
        <div className="text-center text-slate-500">
          No incidents found for this project.
        </div>
      )}
    </>
  );
}

export default IncidentsPage;
