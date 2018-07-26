import React from "react";
import ReactDOM from "react-dom";
import { bindActionCreators, createStore, applyMiddleware } from "redux";
import { connect, Provider } from "react-redux";
import thunk from "redux-thunk";
import Cookies from "js-cookie";

import reducers from "reducers/store";
import "less/main.less";

import App from "components/app";

// import AppErrorWrapper from "app/frontend/components/error_wrapper";

export function initStore(reducers, preloadedState, sentryConfig) {
  return createStore(
    reducers,
    preloadedState,
    applyMiddleware(
      thunk,
      createRavenMiddleware(Raven, {
        stateTransformer: filterStateForSentryPayload,
      })
    )
  );
}

function showApp() {
  const preloadedState = {};
  const store = createStore(reducers, preloadedState, applyMiddleware(thunk));

  let appContainer = (
    <Provider store={store}>
      <div>
        <style>{displayMainStyle(contextComponentsData)}</style>
        <AppErrorWrapper>
          <App />
        </AppErrorWrapper>
      </div>
    </Provider>
  );
  ReactDOM.render(appContainer, document.getElementsByTagName("main")[0]);
}
