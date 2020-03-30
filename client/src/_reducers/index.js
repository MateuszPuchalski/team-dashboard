import { combineReducers } from "redux";

import { test } from "./test.reducer";
import { authentication } from "./authentication.reducer";

const rootReducer = combineReducers({
  test,
  authentication
});

export default rootReducer;
