import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import loginRequired from "components/login_required_hoc";
import * as api from "utils/api";

import StatsChart from "components/stats_chart";

const styleButton = {
  marginBottom: "20px",
};

export class IssueView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      issueData: null,
      groupData: null,
      errors: [],
    };

    this._isMounted = false;

    // this.displayStuff = this.displayStuff.bind(this);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    api
      .fetchIssueDetails(this.props.match.params.issueID)
      .then(issueResponse => {
        if (this._isMounted) {
          this.setState({ issueData: issueResponse.data });
        }

        api
          .fetchGroupDetails(issueResponse.data.groupID)
          .then(groupResponse => {
            if (this._isMounted) {
              this.setState({ groupData: groupResponse.data });
            }
          });
      });
  }

  displayStuff() {}

  render() {
    if (!this.state.issueData || !this.state.groupData) {
      return <p>Loading...</p>;
    }
    console.log(this.state);

    let browserData = this.state.groupData.users.browserPercent;
    let deviceData = this.state.groupData.users.devicePercent;
    let browserListForChart = [];
    let deviceListForChart = [];

    for (let browserName in browserData) {
      browserListForChart.push({
        value: browserData[browserName],
        label: browserName,
      });
    }
    for (let deviceName in deviceData) {
      deviceListForChart.push({
        value: deviceData[deviceName],
        label: deviceName,
      });
    }

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
        <StatsChart label="Device" data={deviceListForChart} />
      </Fragment>
    );
  }
}

export default loginRequired(withRouter(IssueView));
