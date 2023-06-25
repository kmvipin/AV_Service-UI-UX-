import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from "./Components/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary>
  <Router>
    <App />
  </Router>
  </ErrorBoundary>
);