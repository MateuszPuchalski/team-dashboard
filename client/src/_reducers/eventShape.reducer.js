import { userConstants } from "../_constants";
import { eventAddingConstants } from "../_constants";

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
    case eventAddingConstants.GET_MATCH:
      return {
        ...state,
        match: action.match,
      };
    case eventAddingConstants.GET_HOME_PLAYERS:
      return {
        ...state,
        homePlayers: action.players,
      };

    case eventAddingConstants.GET_AWAY_PLAYERS:
      return {
        ...state,
        awayPlayers: action.players,
      };
    case eventAddingConstants.SET_COURT_CORDS:
      return {
        ...state,
        courtCords: action.cords,
      };
    case eventAddingConstants.SET_GOAL_CORDS:
      return {
        ...state,
        goalCords: action.cords,
      };

    default:
      return state;
  }
};
