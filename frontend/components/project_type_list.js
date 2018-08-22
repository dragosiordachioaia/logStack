import React, { Component } from "react";

import * as api from "utils/api";

export default class ProjectTypeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectTypes: null,
      selectedProjectType: null,
    };
    this.fetchProjectPromise = null;
    this._isMounted = false;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    api.fetchProjectTypes().then(
      response => {
        if (this._isMounted) {
          this.setState({ projectTypes: response.data });
        }
      },
      error => {
        alert(error);
      }
    );
  }

  displayProjectTypes() {
    if (this.state.projectTypes.length === 0) {
      return <p>No project types found</p>;
    } else {
      return this.state.projectTypes.map(projectType => {
        return (
          <li key={projectType.name}>
            <button onClick={e => this.props.onChoose(projectType)}>
              {/* <i className={projectType.icon} /> */}
              {projectType.name}
            </button>
          </li>
        );
      });
    }
  }

  render() {
    if (!this.state.projectTypes) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <ul> {this.displayProjectTypes()} </ul>
      </div>
    );
  }
}
