import React, { useEffect, useState } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { useTranslation } from "react-i18next";
import useFetch from "use-http";
import { useDispatch } from "react-redux";
import { routes } from "../../routes";
import { tokens } from "../../auth/auth-utils";
import { useHideNavbar } from "../../hooks/use-hide-navbar";
import { setUserId } from "../../redux/slices/userSlice";

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("pages/signin");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { post, response, error } = useFetch("/auth");
  const dispatch = useDispatch();

  useHideNavbar();

  const signin = async () => {
    const resTokens = await post("/login", { email, password });
    if (response.ok) {
      tokens.access.set(resTokens.accessToken);
      tokens.refresh.set(resTokens.refreshToken);
      dispatch(setUserId(resTokens.userId));
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
