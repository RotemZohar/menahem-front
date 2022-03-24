import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";

interface Hobby {
  name: string;
  _id: string;
}

const NewPostForm = (props: {
  handleModalClose: any;
  handleSnackbarOpen: any;
  handleCallback: any;
}) => {
  const { handleModalClose, handleSnackbarOpen, handleCallback } = props;
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [text, setText] = useState("");
  const [imgUrl, setimageUrl] = useState("");

  const defaultImageUrl =
    "https://cdn.vox-cdn.com/thumbor/oDHhWJpBBC6t6_qtnPy5yyd2xBM=/0x0:1920x1080/1200x800/filters:focal(807x387:1113x693)/cdn.vox-cdn.com/uploads/chorus_image/image/56140119/Fallout4_NukaWorld_E3_02_1465776998.0.0.jpg";

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
    const image = imgUrl || defaultImageUrl;

    fetch("http://localhost:4000/posts/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        tag,
        text,
        imgUrl: image,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        handleModalClose();
        handleSnackbarOpen();

        const newPost = {
          _id: data.insertedId,
          title,
          tag,
          text,
          imgUrl: image,
        };

        handleCallback(newPost);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setTag(event.target.value);
  };

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Typography gutterBottom variant="h5" component="div">
        Add a new post
      </Typography>
      <Grid container direction="column">
        <Grid item margin={1}>
          <TextField
            required
            label="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item margin={1}>
          <FormControl sx={{ minWidth: 223 }}>
            <InputLabel>Hobby</InputLabel>
            <Select value={tag} onChange={handleChange} required>
              {list}
            </Select>
          </FormControl>
        </Grid>
        <Grid item margin={1}>
          <TextField
            required
            multiline
            maxRows={4}
            sx={{ minWidth: 223 }}
            label="Description"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Grid>
        <Grid item margin={1}>
          <TextField
            label="Image"
            type="text"
            value={imgUrl}
            onChange={(e) => setimageUrl(e.target.value)}
          />
        </Grid>
        <Grid item margin={1}>
          <Button
            variant="contained"
            type="submit"
            sx={{ justifyContent: "center" }}
          >
            Add post
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewPostForm;
