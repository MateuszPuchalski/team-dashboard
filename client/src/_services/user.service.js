export const userService = {
  login,
  logout,
  register,
};

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch("/api/auth", requestOptions)
    .then((response) => response.json())
    .then((user) => {
      sessionStorage.setItem("user", JSON.stringify(user));
      return user;
    })
    .catch((error) => error);
}

function logout() {
  sessionStorage.removeItem("user");
}

function register(data) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch("/api/users/add", requestOptions)
    .then((response) => response.json())
    .then((user) => {
      return user;
    });
}
