import React from "react";
import MUIDataTable from "mui-datatables";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { addTickets, deleteTickets } from "../service/api.service";

const columns = [
  "Name",
  "Ticket",
  {
    name: '"Created At"',
    options: {
      customBodyRender: value => moment(value).format("LL [Time:] HH:mm")
    }
  },
  "Status"
];

let data = [
  ["Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"]
];

const MyTickets = props => {
  const { tickets, userId, tick, setTick } = props;
  data = (tickets || []).map(
    ({ user: { name: userName }, ticket_pedido, created_at, status }) => [
      userName,
      ticket_pedido,
      created_at,
      status
    ]
  );
  const classes = useStyles();
  const Toolbar = () => {
    return (
      <p>
        <Icon
          className={classes.icon}
          color="primary"
          onClick={async () => {
            await addTickets({}, userId);
            setTick(tick + 1);
          }}
        >
          add_circle
        </Icon>
        <Tooltip title="Logout">
          <Icon
            className={classes.icon}
            color="primary"
            onClick={() => props.history.push(`/logout`)}
          >
            exit_to_app
          </Icon>
        </Tooltip>
      </p>
    );
  };
  const options = {
    // filterType: "checkbox",
    filter: false,
    print: false,
    viewColumns: false,
    download: false,
    pagination: false,
    customToolbar: () => <Toolbar />,
    search: false,
    onRowsDelete: ({ data }) => {
      let ticketsIds = [];
      data.forEach(({ index }) => {
        ticketsIds = [...ticketsIds, tickets[index].id];
      });
      const results = ticketsIds.reduce(async (allPromise, tickect) => {
        const allResults = await allPromise;
        const result = await deleteTickets(tickect);
        return [...allResults, result];
      }, Promise.resolve([]));
      if (results.length === ticketsIds.length) {
        setTick(tick + 1);
      }
    }
  };

  return (
    <MUIDataTable
      title={"Employee List"}
      data={data}
      columns={columns}
      options={options}
    />
  );
};
const useStyles = makeStyles(theme => ({
  icon: {
    cursor: "pointer"
  }
}));
export default withRouter(MyTickets);
