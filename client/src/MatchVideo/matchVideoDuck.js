const SET_ACTIVE_MATCH = "matchVideo/SET_ACTIVE_MATCH";

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case SET_ACTIVE_MATCH:
      return {
        ...state,
        match: action.paylode,
      };

    default:
      return state;
  }
}

export function setActiveMatch(matchId) {
  return { type: SET_ACTIVE_MATCH, paylode: matchId };
}
