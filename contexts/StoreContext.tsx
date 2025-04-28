import { createContext, useEffect, useRef } from "react";
import {
  createRelationships,
  createStore,
  Relationships,
  Store,
  Tables,
  TablesSchema,
  Values,
  ValuesSchema,
} from "tinybase";
import { createLocalPersister } from "tinybase/persisters/persister-browser";
import { useCreatePersister } from "tinybase/ui-react";

interface StoreApi {
  store: Store;
  relationships?: Relationships;
}

interface StoreProviderProps {
  tableSchema: TablesSchema;
  valueSchema: ValuesSchema;
  relationships?: RelationshipDefinitions;
  defaultTables?: Tables;
  defaultValues?: Values;
  children: React.ReactNode;
}

const StoreContext = createContext<StoreApi | undefined>(undefined);

type RelationshipDefinitions = {
  [relationshipId: string]: {
    localRowId: string;
    remoteRowId: string;
    linkedRowId: string;
  };
};

function StoreProvider({
  tableSchema,
  valueSchema,
  defaultTables = {},
  defaultValues = {},
  relationships = {},
  children,
}: StoreProviderProps) {
  const store = useRef<Store>(createStore());
  const storeRelationships = useRef<Relationships>(
    createRelationships(store.current)
  );

  useEffect(() => {
    store.current
      .setTablesSchema(tableSchema)
      .setValuesSchema(valueSchema)
      .setTables(defaultTables)
      .setValues(defaultValues);
  }, [store]);

  Object.entries(relationships).forEach(([relationshipId, relationship]) => {
    storeRelationships.current?.setRelationshipDefinition(
      relationshipId,
      relationship.localRowId,
      relationship.remoteRowId,
      relationship.linkedRowId
    );
  });

  useCreatePersister(
    store.current,
    (store) => createLocalPersister(store, "database"),
    [],
    async (persister) => {
      await persister.startAutoLoad([defaultTables, defaultValues]);
      await persister.startAutoSave();
    }
  );

  return (
    <StoreContext.Provider
      value={{
        store: store.current,
        relationships: storeRelationships.current,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export { StoreContext, StoreProvider };
export type { StoreApi, RelationshipDefinitions };
