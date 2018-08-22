import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import loginRequired from "components/login_required_hoc";
import { fetchUserDetails, login } from "utils/api";

export class AccountView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.displayProjectList = this.displayProjectList.bind(this);
    this.onCreateProjectClick = this.onCreateProjectClick.bind(this);
  }

  componentDidMount() {
    // login({ username: "me", password: "bla" });
    fetchUserDetails().then(response => {
      console.log("user data: ", response.data);
      this.setState({ user: response.data });
    });
  }

  displayProjectList() {
    if (this.state.user.projects) {
      return <p>You don't have any projects yet</p>;
    } else {
      let projectElements = this.state.user.projects.map(projectID => {
        return <li key={projectID}>{projectID}</li>;
      });
      return <ul>{projectElements}</ul>;
    }
  }

  onCreateProjectClick() {
    this.props.history.push("/projects/new");
  }

  render() {
    if (!this.state.user) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        AccountView
        {this.displayProjectList()}
        <button onClick={this.onCreateProjectClick}>Create a project</button>
      </div>
    );
  }
}

export default loginRequired(withRouter(AccountView));
