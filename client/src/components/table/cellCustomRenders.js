import React from "react";
import TextField from "@material-ui/core/TextField";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Input from "@material-ui/core/Input";

export const renderSelectUser = props => {
  const { value, onSave, userId, users } = props;
  return (
    <TextField
      id="filled-select-currency-native"
      select
      label="Users"
      value={userId}
      onChange={({ target: { value: newValue } }) =>
        onSave(value, parseInt(newValue))
      }
      SelectProps={{
        native: true
      }}
      variant="filled"
      onBlur={() => onSave()}
    >
      {users.map(({ name, id }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </TextField>
  );
};
export const renderSelectStatus = props => {
  const { value, onSave } = props;
  return (
    <TextField
      id="filled-select-currency-native"
      select
      label={"Status"}
      value={value}
      onChange={({ target: { value: newValue } }) => onSave(value, newValue)}
      SelectProps={{
        native: true
      }}
      variant="filled"
      onBlur={() => onSave()}
    >
      {["Created", "Demorated", "Done", "Running"].map((name, id) => (
        <option key={id} value={name}>
          {name}
        </option>
      ))}
    </TextField>
  );
};
export const renderSelectTicketName = props => {
  const { value, onSave } = props;
  return (
    <Input
      defaultValue={value}
      autoFocus
      onBlur={({ target: { value: newValue } }) => onSave(value, newValue)}
      onKeyDown={({ target: { value: newValue }, key }) => {
        if (key === "Enter") {
          onSave(value, newValue);
        }
      }}
    />
  );
};
export const renderPassword = props => {
  const { value, onSave } = props;
  return (
    <Input
      defaultValue={value}
      type={"password"}
      autoFocus
      onBlur={({ target: { value: newValue } }) => onSave(value, newValue)}
      onKeyDown={({ target: { value: newValue }, key }) => {
        if (key === "Enter") {
          onSave(value, newValue);
        }
      }}
    />
  );
};

export const customBodyRender = (render, props) => (value, tableMeta) => {
  const { rowData, rowIndex, columnIndex } = tableMeta;
  console.log("rowData", rowData);
  const { editCellRow, setEditCellRow, setTick, tick, colunm, edit } = props;
  const { row, cell } = editCellRow;
  const ticketId = rowData[0];
  const userId = rowData[1];
  console.log("userId", userId);
  const isCell = rowIndex === row && columnIndex === cell;
  const onSave = async (oldValue, newValue) => {
    setEditCellRow({ cell: undefined, row: undefined });
    if (!oldValue && !newValue) {
      return null;
    }
    if (oldValue !== newValue && newValue !== "") {
      if (userId !== newValue) {
        await edit(ticketId, { [colunm]: newValue });
        setTick(tick + 1);
      }
    }
  };
  return (
    <>
      {!isCell ? (
        colunm === "password" ? (
          "*********"
        ) : (
          value
        )
      ) : (
        <ClickAwayListener onClickAway={() => onSave()} mouseEvent={"onMouseDown"}>
          {render({ ...props, value, onSave, userId })}
        </ClickAwayListener>
      )}
    </>
  );
};
