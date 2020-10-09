import {
  SELECT_TYPE,
  SELECT_THROW_OUTCOME,
  SELECT_THROW_TECHNIQUE,
  SELECT_TURNOVER_TYPE,
  SELECT_PUNISHMENT_TYPE,
  SELECT_PLAYER,
  SET_END_LOCATION,
  SET_LOCATION,
} from "./constants";

const reducer = (state, action) => {
  switch (action.type) {
    case SELECT_TYPE:
      return { ...state, type: action.paylode };
      break;
    case SELECT_PLAYER:
      return { ...state, player: action.paylode };
      break;
    case SELECT_THROW_OUTCOME:
      return { ...state, throw: { ...state.throw, outcome: action.paylode } };
      break;
    case SELECT_THROW_TECHNIQUE:
      return { ...state, throw: { ...state.throw, technique: action.paylode } };
      break;
    case SELECT_TURNOVER_TYPE:
      return { ...state, turnover: { type: action.paylode } };
      break;
    case SELECT_PUNISHMENT_TYPE:
      return { ...state, punishment: { type: action.paylode } };
      break;
    case SET_END_LOCATION:
      return {
        ...state,
        throw: { ...state.throw, endLocation: action.paylode },
      };
      break;
    case SET_LOCATION:
      return {
        ...state,
        location: action.paylode,
      };
      break;
    default:
      break;
  }
};

export { reducer };
