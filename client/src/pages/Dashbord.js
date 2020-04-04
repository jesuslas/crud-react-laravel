import React from "react";
import { connect } from "react-redux";
import MyTickets from "./MyTickets";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Dashboard = props => {
  const classes = useStyles();
  const {
    user: { user_types }
  } = props;

  let render = null;
  switch (user_types) {
    case "admin":
      render = <Dashboard />;
      break;
    case "user":
      render = <MyTickets />;
      break;
    default:
      render = <MyTickets />;
      break;
  }

  return (
    <Container maxWidth="md" className={classes.myBody}>
      {render}
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const useStyles = makeStyles(theme => ({
  myBody: {
    marginTop: 50
  }
}));

export default connect(mapStateToProps)(Dashboard);
