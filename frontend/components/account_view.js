import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import loginRequired from "components/login_required_hoc";
import { fetchLoggedInUser, login } from "utils/api";

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
    fetchLoggedInUser().then(response => {
      console.log("user data: ", response.data);
      this.setState({ user: response.data });
    });
  }

  displayProjectList() {
    if (this.state.user.projects.length === 0) {
      return <p>You don't have any projects yet</p>;
    } else {
      let projectElements = this.state.user.projects.map(projectData => {
        return (
          <li key={projectData._id}>
            <Link to={`/projects/${projectData._id}`}>{projectData.name}</Link>
          </li>
        );
      });
      return (
        <div>
          <p>Your projects</p>
          <ul>{projectElements}</ul>
        </div>
      );
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
