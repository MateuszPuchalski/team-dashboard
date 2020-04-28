import { eventAddingConstants } from "../_constants";
export const eventAddingActions = {
  setPlayer,
  setEvent,
  setEventType,
};

function setPlayer(player) {
  return { type: eventAddingConstants.SET_PLAYER, player };
}
function setEvent(event) {
  return { type: eventAddingConstants.SET_EVENT, event };
}
function setEventType(eventType) {
  return { type: eventAddingConstants.SET_EVENT_TYPE, eventType };
}
