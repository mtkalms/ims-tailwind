import { StoreContext } from "@/contexts/StoreContext";
import { getIncidentPaths, isStaticBuild } from "@/static/paths";
import { IconBoltFilled } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useContext } from "react";

export const getStaticPaths = isStaticBuild()
  ? async () => ({
      paths: getIncidentPaths(),
      fallback: false,
    })
  : undefined;
export const getStaticProps = isStaticBuild()
  ? async () => ({ props: {} })
  : undefined;

function Page() {
  const storeContext = useContext(StoreContext);
  const router = useRouter();
  const incidentId = router.query.incident as string;
  const incident = storeContext?.get("incidents", { id: incidentId });

  return (
    <div className="relative flex flex-col gap-4 overflow-x-auto">
      <div className="flex items-center justify-between gap-2 border-b border-slate-600 pb-4">
        <h1 className="flex gap-2 text-2xl">
          <span>{incident?.title}</span>
          <span className="text-slate-500">#{incidentId}</span>
        </h1>
        <div
          className={`flex gap-2 rounded-full py-1 pr-4 pl-2 ${
            incident?.status === "closed" ? "bg-emerald-500" : "bg-red-500"
          }`}
        >
          <IconBoltFilled className="w-5" />
          <span className="font-bold">{incident?.status}</span>
        </div>
      </div>
      <div className="text-sm">
        <span className="font-bold">Description:</span> {incident?.description}
      </div>
    </div>
  );
}

export default Page;
