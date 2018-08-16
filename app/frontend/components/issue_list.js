import React, { Component } from "react";
import moment from "moment";

import HistoryChart from "components/history_chart";

const styleList = {
  paddingLeft: "0",
};

const styleElement = {
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

export default class IssueList extends Component {
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
        <li key={issue._id} style={styleElement}>
          <span style={styleMessage}>{issue.message} </span> -{" "}
          <span style={styleInstances}> {issue.history.count} instances </span>
          <HistoryChart values={issue.history.days} keys={last14Days} />
        </li>
      );
    });

    return <ul style={styleList}>{issues}</ul>;
  }
}
