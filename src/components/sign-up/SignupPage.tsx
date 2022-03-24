import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHobbyId } from "../../redux/slices/userSlice";

interface Hobby {
  name: string;
  _id: string;
}

const SingupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currHobbyId, setCurrHobbyId] = useState("");
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:4000/hobbies/getAll", {
      method: "GET",
    })
      .then((res) => {
        res.json().then((data) => setHobbies(data));
      })
      .catch((err: any) => console.error(err));
  }, []);

  const list = useMemo(
    () =>
      hobbies.map((hobby) => (
        <MenuItem value={hobby._id} key={hobby._id}>
          {hobby.name}
        </MenuItem>
      )),
    [hobbies]
  );

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!email || !password || !currHobbyId || !name) {
      alert("Please insert all fields!");
    } else {
      fetch("http://localhost:4000/users/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          hobbyId: currHobbyId,
          isConnected: false,
        }),
      })
        .then((res) => {
          if (res.body) {
            if (res.status === 500) {
              alert("Email already exists!");
            } else {
              res.json().then((data) => {
                dispatch(setHobbyId(currHobbyId));
              });
              navigate("/");
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCurrHobbyId(event.target.value);
  };

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Grid container direction="column">
        <Grid item margin={1} xs={12}>
          <TextField
            required
            value={name}
            label="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item margin={1} xs={12}>
          <TextField
            required
            value={email}
            label="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item margin={1} xs={12}>
          <TextField
            required
            value={password}
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item margin={1}>
          <FormControl sx={{ m: 1, minWidth: 225 }}>
            <InputLabel>Hobby</InputLabel>
            <Select
              value={currHobbyId}
              onChange={handleChange}
              autoWidth
              required
            >
              {list}
            </Select>
          </FormControl>
        </Grid>

        <Grid item margin={1} xs={12}>
          <Button type="submit">Create user</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingupPage;
