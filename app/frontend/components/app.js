import React, { Component } from "react";

import * as api from "utils/api";

import IssueList from "components/issue_list";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: null,
      errors: null,
    };

    // this.displayIssues = this.displayIssues.bind(this);
  }

  componentDidMount() {
    api.fetchGroups().then(
      response => {
        this.setState({ issues: response.data }, () => {
          console.log(this.state);
        });
      },
      error => {
        const newErrors = JSON.parse(JSON.stringify(this.state.errors));
        newErrors.push(error);
        this.setState({
          errors: newErrors,
        });
      }
    );
  }

  render() {
    return <IssueList issues={this.state.issues} />;
  }
}
