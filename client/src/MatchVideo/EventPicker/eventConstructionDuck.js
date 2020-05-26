const SET_PLAYER = "eventPicker/SET_PLAYER";
const SET_EVENT = "eventPicker/SET_EVENT";
const SET_EVENT_DESCRIPTION = "eventPicker/SET_EVENT_DESCRIPTION";
const SET_GOAL_CORDS = "eventPicker/SET_GOAL_CORDS";
const SET_COURT_CORDS = "eventPicker/SET_COURT_CORDS";
const ADD_EVENT = "eventPicker/ADD_EVENT";

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case SET_PLAYER:
      return {
        ...state,
        player: action.payload,
      };
    case SET_EVENT:
      console.log({ actionPayload: action.payload });
      if (["punishment", "turnover"].includes(action.payload)) {
        return {
          player: state.player,
          type: action.payload,
          location: state.location,
        };
      }
      if (["half start", "half end"].includes(action.payload)) {
        return {
          type: action.payload,
        };
      }
      if (["throw"].includes(action.payload)) {
        return {
          player: state.player,
          type: action.payload,
          location: state.location,
        };
      }

      break;
    case SET_EVENT_DESCRIPTION:
      //potetial bugs here
      return {
        ...state,
        [state.type]: { ...state.throw, type: action.payload },
      };
    case SET_GOAL_CORDS:
      return {
        ...state,
        throw: { ...state.throw, endLocation: action.payload },
      };
    case SET_COURT_CORDS:
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
}
// add throw  fucntioons
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

export function addEvent(data) {
  return (dispatch) => {
    fetch("/api/events/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
}
