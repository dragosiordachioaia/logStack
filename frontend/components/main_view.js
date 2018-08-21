import React, { Component } from "react";

import GenericMainView from "components/generic_main_view";
import ProjectView from "components/project_view";

export default class MainView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.user) {
      return <ProjectView />;
    } else {
      return <GenericMainView />;
    }

    return <div> MainView </div>;
  }
}
