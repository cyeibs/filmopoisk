import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./styles/global.css";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./Router/appRouter";
import { Provider } from "react-redux";
import { store } from "./RTK/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>
);
