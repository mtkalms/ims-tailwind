import Form from "@/components/Form";
import { StoreContext } from "@/contexts/StoreContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
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
      <h1 className="text-xl font-bold">Create a new Project</h1>
      <Form
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <Form.Field label="Project Name" required>
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
            <Form.Field.Message type="error">
              Project name is required
            </Form.Field.Message>
          )}
          {!nameValid && (
            <Form.Field.Message type="error">
              Project identifier {slug(name)} already in use
            </Form.Field.Message>
          )}
          {name && nameValid && (
            <Form.Field.Message type="success">
              Your new porject will be created with the identifier {slug(name)}
            </Form.Field.Message>
          )}
        </Form.Field>
        <Form.Field label="Description">
          <textarea
            rows={8}
            id="description"
            name="description"
            className="input"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Field>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="btn"
            onClick={() => router.push("/projects")}
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

export default NewProjectPage;
