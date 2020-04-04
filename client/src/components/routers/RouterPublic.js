import React, { Component } from "react";
import { Redirect, Switch, BrowserRouter } from "react-router-dom";

import Login from "../login/Login.js";

class RouterPublic extends Component {
  render() {
    const Route = this.props.route;
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact strict component={Login} />
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default RouterPublic;
