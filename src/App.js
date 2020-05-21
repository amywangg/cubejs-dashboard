import React from "react";
import "./App.css";
import "./body.css";
import "antd/dist/antd.css";
import { ApolloProvider } from "@apollo/react-hooks";
import { Layout } from "antd";
import cubejs from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import client from "./graphql/client";
import Header from "./components/Header";
const API_URL = "http://localhost:4000";
// const CUBEJS_TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODk5MDkwNjUsImV4cCI6MTU4OTk5NTQ2NX0.ak-CkIKzvL52xnXfKqHuQ_eok0ejo7H0eRnQmJNbgQ4";

let apiTokenPromise;

const cubejsApi = cubejs(
  () => {
    if (!apiTokenPromise) {
      // pass in query parameters for filtering
      apiTokenPromise = fetch(`${API_URL}/auth/cubejs-token?user=1`)
        .then((res) => res.json())
        .then((r) => r.token);
    }
    return apiTokenPromise;
  },
  {
    apiUrl: `${API_URL}/cubejs-api/v1`,
  }
);

const AppLayout = ({ children }) => (
  <Layout
    style={{
      height: "100%",
    }}
  >
    <Header />
    <Layout.Content>{children}</Layout.Content>
  </Layout>
);

const App = ({ children }) => (
  <CubeProvider cubejsApi={cubejsApi}>
    <ApolloProvider client={client}>
      <AppLayout>{children}</AppLayout>
    </ApolloProvider>
  </CubeProvider>
);

export default App;
