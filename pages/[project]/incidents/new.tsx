import Form from "@/components/Form";
import { StoreContext } from "@/contexts/StoreContext";
import { getProjectPaths, isStaticBuild } from "@/static/paths";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

export const getStaticPaths = isStaticBuild()
  ? async () => ({
      paths: getProjectPaths(),
      fallback: false,
    })
  : undefined;
export const getStaticProps = isStaticBuild()
  ? async () => ({ props: {} })
  : undefined;

function NewIncidentPage() {
  const router = useRouter();
  const projectSlug = router.query.project as string;
  const storeContext = useContext(StoreContext);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  function adddIncident(): boolean {
    if (!name) return false;
    const project = storeContext?.get("projects", { slug: projectSlug });
    storeContext?.post("incidents", {
      title: name,
      description: description || "",
      project: +project.id,
      status: "open",
    });
    return true;
  }

  function handleSubmit() {
    if (adddIncident()) router.push(`/${projectSlug}/incidents`);
    else setError(true);
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Report a new Incident</h1>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <Form.Field label="Title" required>
          <input
            required
            type="text"
            id="title"
            name="title"
            className="input"
            placeholder="Incident title"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Field>
        <Form.Field label="Description">
          <textarea
            rows={8}
            id="description"
            name="description"
            className="input"
            placeholder="Incident description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Field>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="btn"
            onClick={() => router.push(`/${projectSlug}/incidents`)}
          >
            <span>Cancel</span>
          </button>
          <button type="submit" className="btn-add">
            <span>Create</span>
          </button>
        </div>
      </Form>
    </div>
  );
}

export default NewIncidentPage;
