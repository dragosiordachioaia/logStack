import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import * as api from "utils/api";

import StatsChart from "components/stats_chart";

const styleButton = {
  marginBottom: "20px",
};

export default class IssueView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      issueData: null,
      groupData: null,
      errors: [],
    };

    // this.displayStuff = this.displayStuff.bind(this);
  }

  componentDidMount() {
    api
      .fetchIssueDetails(this.props.match.params.issueID)
      .then(issueResponse => {
        this.setState({ issueData: issueResponse.data });
        api
          .fetchGroupDetails(issueResponse.data.groupID)
          .then(groupResponse =>
            this.setState({ groupData: groupResponse.data })
          );
      });
  }

  displayStuff() {}

  render() {
    if (!this.state.issueData || !this.state.groupData) {
      return <p>Loading...</p>;
    }
    console.log(this.state);

    let browserData = this.state.groupData.users.browserPercent;
    let browserListForChart = [];

    for (let browserName in browserData) {
      browserListForChart.push({
        value: browserData[browserName],
        label: browserName,
      });
    }
    console.log("browserListForChart: ", browserListForChart);

    return (
      <Fragment>
        <button
          style={styleButton}
          onClick={e =>
            this.props.history.push(
              `/projects/${this.state.issueData.projectID}`
            )
          }
        >
          Back to project
        </button>
        <div>Message: {this.state.issueData.message}</div>
        <StatsChart label="Browser" data={browserListForChart} />
      </Fragment>
    );
  }
}

// export default withRouter(IssueView);
