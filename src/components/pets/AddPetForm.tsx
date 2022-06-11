import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  InputAdornment,
  TextField,
  MenuItem,
  Avatar,
  CardHeader,
  Divider,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useNavigate } from "react-router-dom";
import useFetch from "use-http";
import moment from "moment";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useSelector } from "react-redux";
import defaultPetPic from "../../assets/pet-pic.png";
import { routes } from "../../routes";
import { RootState } from "../../redux/store";
import { storage } from "../../firebase";

const speciesList = ["Dog", "Cat", "Rodent", "Bird", "Reptile"];
const dogList = [
  "Labrador",
  "German Shepard",
  "Golden Retriever",
  "French Bulldog",
  "Yorkshire Terrier",
  "Poodle",
  "Siberian Husky",
];
const catList = [
  "Persian Cat",
  "British Shorthair",
  "Siamese Cat",
  "Sphynx Cat",
  "Ragdoll",
  "Turkish Angora",
];
const birdList = [
  "African Grey Parrot",
  "Amazon Parrot",
  "Cockatiel",
  "Cockatoo",
  "Dove",
  "Macaw",
];
const rodentList = [
  "Syrian Hamster",
  "Mongolian Gerbil",
  "Chinchilla",
  "Common Rat",
  "Guinea Pig",
  "Rex Rabbit",
];
const reptileList = [
  "Bearded dragon",
  "Leopard gecko",
  "Snake",
  "Tortoise",
  "Turtle",
  "Water Dragon",
];

const AddPetForm = () => {
  const navigate = useNavigate();
  const { post } = useFetch("/pet");
  const userId = useSelector((state: RootState) => state.userReducer._id);
  const [currentBreedList, setCurrentBreedList] = useState<string[]>(dogList);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [species, setSpecies] = useState(speciesList[0]);
  const [breed, setBreed] = useState(currentBreedList[0]);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [image, setImage] = useState(defaultPetPic);
  const [imageUrl, setImageUrl] = useState<any>();
  const [nameError, setNameError] = useState(false);
  const [weightError, setWeightError] = useState(false);
  const [heightError, setHeightError] = useState(false);
  const [progress, setProgress] = useState(0);

  // const onUploadPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
  const onUploadPicture = (event: any) => {
    if (event.target.files?.length) {
      setImageUrl(event.target.files[0]);
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  useEffect(() => {
    switch (species) {
      case "Dog":
        setCurrentBreedList(dogList);
        break;
      case "Cat":
        setCurrentBreedList(catList);
        break;
      case "Bird":
        setCurrentBreedList(birdList);
        break;
      case "Rodent":
        setCurrentBreedList(rodentList);
        break;
      case "Reptile":
        setCurrentBreedList(reptileList);
        break;
      default:
        break;
    }
  }, [species]);

  const addPet = async () => {
    // Upload image
    const storageRef = ref(storage, `petsImages/${userId}/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageUrl);

    await uploadTask.on(
      "state_changed",
      (snapshot: { bytesTransferred: number; totalBytes: number }) => {
        const progressTemp = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressTemp);
      },
      (error: any) => {
        console.log(error);
      },
      async () => {
        const firebaseUrl = await getDownloadURL(uploadTask.snapshot.ref);
        post("/", {
          name,
          birthDate,
          species,
          breed,
          weight,
          height,
          image: firebaseUrl,
        })
          .then((res) => {
            // TODO: recieve pet id & redirect to pet page
            if (res === "Created") {
              navigate(routes.pets);
            } else {
              alert("Something went wrong :(");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    );
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !name ||
      moment(birthDate).isAfter(new Date()) ||
      !species ||
      !breed ||
      !weight ||
      !height
    ) {
      // TODO: change alert
      alert("Please insert all fields!");
    } else {
      await addPet();
    }
  };

  return (
    <Grid container justifyContent="center">
      <Card sx={{ width: 600, minHeight: 300, m: 3 }}>
        <CardHeader title="Add New Pet" />
        <Divider />
        <Grid item mt={2}>
          <Avatar
            src={image}
            alt="X"
            sx={{ width: 160, height: 160, m: "auto", mb: 2 }}
          />
        </Grid>
        <Box component="form" onSubmit={onSubmit}>
          <Grid container justifyContent="center">
            <Grid item margin={1} xs={5}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setNameError(!name)}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                helperText={nameError ? "Please insert name" : ""}
                error={nameError}
              />
            </Grid>
            <Grid item margin={1} xs={5}>
              <TextField
                label="Birth Date"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(moment().format(e.target.value))}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputProps: { max: moment(new Date()).format("YYYY-MM-DD") },
                }}
              />
            </Grid>
            <Grid item margin={1} xs={5}>
              <TextField
                label="Species"
                select
                fullWidth
                value={species}
                required
                onChange={(e) => setSpecies(e.target.value)}
              >
                {speciesList.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item margin={1} xs={5}>
              <TextField
                label="Breed"
                select
                fullWidth
                value={breed}
                required
                onChange={(e) => setBreed(e.target.value)}
              >
                {currentBreedList.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item margin={1} xs={5}>
              <TextField
                label="Height"
                type="number"
                fullWidth
                required
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                onBlur={() => setHeightError(height <= 0)}
                error={heightError}
                helperText={heightError ? "Height cannot be 0 cm!" : ""}
                InputProps={{
                  inputProps: { min: 0, max: 200 },
                  endAdornment: (
                    <InputAdornment position="end">cm</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item margin={1} xs={5}>
              <TextField
                label="Weight"
                type="number"
                fullWidth
                required
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                onBlur={() => setWeightError(height <= 0)}
                error={weightError}
                helperText={weightError ? "Weight cannot be 0 kg!" : ""}
                InputProps={{
                  inputProps: { min: 0, max: 200 },
                  endAdornment: (
                    <InputAdornment position="end">kg</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item margin={1} xs={5}>
              <Button startIcon={<AddAPhotoIcon />} component="label">
                Upload Picture
                <input type="file" hidden onChange={onUploadPicture} />
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item margin={3}>
              <Button variant="contained" type="submit">
                Add Pet
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Grid>
  );
};

export default AddPetForm;
