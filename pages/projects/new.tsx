import { StoreContext } from "@/contexts/StoreContext";
import {
  IconAlertTriangleFilled,
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import {  useContext, useState } from "react";
import { Table } from "tinybase";

function NewProjectPage() {
  const storeContext = useContext(StoreContext);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();
  const nameValid = !Object.entries(storeContext?.get("projects") as Table)
    .map(([, row]) => row.slug)
    .includes(slug(name));

  function slug(name: string) {
    return name.toLowerCase().replaceAll(" ", "-");
  }

  function addProject(): boolean {
    if (!name || !nameValid) return false;
    storeContext?.post("projects", {
      slug: slug(name),
      name: name,
      description: description || "",
    });
    return true;
  }

  function handleSubmit() {
    if (addProject()) router.push("/projects");
    else setError(true);
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Create a new project</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-semibold">
            Project Name
          </label>
          <input
            required
            type="text"
            id="name"
            name="name"
            className={`input ${error && !name ? "border-red-500" : ""}`}
            value={name}
            onChange={(event) =>
              setName(event.target.value.replace(/\W /g, ""))
            }
          />
          {error && !name && (
            <span className="text-red-500 px-2 flex items-center gap-2 text-xs font-bold">
              <IconAlertTriangleFilled className="w-3.5" />
              <span>New project name must not be blank</span>
            </span>
          )}
          {!nameValid && (
            <span className="text-red-500 px-2 flex items-center gap-2 text-xs font-bold">
              <IconAlertTriangleFilled className="w-3.5" />
              <span>Project identifier {slug(name)} already in use</span>
            </span>
          )}
          {name && nameValid && (
            <span className="text-green-500 px-2 flex items-center gap-2 text-xs font-bold">
              <IconCircleCheckFilled className="w-3.5" />
              <span>
                Your new porject will be created with the identifier{" "}
                {slug(name)}
              </span>
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-semibold">
            Description
          </label>
          <textarea
            rows={8}
            id="description"
            name="description"
            className="input"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 justify-end">
          <button
            type="button"
            className="btn"
            onClick={() => router.push("/projects")}
          >
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            className="btn-add"
          >
            <span>Create</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewProjectPage;
