export const CHANGE_TEST_FIELD = "CHANGE_TEST_FIELD";

export const setTestField = text => {
  return {
    type: CHANGE_TEST_FIELD,
    payload: text
  };
};
