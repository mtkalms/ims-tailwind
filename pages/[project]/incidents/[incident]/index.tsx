import { StoreContext } from "@/contexts/StoreContext";
import { getIncidentPaths } from "@/static/paths";
import { IconBoltFilled } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useContext } from "react";

export const getStaticPaths = async () => ({
  paths: getIncidentPaths(),
  fallback: false,
});
export const getStaticProps = async () => ({ props: {} });

function Page() {
  const storeContext = useContext(StoreContext);
  const router = useRouter();
  const incidentId = router.query.incident as string;
  const incident = storeContext?.store.getRow("incidents", incidentId);

  return (
    <div className="relative overflow-x-auto flex flex-col gap-4">
      <div className="flex items-center gap-2 justify-between border-b border-slate-600 pb-4">
        <h1 className="flex gap-2 text-2xl">
          <span>
          {incident?.title}
          </span>
          <span className="text-slate-500">
            #{incidentId}
          </span>
        </h1>
        <div
          className={`rounded-full flex gap-2 pl-2 pr-4 py-1 ${
            incident?.status === "closed"
              ? "bg-emerald-500"
              : "bg-red-500"
          }`}
        >
          <IconBoltFilled className="w-5" />
          <span className="font-bold">{incident?.status}</span>
        </div>
      </div>
      <div className="text-sm ">
        <span className="font-bold">Description:</span> {incident?.description}
      </div>
    </div>
  );
}

export default Page;