import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import loginRequired from "components/login_required_hoc";
import { fetchUserDetails, login } from "utils/api";

export class AccountView extends Component {
  constructor(props) {
    super(props);

    // this.displayStuff = this.displayStuff.bind(this);
  }

  componentDidMount() {
    // login({ username: "me", password: "bla" });
    // fetchUserDetails(this.props.match.params.userID).then(response => {
    //   console.log("user data: ", response.data);
    // });
  }

  displayStuff() {}

  render() {
    return <div> AccountView </div>;
  }
}

export default loginRequired(withRouter(AccountView));
