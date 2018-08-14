import React, { Component } from "react";

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
    if (!this.props.issues || this.props.issues.length === 0) {
      return <p>Loading...</p>;
    }

    const issues = this.props.issues.map((issue, index) => {
      return (
        <li key={issue._id} style={styleElement}>
          <span style={styleMessage}>{issue.message} </span> -{" "}
          <span style={styleInstances}> {issue.instances} instances </span>
        </li>
      );
    });

    return <ul>{issues}</ul>;
  }
}
