import React, { useEffect } from "react";
import { connect } from "react-redux";
import { userLogOut } from "../redux/actions/user";
import { withRouter } from "react-router-dom";

const Logout = props => {
  useEffect(
    () => {
      props.userLogOut();
      props.history.push(`/login`);
    },
    [props]
  );
  return <div>logout...</div>;
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = {
  userLogOut
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Logout));
