import React, { useState, useEffect, useContext, createContext } from "react";

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

  const session = () => {
    fetch("/api/auth", {
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(user => setUser(user));
  };

  useEffect(() => {
    console.log({ typeses: typeof session });
    session();
  }, []);

  const signin = (email, password, cb) => {
    const data = { email: email, password: password };
    console.log({ type: typeof data });
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

  return { session, user, signin, signup, signout };
}
