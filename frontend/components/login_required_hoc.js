import React, { Component } from "react";
import { withRouter } from "react-router-dom";

export default function loginRequired(WrappedComponent) {
  return withRouter(
    class LoginRequiredComponent extends Component {
      constructor(props) {
        super(props);
        this.checkUser = this.checkUser.bind(this);
      }

      componentDidMount() {
        this.checkUser();
      }

      componentDidUpdate() {
        this.checkUser();
      }

      checkUser() {
        if (!this.props.user) {
          this.props.history.push("/");
        }
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
  );
}
