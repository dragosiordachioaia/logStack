import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";

import HistoryChart from "components/history_chart";

const styleList = {
  paddingLeft: "0",
};

const styleElement = {
  cursor: "pointer",
  listStyleType: "none",
  border: "1px solid #eee",
  padding: "5px 20px",
  borderRadius: "50px",
  display: "block",
  backgroundColor: "#fafafa",
  marginBottom: "10px",
};

const styleMessage = {};

const styleInstances = {
  fontWeight: "bold",
};

export class IssueList extends Component {
  constructor(props) {
    super(props);

    this.onIssueClick = this.onIssueClick.bind(this);
  }

  onIssueClick(issue) {
    this.props.history.push(`/issues/${issue.lastIssue._id}`);
  }

  render() {
    if (!this.props.issues) {
      return null;
    }
    if (this.props.issues.length === 0) {
      return <p>There are no issues for this project</p>;
    }

    let last14Days = [];

    for (let i = 13; i >= 0; i--) {
      let crtDay = moment()
        .subtract(i, "d")
        .format("YYYY-MM-DD");
      last14Days.push(crtDay);
    }

    const issues = this.props.issues.map((issue, index) => {
      return (
        <li
          key={issue._id}
          style={styleElement}
          onClick={e => this.onIssueClick(issue)}
        >
          <span style={styleMessage}>{issue.message} </span> -{" "}
          <span style={styleInstances}>
            {" "}
            {issue.history.count}{" "}
            {issue.history.count === 1 ? "event" : "events"}{" "}
          </span>
          <HistoryChart values={issue.history.days} keys={last14Days} />
        </li>
      );
    });

    return <ul style={styleList}>{issues}</ul>;
  }
}

export default withRouter(IssueList);
