import React, { Component } from "react";

const styleBar = {
  display: "inline-block",
  width: "10px",
  backgroundColor: "#9FA7AF",
  marginRight: "2px",
  marginLeft: "0",
  cursor: "pointer",
  position: "relative",
};

const styleFloat = {
  backgroundColor: "#e1e1e1",
  borderRadius: "5px",
  padding: "3px 15px",
  position: "absolute",
  bottom: "-45px",
  left: "50%",
  transform: "translate(-50%, 0)",
  backgroundColor: "#2c3e50",
  color: "#ffffff",
  width: "100px",
  fontSize: "0.85rem",
  textAlign: "center",
  zIndex: "1",
};

const styleHitArea = {
  position: "absolute",
  left: "0",
  bottom: "0px",
  backgroundColor: "transparent",
  width: "calc(100% + 2px)",
  height: "20px",
};

const styleBarHover = { ...styleBar, backgroundColor: "#253342" };

const styleArrow = {
  position: "absolute",
  top: "-4px",
  left: "50%",
  transform: "translate(-50%, 0)",
};

export default class HistoryChartBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    };
    this.onHover = this.onHover.bind(this);
    this.displayFloatElement = this.displayFloatElement.bind(this);
  }

  onHover(e) {
    console.log(this.props.occurences);
  }

  displayFloatElement() {
    if (!this.state.isHover) {
      return null;
    }

    return (
      <aside style={styleFloat}>
        <div className="arrow-up" style={styleArrow} />
        {this.props.label}
        <br />
        {this.props.occurences}{" "}
        {this.props.occurences === 1 ? "event" : "events"}
      </aside>
    );
  }

  render() {
    let style = {
      ...(this.state.isHover ? styleBarHover : styleBar),
      height: this.props.height + "px",
    };
    return (
      <div
        style={style}
        onMouseOver={e => this.setState({ isHover: true })}
        onMouseLeave={e => this.setState({ isHover: false })}
      >
        <div style={styleHitArea} />
        {this.displayFloatElement()}
      </div>
    );
  }
}
