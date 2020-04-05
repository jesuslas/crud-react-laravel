import React, { memo } from "react";
import { Redirect, Switch, Router } from "react-router-dom";
import RouteWithSubRoutes from "./RouteWithSubRoutes";
import { createBrowserHistory } from "history";
import { Dashboard, Logout } from "../../pages/index";
const hist = createBrowserHistory();
function RouterApp() {
  const routes = [
    {
      path: "/dashboard",
      component: Dashboard,
      name: "Dashboard",
      routes: [
        {
          name: "Tickets",
          path: "/dashboard/tickets"
        },
        {
          name: "Users",
          path: "/dashboard/usets"
        }
      ]
    },
    { path: "/logout", name: "Logout", component: Logout }
  ];
  return (
    <Router history={hist}>
      <Switch>
        {routes.map(route => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}
        <Redirect to="/dashboard" />
      </Switch>
    </Router>
  );
}

export default memo(RouterApp, (prev, next) => prev.user.id === next.user.id);
