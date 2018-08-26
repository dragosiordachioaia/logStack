import React, { Component } from "react";
import HistoryChart from "components/history_chart";

const styleContainer = {
  cursor: "pointer",
  listStyleType: "none",
  border: "1px solid #eee",
  padding: "5px 20px",
  borderRadius: "50px",
  display: "block",
  backgroundColor: "#fafafa",
  marginBottom: "10px",
};

const styleInstances = {
  fontWeight: "bold",
};

const styleMessage = {};

export default class IssueListItem extends Component {
  constructor(props) {
    super(props);

    this.displayIgnoredStatus = this.displayIgnoredStatus.bind(this);
  }

  displayIgnoredStatus() {
    if (!this.props.issue.ignored) {
      return <span>Not Ignored</span>;
    }
    return <span>Ignored</span>;
  }

  render() {
    let issue = this.props.issue;
    return (
      <li style={styleContainer} onClick={e => this.props.onClick(issue)}>
        <input
          type="checkbox"
          onChange={e => this.props.onCheck(issue)}
          onClick={e => e.stopPropagation()}
        />
        <span style={styleMessage}>{issue.messages.join(", ")} </span> -{" "}
        <span style={styleInstances}>
          {" "}
          {issue.history.count} {issue.history.count === 1 ? "event" : "events"}{" "}
        </span>
        {this.displayIgnoredStatus()}
        <HistoryChart
          values={issue.history.days}
          keys={this.props.last14Days}
        />
      </li>
    );
  }
}
