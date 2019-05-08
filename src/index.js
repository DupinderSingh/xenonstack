import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { routerMiddleware } from "react-router-redux";
import { BrowserRouter, Route } from "react-router-dom";
import "./static/css/design.css";
import "./static/css/grid-1.css";
import "./static/css/common-2.css";
import "material-icons/iconfont/material-icons.css";
// admin side css and js
import "./static/vendors/bower_components/datatables/media/css/jquery.dataTables.min.css";
import "./static/vendors/bower_components/datatables.net-responsive/css/responsive.dataTables.min.css";
import "./static/css/custom.css";
// import "./static/vendors/bower_components/jquery/dist/jquery.min.js";
import "./static/vendors/bower_components/bootstrap/dist/js/bootstrap.min.js";
import "./static/vendors/bower_components/datatables/media/js/jquery.dataTables.min.js";
import "./static/vendors/bower_components/datatables.net-buttons/js/dataTables.buttons.min.js";
import "./static/vendors/bower_components/datatables.net-responsive/js/dataTables.responsive.min.js";
import "./static/js/jquery.slimscroll.js";
// import 'switchery/standalone/switchery.css';
// import 'switchery/standalone/switchery'
import "./static/js/init.js";
import "./static/css/wekanboard.css";
import RouteComponent from "./App";
import { applyMiddleware, createStore } from "redux";
import combineReducers from "./reducers";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import getApi from "./middleware/token/get-api";
import getWithoutToken from "./middleware/without_token/get-api-without-token";
import putApi from "./middleware/token/put_api/put-api-with-body";
import putApiWithoutBody from "./middleware/token/put_api/put-api-without-body";
import deleteApi from "./middleware/token/delete/without-body";
import deleteApiWithBody from "./middleware/token/delete/with-body";
import postApi from "./middleware/token/post-api";
import postWithoutTOKEN from "./middleware/without_token/post-api-without-token";

import "./static/css/style.css";
 
const history = createHistory();
const middleware = routerMiddleware(history);

export default createHistory({ forceRefresh: true });

export const store = createStore(
  combineReducers,
  applyMiddleware(
    thunk,
    getApi,
    getWithoutToken,
    putApi,
    putApiWithoutBody,
    deleteApi,
    deleteApiWithBody,
    postApi,
    postWithoutTOKEN,
    middleware
  )
);

const Rout = (
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={RouteComponent} />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(Rout, document.getElementById("root"));
