import { combineReducers as assembleState } from "redux";

import issues from "reducers/issues_reducer";

export default assembleState({
  issues,
});
