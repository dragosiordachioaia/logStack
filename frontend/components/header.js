import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import * as api from "utils/api";

export default class UserStatus extends Component {
  constructor(props) {
    super(props);

    this.displayNotLoggedIn = this.displayNotLoggedIn.bind(this);
    this.displayLoggedIn = this.displayLoggedIn.bind(this);
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
    return <p>Hello {this.props.user.username}</p>;
  }

  render() {
    if (!this.props.user || !this.props.user.username) {
      return this.displayNotLoggedIn();
    } else {
      return this.displayLoggedIn();
    }
  }
}
