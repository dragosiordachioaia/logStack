import React, { Component } from "react";

import * as api from "utils/api";

export default class IssueView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      issueData: null,
      errors: [],
    };

    // this.displayStuff = this.displayStuff.bind(this);
  }

  componentDidMount() {
    api.fetchIssueDetails(this.props.match.params.issueID).then(
      response => {
        this.setState({issueData: response.data});
      },
      error => {
        let newErrors = JSON.parse(JSON.stringify(this.state.errors));
        newErrors.push(error);
        this.setState({
          errors: newErrors,
        });
      }
    );
  }

  displayStuff() {}

  render() {
    if(!this.state.issueData) {
      return <p>Loading...</p>
    }
    console.log(this.state)
    return <div> Message: {this.state.issueData.message} </div>;
  }
}
