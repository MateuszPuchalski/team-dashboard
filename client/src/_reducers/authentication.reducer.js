import { userConstants } from "../_constants";

let user = JSON.parse(sessionStorage.getItem("user"));
const initialState = user ? { user } : {};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggingIn: false,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggingIn: false,
        error: action.error,
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
};
