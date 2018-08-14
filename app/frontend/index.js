import React from "react";
import ReactDOM from "react-dom";
import Cookies from "js-cookie";

import "less/main.less";

import App from "components/app";

// import AppErrorWrapper from "app/frontend/components/error_wrapper";

showApp();

function showApp() {
  let appContainer = <App />;
  ReactDOM.render(appContainer, document.getElementsByTagName("main")[0]);
}
