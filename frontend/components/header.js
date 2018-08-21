import React, { Component, Fragment } from "react";

import { Link, withRouter } from "react-router-dom";

import * as api from "utils/api";

export class Header extends Component {
  constructor(props) {
    super(props);

    this.displayNotLoggedIn = this.displayNotLoggedIn.bind(this);
    this.displayLoggedIn = this.displayLoggedIn.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  displayNotLoggedIn() {
    return (
      <Fragment>
        <Link to="/login/a">
          <button>Login</button>
        </Link>
        <Link to="/register/a">
          <button>Register</button>
        </Link>
      </Fragment>
    );
  }

  displayLoggedIn() {
    return (
      <p>
        Hello {this.props.user.username}{" "}
        <button onClick={this.onLogout}>Log out</button>
      </p>
    );
  }

  onLogout() {
    console.log("onLogout");
    api.logout().then(response => {
      this.props.setUser();
      this.props.history.push("/");
    });
  }

  render() {
    if (!this.props.user || !this.props.user.username) {
      return this.displayNotLoggedIn();
    } else {
      return this.displayLoggedIn();
    }
  }
}

export default withRouter(Header);
