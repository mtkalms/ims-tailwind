import { RelationshipDefinitions } from "@/contexts/StoreContext"
import { Tables, TablesSchema, Values, ValuesSchema } from "tinybase/store"

export const DEFAULT_USERS = {
    1: {name: "John Doe", email: "john.doe@example.ca"},
    2: {name: "Jane Doe", email: "jane.doe@example.ca"},
}

export const DEFAULT_PROJECTS = {
    0: {name: "Project A", description: "Description of project A", slug: "project-a"},
    1: {name: "Project B", description: "Description of project B", slug: "project-b"},
}

export const DEFAULT_INCIDENTS = {
    1: {title: "Forgot keys at home", description: "I forgot my keys at home" ,status: "open", project: 0},
    2: {title: "Lost wallet", description: "I lost my wallet" ,status: "closed", project: 1},
    3: {title: "Car accident", description: "I had a car accident" ,status: "open", project: 0},
    4: {title: "Stolen bike", description: "My bike was stolen" ,status: "open", project: 1},
    5: {title: "Flat tire", description: "I have a flat tire" ,status: "closed", project: 0},
    6: {title: "Broken window", description: "I have a broken window" ,status: "open", project: 1},
    7: {title: "Power outage", description: "I have a power outage" ,status: "open", project: 0},
    8: {title: "Water leak", description: "I have a water leak" ,status: "open", project: 1},
    9: {title: "Internet outage", description: "I have an internet outage" ,status: "open", project: 0},  
}

export const DEFAULT_TABLES: Tables = {
    users: DEFAULT_USERS,
    projects: DEFAULT_PROJECTS,
    incidents: DEFAULT_INCIDENTS,
}

export const DEFAULT_VALUES: Values = {
    sidebar: false,
}

export const TABLES_SCHEMA: TablesSchema = {
    users: {
        name: {type: "string"},
        email: {type: "string"},
    },
    projects: {
        name: {type: "string"},
        description: {type: "string"},
        slug: {type: "string"},
    },
    incidents: {
        title: {type: "string"},
        description: {type: "string"},
        status: {type: "string"},
        project: {type: "number"},
    },
}

export const RELATIONSHIPS: RelationshipDefinitions = {
    projectIncidents: {
        localRowId: "incidents",
        remoteRowId: "projects",
        linkedRowId: "project",
    }
}

export const VALUES_SCHEMA: ValuesSchema = {
    sidebar: {type: "boolean", default: false},
}