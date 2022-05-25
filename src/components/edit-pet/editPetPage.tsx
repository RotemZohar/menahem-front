import { Box, Button, Grid, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import useFetch from "use-http";
import { useParams } from "react-router-dom";

const petEditPage = () => {
  const { put } = useFetch("/pet");
  const { petId } = useParams();
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [openSnack, setSnackOpen] = React.useState(false);

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
    const editedDetails = await put(`/${petId}/edit`, {
      name,
      height,
      weight,
    });
    handleSnackClick();
  };

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Grid container direction="column">
        <Grid item margin={1} xs={12}>
          <TextField
            required
            value={name}
            label="Name"
            type="string"
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item margin={1} xs={12}>
          <TextField
            required
            value={height}
            label="Height"
            type="string"
            onChange={(e) => setHeight(e.target.value)}
          />
        </Grid>
        <Grid item margin={1} xs={12}>
          <TextField
            required
            value={weight}
            label="Weight"
            type="string"
            onChange={(e) => setWeight(e.target.value)}
          />
        </Grid>
        <Grid item margin={1} xs={12}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
          <Snackbar
            open={openSnack}
            autoHideDuration={3000}
            message="Details changed"
            onClose={handleSnackClose}
            action={action}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default petEditPage;
