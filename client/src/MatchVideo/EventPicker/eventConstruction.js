const SET_PLAYER = "team-dashboard/eventPicker/SET_PLAYER";
const SET_EVENT = "team-dashboard/eventPicker/SET_EVENT";
const SET_EVENT_DESCRIPTION =
  "team-dashboard/eventPicker/SET_EVENT_SET_EVENT_DESCRIPTION";
const SET_GOAL_CORDS = "team-dashboard/eventPicker/SET_GOAL_CORDS";
const SET_COURT_CORDS = "team-dashboard/eventPicker/SET_COURT_CORDS";

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case SET_PLAYER:
      return {
        ...state,
        player: action.payload,
      };
    case SET_EVENT:
      return {
        ...state,
        event: action.payload,
      };
    case SET_EVENT_DESCRIPTION:
      //potetial bugs here
      return {
        ...state,
        [state.event]: action.payload,
      };
    case SET_GOAL_CORDS:
      return {
        ...state,
        goalCords: action.payload,
      };
    case SET_COURT_CORDS:
      return {
        ...state,
        courtCords: action.payload,
      };
    default:
      return state;
  }
}

export function setPlayer(player) {
  return { type: SET_PLAYER, payload: player };
}
export function setEvent(event) {
  return { type: SET_EVENT, payload: event };
}
export function setEventDescription(eventDescription) {
  return { type: SET_EVENT_DESCRIPTION, payload: eventDescription };
}
export function setGoalCords(goalCords) {
  return { type: SET_GOAL_CORDS, payload: goalCords };
}
export function setCourtCords(courtCords) {
  return { type: SET_COURT_CORDS, payload: courtCords };
}
