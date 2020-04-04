import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import MyTickets from "./MyTickets";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getAllTickets } from "../service/api.service";

const Dashboard = props => {
  console.log("props", props);
  const {
    user: {
      user_types: { name: role },
      id
    }
  } = props || {};
  const [tickets, setTickets] = useState([]);
  const [tick, setTick] = useState(0);
  const classes = useStyles();
  const getTickets = async params => {
    try {
      const { data } = await getAllTickets(params);
      setTickets(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("tick", tick);
  useEffect(
    () => {
      const params = role !== "admin" ? id : "";
      getTickets(params);
    },
    [role, id, tick]
  );

  return (
    <Container maxWidth="md" className={classes.myBody}>
      <MyTickets {...{ tickets, userId: id, tick, setTick }} />
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
