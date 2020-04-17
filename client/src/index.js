import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./_helpers";
import { Router } from "react-router-dom";
import { history } from "./_helpers";
import "./index.css";
import "./normalize.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "styled-components";

const theme = {
  bg:
    "linear-gradient(180deg,rgba(254, 95, 100, 1) 0%,rgba(250, 25, 154, 1) 100%)",
  primary: "rgb(245,245,245)",
  textColor: "rgb(50, 50, 50)",
  boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.2)",
};
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
