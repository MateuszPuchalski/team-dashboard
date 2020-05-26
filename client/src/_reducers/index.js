import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { eventShape } from "./eventShape.reducer";
import matchVideo from "../MatchVideo/matchVideoDuck";
import eventConstruction from "../MatchVideo/EventPicker/eventConstructionDuck";

const rootReducer = combineReducers({
  authentication,
  registration,
  eventShape,
  eventConstruction,
  matchVideo,
});

export default rootReducer;
