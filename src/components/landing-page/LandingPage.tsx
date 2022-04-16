import React, { useState } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { useTranslation } from "react-i18next";
import useFetch from "use-http";
import { routes } from "../../routes";

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("pages/signin");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { post, response, error } = useFetch("/auth");

  const signin = async () => {
    const tokens = await post("/login", { email, password });
    // TODO: get user data and save in redux?
    // TODO: save JWT
    if (response.ok) {
      console.log(tokens);
      navigate(routes.home);
    } else {
      setErrorMessage("Username or password are incorrect!");
    }
  };

  const handleSubmit = async (e: any) => {
    setErrorMessage("");
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please insert all fields!");
    } else {
      await signin();
    }
  };

  return (
    <>
      <Typography variant="h1">Menahem</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "grid",
          gridTemplateRows: "repeat(4, 1fr)",
          p: 1,
          columnGap: 3,
          rowGap: 1,
          justifyContent: "center",
        }}
      >
        <TextField
          label="Email"
          type="email"
          error={emailError}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) {
              setEmailError(false);
            }
          }}
        />
        <TextField
          label="Password"
          type="password"
          error={passwordError}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) {
              setPasswordError(false);
            }
          }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ textTransform: "none" }}
        >
          Sign In
        </Button>
      </Box>

      <Button
        variant="text"
        onClick={() => navigate(routes.signup)}
        style={{ textTransform: "none" }}
      >
        Not a member yet? Sign up here!
      </Button>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </>
  );
};

export default LandingPage;
