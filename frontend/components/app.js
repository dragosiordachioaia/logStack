import React, { Component, Fragment } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import * as api from "utils/api";
import "less/main.less";

import ProjectView from "components/project_view";
import IssueView from "components/issue_view";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path="/" component={ProjectView} />
          <Route exact path="/projects/" component={ProjectView} />
          <Route exact path="/projects/:projectID" component={ProjectView} />
          <Route exact path="/issues/:issueID" component={IssueView} />
        </Fragment>
      </Router>
    );
  }
}
