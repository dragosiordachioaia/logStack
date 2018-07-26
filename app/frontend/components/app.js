import React, { Component } from "react";

import actions from "actions/combine_action_creators";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

export class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h1>This is our app</h1>;
  }
}

function mapStateToProps(state) {
  return {
    issues: state.issues,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      actions: {
        fetchIssues: actions.fetchIssues,
      },
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
