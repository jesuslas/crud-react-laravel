import React from "react";
import { connect } from "react-redux";
import "./App.css";
import RouterPublic from "./components/routers/RouterPublic.js";
import RouterPrivate from "./components/routers/RouterPrivate.js";
import { Route } from "react-router-dom";

function App(props) {
  const { user } = props;
  const router = !user ? (
    <RouterPublic route={Route} />
  ) : (
    <RouterPrivate route={Route} />
  );
  return router;
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(App);
