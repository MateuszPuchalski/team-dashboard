import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./normalize.css";
import App2 from "./App2";
import * as serviceWorker from "./serviceWorker";
import { ProviderAuth } from "./useAuth";
ReactDOM.render(
  <ProviderAuth>
    <App2 />
  </ProviderAuth>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
