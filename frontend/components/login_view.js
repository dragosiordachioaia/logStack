import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import * as api from "utils/api";

export class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.history.push("/");
    }
  }

  onSubmit(e) {
    e.preventDefault();
    api.login({ ...this.state }).then(
      response => {
        this.props.setUser({ ...this.state });
        this.props.history.push("/");
      },
      error => alert(error)
    );
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          placeholder="Username"
          value={this.state.username}
          onChange={e => this.setState({ username: e.target.value })}
        />
        <br />
        <input
          placeholder="Password"
          value={this.state.password}
          type="password"
          onChange={e => this.setState({ password: e.target.value })}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default withRouter(LoginView);
