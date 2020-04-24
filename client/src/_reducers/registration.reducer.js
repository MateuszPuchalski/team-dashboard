import { userConstants } from "../_constants";

// let user = JSON.parse(sessionStorage.getItem("user"));
// const initialState = user ? { user } : {};

export const registration = (state = {}, action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.REGISTER_SUCCESS:
      return {
        loggingIn: false,
        user: action.user,
      };
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state;
  }
};
