import React, { Component } from "react";

const styleBar = {
  display: "inline-block",
  width: "10px",
  backgroundColor: "#ccc",
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
  top: "-30px",
  left: 0,
};

export default class HistoryChartBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    }
    this.onHover = this.onHover.bind(this);
    this.displayFloatElement = this.displayFloatElement.bind(this);
  }

  onHover(e) {
    console.log(this.props.occurences);

  }

  displayFloatElement() {
    if(!this.state.isHover) {
      return null;
    }

    return <aside style={styleFloat}>{this.props.occurences}</aside>;
  }


  render() {
    let style = JSON.parse(JSON.stringify(styleBar));
    style.height = this.props.height + 'px';
    return (
      <div
        style={style}
        onMouseOver={e => this.setState({isHover: true})}
        onMouseLeave={e => this.setState({isHover: false})}
      >
        {this.displayFloatElement()}
      </div>
    );
  }
}
