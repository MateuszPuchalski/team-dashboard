import { combineReducers } from "redux";

import { test } from "./test.reducer";
import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { eventShape } from "./eventShape.reducer";

const rootReducer = combineReducers({
  test,
  authentication,
  registration,
  eventShape,
});

export default rootReducer;
