import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import loginRequired from "components/login_required_hoc";
import * as api from "utils/api";

import ProjectTypeList from "components/project_type_list";

export class NewProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProjectType: null,
      newProjectName: "",
    };
    this.displaySelectedProjectType = this.displaySelectedProjectType.bind(
      this
    );
    this.selectProjectType = this.selectProjectType.bind(this);
    this.createNewProject = this.createNewProject.bind(this);
  }

  selectProjectType(projectType) {
    this.setState({ selectedProjectType: projectType });
  }

  createNewProject() {
    api.createProject({
      name: this.state.newProjectName,
      type: this.state.selectedProjectType.name,
    });
  }

  displaySelectedProjectType() {
    if (!this.state.selectedProjectType) {
      return null;
    }
    return (
      <p>
        Selected Project Type: {this.state.selectedProjectType.name} <br />
        <input
          value={this.state.newProjectName}
          onChange={e => this.setState({ newProjectName: e.target.value })}
        />
        <button onClick={this.createNewProject}>Create Project</button>
      </p>
    );
  }

  render() {
    return (
      <div>
        <h1>Create a new project:</h1>
        <ProjectTypeList onChoose={this.selectProjectType} />
        {this.displaySelectedProjectType()}
      </div>
    );
  }
}

export default loginRequired(withRouter(NewProjectView));
