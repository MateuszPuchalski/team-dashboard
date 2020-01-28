export const checkLoggedIn = async auth => {
  const response = await fetch("/api/auth");
  console.log(response);
  const user = await response.json();
  console.log(user);
};
