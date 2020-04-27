import { userConstants } from "../_constants";

export const eventShape = (state = {}, action) => {
  switch (action.type) {
    case userConstants.SET_PLAYER:
      return {
        ...state,
        player: action.player,
      };
    case userConstants.SET_EVENT:
      return {
        ...state,
        event: action.event,
      };
    case userConstants.SET_EVENT_TYPE:
      return {
        ...state,
        eventType: action.eventType,
      };

    default:
      return state;
  }
};
