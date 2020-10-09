import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./_helpers";
import { Router } from "react-router-dom";
import { history } from "./_helpers";
import { ApolloProvider } from "@apollo/client";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
  concat,
} from "@apollo/client";
import "./index.css";
import "./normalize.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "styled-components";
import { AuthContext } from "./auth";
const httpLink = new HttpLink({ uri: "/graphql", credentials: "include" });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem("token") || "",
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

const theme = {
  bg:
    "linear-gradient(180deg,rgba(254, 95, 100, 1) 0%,rgba(250, 25, 154, 1) 100%)",
  primary: "rgb(245,245,245)",
  textColor: "rgb(50, 50, 50)",
  boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.2)",
};
ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthContext.Provider value={true}>
      <Provider store={store}>
        <Router history={history}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Router>
      </Provider>
    </AuthContext.Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
