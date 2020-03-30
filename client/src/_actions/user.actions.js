import { userService } from "../_services";
import { userConstants } from "../_constants";
import { history } from "../_helpers";
export const userActions = {
  login,
  logout
};

function login(email, password) {
  return dispatch => {
    dispatch(request(email));
    userService.login(email, password).then(user => {
      dispatch(success(user));
      history.push("/profile");
      return { type: userConstants.LOGIN_SUCCESS, user };
    });
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  history.push("/");
  return { type: userConstants.LOGOUT };
}
