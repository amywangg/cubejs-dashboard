import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { HashRouter as Router, Route } from "react-router-dom";
import ExplorePage from "./pages/ExplorePage";
import DashboardPage from "./pages/DashboardPage";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App>
        <Route key="index" exact path="/" component={DashboardPage} />
        <Route key="explore" path="/explore" component={ExplorePage} />
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
