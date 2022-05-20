import {
  FormControl,
  IconButton,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import useFetch from "use-http";

interface User {
  _id: string;
  name: string;
}

interface AddUsersProps {
  selectedUsers: string[];
  onAddUser: (userId: string) => void;
}

function AddUsers({ onAddUser, selectedUsers }: AddUsersProps) {
  const [searchValue, setSearchValue] = useState("");
  const { get, data } = useFetch<User[]>("/user");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (searchValue) {
      get(searchValue);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Typography variant="h5">Add Users</Typography>
      <form onSubmit={onSubmit}>
        <FormControl>
          <InputLabel>Search User</InputLabel>
          <Input
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            required
            endAdornment={
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            }
          />
        </FormControl>

        {data && (
          <List>
            {data.map((user) => (
              <ListItemButton
                key={user._id}
                onClick={(event) => onAddUser(user._id)}
              >
                <ListItem>{user.name}</ListItem>
              </ListItemButton>
            ))}
          </List>
        )}
      </form>
    </>
  );
}

export default AddUsers;
