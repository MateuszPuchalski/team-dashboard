import { CHANGE_TEST_FIELD } from "../_actions/test.actions";
const initialState = {
  testField: "BOOM!"
};
export const test = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_TEST_FIELD:
      return { ...state, testField: payload };

    default:
      return state;
  }
};
