import { combineReducers } from "redux";

import { test } from "./test.reducer";
import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";

const rootReducer = combineReducers({
  test,
  authentication,
  registration,
});

export default rootReducer;
