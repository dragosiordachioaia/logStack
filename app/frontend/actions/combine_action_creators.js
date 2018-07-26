import _ from "underscore";

import * as issues from "actions/action_creators/actions_issues"; // eslint-disable-line no-restricted-syntax

// just combine all the action creators into one object that we can then import anywhere
export default _.extend({}, issues);
