import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import * as api from "utils/api";

import ProjectView from "components/project_view";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Route exact path="/project/:project_id" component={ProjectView} />
      </Router>
    );
  }
}
