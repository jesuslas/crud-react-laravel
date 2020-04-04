import React from "react";
import MUIDataTable from "mui-datatables";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
const columns = ["Name", "Ticket", "Created At", "Status"];

const data = [
  ["Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"]
];

const MyTickets = () => {
  const classes = useStyles();
  const Toolbar = () => {
    return (
      <p>
        <Icon className={classes.icon} color="primary">
          add_circle
        </Icon>
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
    search: false
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
export default MyTickets;
