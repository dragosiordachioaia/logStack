import React, { Component, Fragment } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import * as api from "utils/api";
import "less/main.less";

import LoginView from "components/login_view";
import RegisterView from "components/register_view";
import ProjectView from "components/project_view";
import IssueView from "components/issue_view";
import AccountView from "components/account_view";
import Header from "components/header";

// const UserContext = React.createContext();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    api.getUserStatus().then(
      response => {
        this.setState({ user: response.data });
      },
      error => {
        console.log("user is not logged in");
      }
    );
  }

  render() {
    return (
      // <UserContext.Provider value={this.state.user}>
      <Router>
        <Fragment>
          <Header user={this.state.user} />
          <Route path="/" component={ProjectView} />
          <Route path="/projects/:projectID" component={ProjectView} />
          <Route
            path="/login/a"
            render={() => <LoginView user={this.state.user} />}
          />
          <Route
            path="/register/a"
            render={() => <RegisterView user={this.state.user} />}
          />
          <Route path="/issues/:issueID" component={IssueView} />
          <Route path="/account/a" component={AccountView} />
        </Fragment>
      </Router>
      // </UserContext.Provider>
    );
  }
}
