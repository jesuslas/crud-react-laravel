import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  getAllTickets,
  getAllUsers,
  getAllUserTypes
} from "../service/api.service";
import Tabs from "../components/tabs/Tabs";

const Dashboard = props => {
  const {
    user: {
      user_types: { name: role },
      id,
      name
    }
  } = props || {};
  const isAdmin = role === "admin";
  const classes = useStyles();
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [usertypes, setUserTypes] = useState([]);
  const [tick, setTick] = useState(0);
  const getTickets = async params => {
    try {
      const { data: ticks } = await getAllTickets(params);
      const { data: users } = await getAllUsers(params);
      const { data: usertypes } = await getAllUserTypes(params);
      setTickets(ticks);
      setUsers(users);
      setUserTypes(usertypes);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(
    () => {
      const params = role !== "admin" ? id : "";
      getTickets(params);
    },
    [role, id, tick]
  );

  return (
    <Container maxWidth="md" className={classes.myBody}>
      <Tabs
        {...{ tickets, users, usertypes, userId: id, tick, setTick, isAdmin }}
      />
      User Connected: {name}
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const useStyles = makeStyles(() => ({
  myBody: {
    marginTop: 50
  }
}));

export default connect(mapStateToProps)(Dashboard);
