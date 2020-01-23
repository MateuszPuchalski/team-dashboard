import React, { useState, useContext, createContext } from "react";

const authContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (email, password, cb) => {
    const data = { email: email, password: password };

    fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        cb();
      })
      .catch(err => console.error(err));
  };

  const signup = (username, email, password) => {
    const data = { username: username, email: email, password: password };

    fetch("/api/users/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
      })
      .catch(err => console.error(err));
  };

  const signout = () => {
    setUser(null);
  };

  return { user, signin, signup, signout };
}
