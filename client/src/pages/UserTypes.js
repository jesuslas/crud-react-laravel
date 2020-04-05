import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import {
  customBodyRender,
  renderSelectTicketName
} from "../components/table/cellCustomRenders";
import {
  addUserTypes,
  deleteUserTypes,
  updateUserTypes
} from "../service/api.service";
const Users = props => {
  const { usertypes, userId, tick, setTick, isAdmin } = props;
  const [editCellRow, setEditCellRow] = useState({
    cell: null,
    row: null
  });
  const columns = [
    {
      name: "Id"
    },
    {
      name: "Name",
      options: {
        customBodyRender: customBodyRender(renderSelectTicketName, {
          tick,
          setTick,
          editCellRow,
          setEditCellRow,
          edit: updateUserTypes,
          colunm: "name"
        })
      }
    }
  ];
  const data = (usertypes || []).map(({ id, name }) => [id, name]);

  const classes = useStyles();
  const Toolbar = () => {
    return (
      <p>
        {isAdmin && (
          <Tooltip title="Create Role">
            <Icon
              className={classes.icon}
              color="primary"
              onClick={async () => {
                await addUserTypes({}, userId);
                setTick(tick + 1);
              }}
            >
              add_circle
            </Icon>
          </Tooltip>
        )}
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
  const settings = {
    responsive: "stacked",
    filter: false,
    print: false,
    viewColumns: false,
    download: false,
    pagination: false,
    onCellClick: (_, { colIndex, rowIndex }) => {
      setEditCellRow({ cell: colIndex, row: rowIndex });
    },
    customToolbar: () => <Toolbar />,
    search: false,
    onRowsDelete: ({ data }) => {
      let usertypesId = [];
      data.forEach(({ index }) => {
        usertypesId = [...usertypesId, usertypes[index].id];
      });
      const results = usertypesId.reduce(async (allPromise, usertype) => {
        const allResults = await allPromise;
        const result = await deleteUserTypes(usertype);
        return [...allResults, result];
      }, Promise.resolve([]));
      if (results.length === usertypesId.length) {
        setTick(tick + 1);
      }
    }
  };

  return (
    <MUIDataTable
      title={"Roles"}
      data={data}
      columns={columns}
      options={settings}
    />
  );
};
const useStyles = makeStyles(() => ({
  icon: {
    cursor: "pointer"
  }
}));
export default withRouter(Users);
