import React, { Component } from "react";
import { Redirect, Switch, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { Dashboard, MyTickets, Logout } from "../../pages/index";

const hist = createBrowserHistory();

class RouterDashboard extends Component {
  render() {
    const Route = this.props.route;

    return (
      <Router history={hist}>
        <Switch>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/mytickets" exact component={MyTickets} />
          <Route path="/logout" exact component={Logout} />
          <Redirect to="/dashboard" />
        </Switch>
      </Router>
    );
  }
}

export default RouterDashboard;
