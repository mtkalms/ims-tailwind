import { DEFAULT_PROJECTS } from "@/data/store";

const NUM_STATIC_INCIDENTS = 50;
type Path = { params: { incident: string; project: string } };

export function getProjectPaths() {
  return Object.entries(DEFAULT_PROJECTS).map(([project]) => ({
    params: { project },
  }));
}

export function getIncidentPaths(): Path[] {
  const paths: Path[] = [];
  Object.entries(DEFAULT_PROJECTS).forEach(([project]) => {
    Array.from(Array(NUM_STATIC_INCIDENTS).keys()).forEach((incident) => {
      paths.push({
        params: { incident: `${incident + 1}`, project: project },
      });
    });
  });
  return paths;
}