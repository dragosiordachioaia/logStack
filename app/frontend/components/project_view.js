import React, { Component, Fragment } from "react";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import * as api from "utils/api";
import IssueList from "components/issue_list";

export default class ProjectView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      issues: null,
      projects: null,
      projectOptionsForDropdown: null,
      selectedProject: null,
      errors: [],
    };

    this.displayProjectPicker = this.displayProjectPicker.bind(this);
    this.onChangeProject = this.onChangeProject.bind(this);
  }

  componentDidMount() {
    console.log("props: ", this.props);
    api.fetchProjects().then(
      response => {
        let dropdownOptions = response.data.map(project => {
          return {
            value: project._id,
            label: project.name,
          };
        });

        let selectedProject = null;
        dropdownOptions.forEach(option => {
          if (option.value === this.props.match.params.projectID) {
            selectedProject = option;
            this.onChangeProject(selectedProject);
            console.log("matched project");
          }
        });

        console.log("selectedProject = ", selectedProject);

        let newState = {
          projects: response.data,
          projectOptionsForDropdown: dropdownOptions,
        };

        if (selectedProject) {
          newState.selectedProject = selectedProject;
        }

        this.setState(newState);
      },
      error => {
        let newErrors = JSON.parse(JSON.stringify(this.state.errors));
        newErrors.push(error);
        this.setState({
          errors: newErrors,
        });
      }
    );
  }

  onChangeProject(selectedProject) {
    this.setState({ selectedProject });
    api.fetchGroups(selectedProject.value).then(
      response => {
        this.setState({ issues: response.data }, () => {
          console.log(this.state);
        });
      },
      error => {
        const newErrors = JSON.parse(JSON.stringify(this.state.errors));
        newErrors.push(error);
        this.setState({
          errors: newErrors,
        });
      }
    );
  }

  displayProjectPicker() {
    if (!this.state.projectOptionsForDropdown) {
      return null;
    }

    return (
      <Dropdown
        options={this.state.projectOptionsForDropdown}
        onChange={this.onChangeProject}
        value={this.state.selectedProject}
        placeholder="Choose a project"
      />
    );
  }

  render() {
    return (
      <Fragment>
        {this.displayProjectPicker()}
        <IssueList issues={this.state.issues} />
      </Fragment>
    );
  }
}
