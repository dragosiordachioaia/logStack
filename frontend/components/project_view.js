import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import loginRequired from "components/login_required_hoc";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import * as api from "utils/api";
import IssueList from "components/issue_list";

export class ProjectView extends Component {
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
    this.loadProjectData = this.loadProjectData.bind(this);
    this.fetchProjectList = this.fetchProjectList.bind(this);
  }

  componentDidMount() {
    this.fetchProjectList();
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchProjectList() {
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
            this.loadProjectData(selectedProject);
          }
        });

        let newState = {
          projects: response.data,
          projectOptionsForDropdown: dropdownOptions,
        };

        if (selectedProject) {
          newState.selectedProject = selectedProject;
        }

        if (this._isMounted) {
          this.setState(newState);
        }
      },
      error => {
        let newErrors = JSON.parse(JSON.stringify(this.state.errors));
        newErrors.push(error);
        if (this._isMounted) {
          this.setState({
            errors: newErrors,
          });
        }
      }
    );
  }

  onChangeProject(selectedProject) {
    this.props.history.push(`/projects/${selectedProject.value}`);
    if (this.props.match.params.projectID) {
      if (this._isMounted) {
        this.setState({ selectedProject }, () => {
          this.loadProjectData(selectedProject);
        });
      }
    }
  }

  loadProjectData(selectedProject) {
    if (this._isMounted) {
      this.setState({ selectedProject });
    }
    api.fetchGroups(selectedProject.value).then(
      response => {
        if (this._isMounted) {
          this.setState({ issues: response.data });
        }
      },
      error => {
        const newErrors = JSON.parse(JSON.stringify(this.state.errors));
        newErrors.push(error);
        if (this._isMounted) {
          this.setState({
            errors: newErrors,
          });
        }
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

export default loginRequired(withRouter(ProjectView));
