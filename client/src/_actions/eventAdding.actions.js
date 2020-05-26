import { eventAddingConstants } from "../_constants";
export const eventAddingActions = {
  setPlayer,
  setEvent,
  setEventType,
  getMatch,
  getPlayers,
  setGoalCords,
  setCourtCords,
  addEvent,
};
function addEvent(eventShape) {
  return (dispatch) => {
    fetch(`/api/events/add`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(eventShape),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
}
function setPlayer(player) {
  return { type: eventAddingConstants.SET_PLAYER, player };
}
function setEvent(event) {
  return { type: eventAddingConstants.SET_EVENT, event };
}
function setEventType(eventType) {
  return { type: eventAddingConstants.SET_EVENT_TYPE, eventType };
}
function getMatch(matchId) {
  return (dispatch) => {
    fetch(`/api/matches/${matchId}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: eventAddingConstants.GET_MATCH, match: data });
      });
  };
}
function getPlayers(side, clubId) {
  return (dispatch) => {
    fetch(`/api/players/club/${clubId}`)
      .then((res) => res.json())
      .then((data) => {
        if (side == "home") {
          dispatch({
            type: eventAddingConstants.GET_HOME_PLAYERS,
            players: data,
          });
        }
        if (side == "away") {
          dispatch({
            type: eventAddingConstants.GET_AWAY_PLAYERS,
            players: data,
          });
        }
      });
  };
}
function setCourtCords(cords) {
  return { type: eventAddingConstants.SET_COURT_CORDS, cords };
}
function setGoalCords(cords) {
  return { type: eventAddingConstants.SET_GOAL_CORDS, cords };
}
