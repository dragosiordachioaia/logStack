import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";

import * as api from "utils/api";

import IssueListItem from "components/issue_list_item";

const styleList = {
  paddingLeft: "0",
};

export class IssueList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedIssues: [],
    };
    this.onIssueClick = this.onIssueClick.bind(this);
    this.displayActions = this.displayActions.bind(this);
    this.onIssueCheck = this.onIssueCheck.bind(this);
    this.onMerge = this.onMerge.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onIgnore = this.onIgnore.bind(this);
  }

  displayActions() {
    return (
      <div>
        Actions:
        <button onClick={this.onMerge}>Merge</button>
        <button onClick={this.onDelete}>Delete</button>
        <button onClick={this.onIgnore}>Ignore</button>
      </div>
    );
  }

  onMerge() {
    api
      .mergeGroups(this.state.checkedIssues.map(issue => issue._id))
      .then(() => {
        this.props.fetchProjectList();
      });
  }

  onDelete() {
    api
      .deleteGroups(this.state.checkedIssues.map(issue => issue._id))
      .then(() => {
        this.props.fetchProjectList();
      });
  }

  onIgnore() {
    api
      .ignoreGroups(this.state.checkedIssues.map(issue => issue._id))
      .then(() => {
        this.props.fetchProjectList();
      });
  }

  onIssueClick(issue) {
    this.props.history.push(`/issues/${issue.lastIssue._id}`);
  }

  onIssueCheck(issue) {
    this.setState({ checkedIssues: [...this.state.checkedIssues, issue] });
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
        <IssueListItem
          key={issue._id}
          issue={issue}
          onClick={this.onIssueClick}
          last14Days={last14Days}
          onCheck={this.onIssueCheck}
        />
      );
    });

    return (
      <div>
        {this.displayActions()}
        <ul style={styleList}>{issues}</ul>
      </div>
    );
  }
}

export default withRouter(IssueList);
