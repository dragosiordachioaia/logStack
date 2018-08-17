import React, { Component } from "react";

import HistoryChartBar from "components/history_chart_bar";

const styleContainer = {
  display: "inline-block",
  marginLeft: "10px",
  float: "right",
};

const MAX_BAR_HEIGHT = 20;

export default class HistoryChart extends Component {
  constructor(props) {
    super(props);

    this.displayBars = this.displayBars.bind(this);
  }

  displayBars() {
    if (
      !this.props.keys ||
      this.props.keys.length === 0 ||
      !this.props.values ||
      this.props.values.length === 0
    ) {
      return null;
    }

    let maxOccurences = 0;
    for (let time in this.props.values) {
      let occurences = this.props.values[time];
      if (occurences > maxOccurences) {
        maxOccurences = occurences;
      }
    }

    return this.props.keys.map(key => {
      let occurences = this.props.values[key];
      if (!occurences) {
        occurences = 0;
      }

      const height = Math.max((occurences / maxOccurences) * MAX_BAR_HEIGHT, 1);
      return (
        <HistoryChartBar
          key={key}
          label={key}
          height={height}
          occurences={occurences}
        />
      );
    });
  }

  render() {
    return <div style={styleContainer}>{this.displayBars()}</div>;
  }
}
