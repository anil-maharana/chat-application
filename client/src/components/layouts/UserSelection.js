import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import configData from "../../config/config.json";
import CircularProgress from "@mui/material/CircularProgress";
const renderTagFunction = (value, getTagProps) => {
  return value.map((u) => (
    <Chip
      key={u._id}
      avatar={<Avatar src={u.avatar} />}
      label={`${u.lastName}, ${u.firstName}`}
      variant="outlined"
    />
  ));
};
const renderOptionsFunction = (option, { selected }) => {
  return (
    <React.Fragment>
      <Chip
        avatar={<Avatar alt="Natacha" src={option.photo} />}
        label={`${option.lastName}, ${option.firstName}`}
        variant="outlined"
      />
    </React.Fragment>
  );
};
function UserSelection({
  field,
  label,
  name,
  id,
  value,
  form: { touched, errors },
  ...props
}) {
  const [open, setOpen] = React.useState(false);

  const [users, setUsers] = useState([]);
  const [defaultUsers, setDefaultUsers] = useState([]);
  const [defaultUsersLoading, setDefaultUsersLoading] = useState(true);

  const loading = open && users.length === 0;

  const handleChange = (value) => {
    props.onChange("users", value);
  };

  useEffect(() => {
    _fetchdefaultUsers().then((_) => setDefaultUsersLoading(false));
  }, []);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const { data } = await axios.get(`${configData.SERVER_URL}/api/users`);
      setUsers(data);
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setUsers([]);
    }
  }, [open]);

  const _fetchdefaultUsers = async () => {
    const _users = await Promise.all(
      value.map(async (u) => {
        const { data } = await axios.get(
          `${configData.SERVER_URL}/api/users/${u}`
        );
        return data;
      })
    );
    setDefaultUsers(_users);
  };
  const _fetchAllUsers = async () => {
    const { data } = await axios.get(`${configData.SERVER_URL}/api/users`);
    setUsers(data);
  };
  return (
    <div>
      {defaultUsersLoading ? (
        <span>Loading Users.</span>
      ) : (
        <Autocomplete
          multiple
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          onChange={(event, value, reason) => {
            handleChange(value);
          }}
          options={users}
          loading={loading}
          id="tags-outlined"
          getOptionLabel={(option) => `${option.lastName}, ${option.firstName}`}
          defaultValue={defaultUsers}
          renderTags={renderTagFunction}
          renderInput={(params) => (
            <TextField
              {...params}
              {...field}
              {...props}
              variant="outlined"
              label={label}
              name={name}
              placeholder="Users"
              error={touched[field.name] && Boolean(errors[field.name])}
              helperText={errors[field.name]}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      )}
    </div>
  );
}
export default UserSelection;
