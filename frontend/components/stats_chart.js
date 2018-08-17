import React, { Component, Fragment } from "react";

import PieChart from "react-minimal-pie-chart";
const colors = ["#3B1F2B", "#DB162F", "#DBDFAC", "#5F758E", "#383961"];
const colorsLight = ["#705C64", "#E45567", "#E4E7C2", "#8A9AAC", "#6E6F8C"];

const styleContainer = {
  position: "relative",
  width: "100px",
};

const styleChart = {
  height: "100px",
  width: "100px",
  cursor: "pointer",
};

const styleLabel = {
  position: "absolute",
  textAlign: "center",
  bottom: "-20px",
  left: "50%",
  fontSize: "0.9rem",
  width: "100%",
  transform: "translate(-50%, 0)",
};

const styleMaxElement = {
  fontSize: "0.8rem",
  width: "150px",
};

export default class StatsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverElement: false,
    };
    this.displayLabel = this.displayLabel.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  displayLabel() {
    if (!this.state.hoverElement) {
      return null;
    }
    return <label style={styleLabel}>{this.state.hoverElement.label}</label>;
  }

  onMouseOver(event, data, dataIndex) {
    this.setState({ hoverElement: data[dataIndex] });
  }

  onMouseOut(event, data, dataIndex) {
    this.setState({ hoverElement: null });
  }

  render() {
    let maxElement;
    this.props.data.forEach(element => {
      if (!maxElement || maxElement.value < element.value) {
        maxElement = element;
      }
    });

    let data = this.props.data.map((item, index) => {
      let label = `${item.label} ${item.value}%`;
      return {
        value: item.value,
        label,
        color:
          this.state.hoverElement && this.state.hoverElement.label === label
            ? colorsLight[index]
            : colors[index],
      };
    });

    return (
      <div style={styleContainer}>
        <p style={styleMaxElement}>
          {this.props.label}: {maxElement.label} {maxElement.value}%
        </p>
        <PieChart
          data={data}
          style={styleChart}
          startAngle={45}
          animate={true}
          rounded={false}
          paddingAngle={5}
          lineWidth={40}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        />
        {this.displayLabel()}
      </div>
    );
  }
}
