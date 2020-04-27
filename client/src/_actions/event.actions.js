import { userConstants } from "../_constants";
export const eventActions = {
  setPlayer,
  setEvent,
  setEventType,
};

function setPlayer(player) {
  return { type: userConstants.SET_PLAYER, player };
}
function setEvent(event) {
  return { type: userConstants.SET_EVENT, event };
}
function setEventType(eventType) {
  return { type: userConstants.SET_EVENT_TYPE, eventType };
}
