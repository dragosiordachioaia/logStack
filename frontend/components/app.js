import React, { Component, Fragment } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  // withRouter,
} from "react-router-dom";

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
      loadingState: "loading",
      error: null,
    };
  }

  componentDidMount() {
    api.getUserStatus().then(
      response => {
        this.setState({ user: response.data, loadingState: "loaded" });
      },
      error => {
        window.history.pushState("Login", "Login", "/login/a");
        this.setState({ loadingState: "loaded" });
      }
    );
  }

  displayLoading() {
    return <p>Loading...</p>;
  }

  render() {
    if (this.state.loadingState === "loading") {
      return this.displayLoading();
    }
    return (
      // <UserContext.Provider value={this.state.user}>
      <Router>
        <Fragment>
          <Header
            user={this.state.user}
            setUser={user => this.setState({ user })}
          />
          <Route path="/" render={() => <ProjectView {...this.state} />} />
          <Route
            path="/projects/:projectID"
            render={() => <ProjectView {...this.state} />}
          />
          <Route
            path="/login/a"
            render={() => (
              <LoginView
                {...this.state}
                setUser={user => this.setState({ user })}
              />
            )}
          />
          <Route
            path="/register/a"
            render={() => <RegisterView {...this.state} />}
          />
          <Route
            path="/issues/:issueID"
            render={() => <IssueView {...this.state} />}
          />
          <Route
            path="/account/a"
            render={() => <AccountView {...this.state} />}
          />
        </Fragment>
      </Router>
      // </UserContext.Provider>
    );
  }
}

// export default withRouter(App);
