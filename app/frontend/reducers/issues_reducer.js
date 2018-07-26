import { SET_ISSUES, SET_ISSUES_ERROR } from "actions/action_types";

let initialState = {
  data: null,
  error: null,
};

export default function(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_ISSUES:
      newState = JSON.parse(JSON.stringify(state));
      return newState;
    default:
      return state;
  }
}
