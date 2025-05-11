import { createContext, useEffect, useRef } from "react";
import {
  createRelationships,
  createStore,
  Id,
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
  get: (table: string, params?: any) => any;
  post: (table: string, params?: any, action?: string) => Id | undefined;
  del: (table: string, params?: any) => any;
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
    createRelationships(store.current),
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
      relationship.linkedRowId,
    );
  });

  useCreatePersister(
    store.current,
    (store) => createLocalPersister(store, "database"),
    [],
    async (persister) => {
      await persister.startAutoLoad([defaultTables, defaultValues]);
      await persister.startAutoSave();
    },
  );

  function getRow(table: string, params?: any) {
    return (
      Object.entries(store.current?.getTable(table)).find(([, row]) =>
        Object.entries(params).every(([key, value]) => row[key] === value),
      ) || [undefined, undefined]
    );
  }

  function get(table: string, params?: { id?: number }): any {
    if (params) {
      if (params.id)
        return {
          ...store.current?.getRow(table, params.id.toString()),
          id: params.id,
        };
      const [id, row] = getRow(table, params);
      return { ...row, id: id };
    }
    return Object.entries(store.current?.getTable(table)).map(([id, row]) => ({
      ...row,
      id: id,
    }));
  }

  function post(table: string, params?: any, action?: string): Id | undefined {
    if (action) return;
    return store.current?.addRow(table, params);
  }

  function del(table: string, params: any): any {
    const [id] = getRow(table, params);
    return { ...store.current?.getRow(table, id as string), id: id };
  }

  return (
    <StoreContext.Provider
      value={{
        store: store.current,
        relationships: storeRelationships.current,
        get: get,
        post: post,
        del: del,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export { StoreContext, StoreProvider };
export type { StoreApi, RelationshipDefinitions };
