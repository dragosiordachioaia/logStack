import React, { Component, Fragment } from "react";

import { Link, withRouter } from "react-router-dom";

import * as api from "utils/api";

export class Header extends Component {
  constructor(props) {
    super(props);

    this.displayNotLoggedIn = this.displayNotLoggedIn.bind(this);
    this.displayLoggedIn = this.displayLoggedIn.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.displayUserElement = this.displayUserElement.bind(this);
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
        <Link to="/account/a">
          <button>My account</button>
        </Link>
      </p>
    );
  }

  onLogout() {
    console.log("onLogout");
    api.logout().then(response => {
      this.props.setUser(null);
      this.props.history.push("/");
    });
  }

  displayUserElement() {
    if (!this.props.user || !this.props.user.username) {
      return this.displayNotLoggedIn();
    } else {
      return this.displayLoggedIn();
    }
  }

  render() {
    let userElement = this.displayUserElement();
    return (
      <div>
        <Link to="/">
          <p>Home</p>
        </Link>
        {userElement}
      </div>
    );
  }
}

export default withRouter(Header);
