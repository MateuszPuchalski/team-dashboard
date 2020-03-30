export function authHeader() {
  let user = JSON.parse(sessionStorage.getItem("token"));

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}
