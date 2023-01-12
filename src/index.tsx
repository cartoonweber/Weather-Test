import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { HashRouter } from "react-router-dom";
import { RefreshContextProvider } from "./context/RefreshContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <RefreshContextProvider>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </RefreshContextProvider>
);
