import React from "react";
import ReactRouterDom from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
/* 
Applying our middleware to the store
*/
import store from "./store/storeConfig";

ReactRouterDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
