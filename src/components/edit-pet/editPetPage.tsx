import {
  Avatar,
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
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import useFetch from "use-http";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";

const petEditPage = () => {
  const { put, get, response, loading } = useFetch("/pet");
  const { petId } = useParams();
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [snackMessage, setSnackMessage] = useState("");
  const [openSnack, setSnackOpen] = React.useState(false);

  useEffect(() => {
    get(`/${petId}`)
      .then((pet) => {
        setName(pet.name);
        setHeight(pet.height);
        setWeight(pet.weight);
        setImgUrl(pet.imgUrl);
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

  const onUploadPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      // TODO: use rom's image fix
      setImgUrl(URL.createObjectURL(event.target.files[0]));
    }
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
    const editedDetails = await put(`/${petId}`, {
      name,
      height,
      weight,
      imgUrl,
    });

    if (response.data === "Edited") {
      setSnackMessage("Details changed");
      handleSnackClick();
    } else {
      setSnackMessage("Error occurred");
      handleSnackClick();
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Grid container justifyContent="center">
      <Card sx={{ width: 600, minHeight: 300, m: 3 }}>
        <CardHeader title="Edit Pet" />
        <Divider />
        <Grid item mt={2}>
          <Avatar
            src={imgUrl}
            alt="X"
            sx={{ width: 160, height: 160, m: "auto", mb: 2 }}
          />
        </Grid>
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
            <Grid item margin={1}>
              <Button startIcon={<AddAPhotoIcon />} component="label">
                Upload Picture
                <input type="file" hidden onChange={onUploadPicture} />
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item margin={1}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>

            <Snackbar
              open={openSnack}
              autoHideDuration={3000}
              message={snackMessage}
              onClose={handleSnackClose}
              action={action}
            />
          </Grid>
        </Box>
      </Card>
    </Grid>
  );
};

export default petEditPage;
