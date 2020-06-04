import React from "react";
import "./App.css";
import "./body.css";
import "antd/dist/antd.css";
import { ApolloProvider } from "@apollo/react-hooks";
import { Layout } from "antd";
import cubejs from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import client from "./graphql/client";
import WebSocketTransport from '@cubejs-client/ws-transport';
import Header from "./components/Header";
const API_URL = "http://localhost:4000";


let apiTokenPromise;

const cubejsApi = cubejs(
  () => {
    if (!apiTokenPromise) {
      // pass in query parameters for filtering ?gh_users_id=40084360
      apiTokenPromise = fetch(`${API_URL}/auth/cubejs-token`)
        .then((res) => res.json())
        .then((r) => r.token);
    }
    return apiTokenPromise;
  },
  {
    // Allow for real-time subscription
    transport: new WebSocketTransport({
    authorization: apiTokenPromise,
    apiUrl: API_URL.replace("http", "ws"),
    })
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
