import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import SignInForm from "../sign-in/SignInForm";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="App">
            <h1>Menahem</h1>
            <SignInForm />
            <Button
                variant="text"
                onClick={() => navigate("/signup")}
                style={{ textTransform: "none" }}
            >
                Not a member yet? Sign up here!
            </Button>
        </div>
    );
};

export default LandingPage;
