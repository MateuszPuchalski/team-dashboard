import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-dom";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";

import "./normalize.css";
import App2 from "./App2";
import * as serviceWorker from "./serviceWorker";
/* 
  TODO:
    -create actions and reducers
    -bind reducer to store
*/

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App2 />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
