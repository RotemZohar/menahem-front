import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import useFetch from "use-http";
import { useNavigate, useNavigationType, useParams } from "react-router-dom";
import { routes } from "../../routes";

const petEditPage = () => {
  const { put, get, response } = useFetch("/pet");
  const { petId } = useParams();
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [snackMessage, setSnackMessage] = useState("");
  const [openSnack, setSnackOpen] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    get(`/${petId}`)
      .then((pet) => {
        setName(pet.name);
        setHeight(pet.height);
        setWeight(pet.weight);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSnackClick = () => {
    setSnackOpen(true);
  };

  const handleSnackClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleSnackClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await put(`/${petId}`, {
      name,
      height,
      weight,
    });

    if (response.data === "Edited") {
      navigate(routes.pets);
    } else {
      setSnackMessage("Error occurred");
      handleSnackClick();
    }
  };

  return (
    <Grid container justifyContent="center">
      <Card sx={{ width: 600, minHeight: 300, m: 3 }}>
        <CardHeader title="Edit Pet" />
        <Divider />
        <Box component="form" onSubmit={onSubmit} m={2}>
          <Grid
            style={{
              display: "inline-flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <TextField
              value={name}
              label="Name"
              type="string"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              value={height}
              label="Height"
              type="number"
              onChange={(e) => setHeight(e.target.value)}
              InputProps={{
                inputProps: { min: 0, max: 200 },
                endAdornment: (
                  <InputAdornment position="end">cm</InputAdornment>
                ),
              }}
            />
            <TextField
              value={weight}
              label="Weight"
              type="number"
              onChange={(e) => setWeight(e.target.value)}
              InputProps={{
                inputProps: { min: 0, max: 200 },
                endAdornment: (
                  <InputAdornment position="end">kg</InputAdornment>
                ),
              }}
            />
            <Grid item margin={1} xs={12}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
              <Snackbar
                open={openSnack}
                autoHideDuration={3000}
                message={snackMessage}
                onClose={handleSnackClose}
                action={action}
              />
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Grid>
  );
};

export default petEditPage;
