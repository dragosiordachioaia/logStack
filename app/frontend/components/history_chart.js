import React, { Component } from "react";

const styleContainer = {
  display: "inline-block",
  marginLeft: "10px",
};

const styleBar = {
  display: "inline-block",
  width: "10px",
  backgroundColor: "#ccc",
  marginRight: "2px",
  marginLeft: "0",
};

const MAX_BAR_HEIGHT = 20;

export default class HistoryChart extends Component {
  constructor(props) {
    super(props);

    this.displayBars = this.displayBars.bind(this);
  }

  displayBars() {
    console.log("this.props = ", this.props);

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
      let style = JSON.parse(JSON.stringify(styleBar));
      style.height =
        Math.max((occurences / maxOccurences) * MAX_BAR_HEIGHT, 1) + "px";
      return <div style={style} key={key} />;
    });
  }

  render() {
    return <div style={styleContainer}>{this.displayBars()}</div>;
  }
}
