import {
  Alert,
  Box,
  Button,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { count } from "console";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "use-http";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validLength, setValidLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [match, setMatch] = useState(true);
  const [isStrong, setIsStrong] = useState(true);
  const [requiredLength, setRequiredLength] = useState(8);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post } = useFetch("/auth");

  useEffect(() => {
    setValidLength(password.length >= requiredLength);
    setUpperCase(password.toLowerCase() !== password);
    setLowerCase(password.toUpperCase() !== password);
    setHasNumber(/\d/.test(password));
  }, [password, requiredLength, confirmPassword]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!email || !password || !name) {
      alert("Please insert all fields!");
    } else {
      post("/signup", { email, password, name })
        .then((res) => {
          if (res === "Created") {
            navigate("/");
          } else {
            alert("Email already exists!");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
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
            onBlur={() =>
              setIsStrong(validLength && hasNumber && upperCase && lowerCase)
            }
          />
          {!isStrong && (
            <Alert severity="error">
              Your password is not strong enough. Passwords must be at least 8
              characters long, include at least one number, include both lower
              and upper case characters.
            </Alert>
          )}
        </Grid>
        <Grid item margin={1} xs={12}>
          <TextField
            required
            value={confirmPassword}
            label="Confirm Password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => setMatch(!!password && password === confirmPassword)}
          />
          {!match && <Alert severity="error">Passwords do not match!</Alert>}
        </Grid>
        <Grid item margin={1} xs={12}>
          <Button type="submit">Create user</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUpPage;
