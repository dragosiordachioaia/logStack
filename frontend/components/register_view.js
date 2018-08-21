import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import * as api from "utils/api";

export class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    api
      .register({ ...this.state })
      .then(response => this.props.history.push("/"), error => alert(error));
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
          onChange={e => this.setState({ password: e.target.value })}
        />
        <br />
        <input
          placeholder="Email"
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default withRouter(RegisterView);
