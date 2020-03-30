export const userService = {
  login,
  logout
};

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  };

  return fetch("/api/auth", requestOptions)
    .then(response => response.json())
    .then(user => {
      sessionStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}

function logout() {
  sessionStorage.removeItem("user");
}
