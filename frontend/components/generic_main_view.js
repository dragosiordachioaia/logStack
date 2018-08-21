import React, { Component } from "react";

export default class GenericMainView extends Component {
  constructor(props) {
    super(props);

    // this.displayStuff = this.displayStuff.bind(this);
  }

  displayStuff() {}

  render() {
    return (
      <div> This is logstack! here you can catch and analyse errors! </div>
    );
  }
}
