import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { withRouter } from "react-router-dom";
import {
  customBodyRender,
  renderSelectUser,
  renderSelectTicketName,
  renderPassword
} from "../components/table/cellCustomRenders";
import {
  addUser,
  deleteUser,
  getAllUserTypes,
  updateUser
} from "../service/api.service";
const Users = props => {
  const { users, userId, tick, setTick, isAdmin } = props;
  const [userTypes, setUserTypes] = useState([]);
  console.log("userTypes", userTypes);
  const [editCellRow, setEditCellRow] = useState({
    cell: null,
    row: null
  });
  const columns = [
    {
      name: "Id"
    },
    {
      name: "userTypeId",
      options: {
        display: false
      }
    },
    {
      name: "Name",
      options: {
        customBodyRender: customBodyRender(renderSelectTicketName, {
          tick,
          setTick,
          editCellRow,
          setEditCellRow,
          edit: updateUser,
          colunm: "name"
        })
      }
    },
    {
      name: "Email",
      options: {
        customBodyRender: customBodyRender(renderSelectTicketName, {
          tick,
          setTick,
          editCellRow,
          setEditCellRow,
          edit: updateUser,
          colunm: "email"
        })
      }
    },
    {
      name: "Password",
      options: {
        customBodyRender: customBodyRender(renderPassword, {
          tick,
          setTick,
          editCellRow,
          setEditCellRow,
          edit: updateUser,
          colunm: "password"
        })
      }
    },
    {
      name: "Created At",
      options: {
        customBodyRender: value => moment(value).format("LL [Time:] HH:mm")
      }
    },
    {
      name: "Role",
      options: {
        customBodyRender:
          isAdmin &&
          customBodyRender(renderSelectUser, {
            users: userTypes,
            tick,
            setTick,
            editCellRow,
            setEditCellRow,
            edit: updateUser,
            colunm: "userTypes"
          })
      }
    }
  ];
  const data = (users || []).map(
    ({
      id,
      userType_id,
      name,
      email,
      password,
      created_at,
      user_types: { name: role }
    }) => [id, userType_id, name, email, password, created_at, role]
  );

  const classes = useStyles();
  const Toolbar = () => {
    return (
      <p>
        {isAdmin && (
          <Tooltip title="Create User">
            <Icon
              className={classes.icon}
              color="primary"
              onClick={async () => {
                await addUser({}, userId);
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
      let usersId = [];
      data.forEach(({ index }) => {
        usersId = [...usersId, users[index].id];
      });
      const results = usersId.reduce(async (allPromise, user) => {
        const allResults = await allPromise;
        const result = await deleteUser(user);
        return [...allResults, result];
      }, Promise.resolve([]));
      if (results.length === usersId.length) {
        setTick(tick + 1);
      }
    }
  };
  const getUserTypes = async () => {
    try {
      const { data } = await getAllUserTypes();
      setUserTypes(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getUserTypes();
  }, []);
  return (
    <MUIDataTable
      title={"Users"}
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
