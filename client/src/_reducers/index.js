import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { eventShape } from "./eventShape.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  eventShape,
});

export default rootReducer;
