import Layout from "@/components/Layout";
import { StoreProvider } from "@/contexts/StoreContext";
import {
  DEFAULT_TABLES,
  DEFAULT_VALUES,
  RELATIONSHIPS,
  TABLES_SCHEMA,
  VALUES_SCHEMA,
} from "@/data/store";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <StoreProvider
        tableSchema={TABLES_SCHEMA}
        valueSchema={VALUES_SCHEMA}
        relationships={RELATIONSHIPS}
        defaultTables={DEFAULT_TABLES}
        defaultValues={DEFAULT_VALUES}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </ThemeProvider>
  );
}
