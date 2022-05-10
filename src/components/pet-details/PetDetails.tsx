import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { Box, Tab, Tabs, Typography, Container } from "@mui/material";
import { PetDetails as petDetails } from "../../types/pet";
import PetTasks from "./PetTasks";
import PetCarers from "./PetCarers";
import PetGallery from "./PetGallery";

function TabPanel(props: { index: number; value: number; children: any }) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function getAge(birthdate: Date) {
    const today = new Date();
    birthdate = new Date(birthdate);
    let age = today.getFullYear() - birthdate.getFullYear();
    const m = today.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
        age -= 1;
    }
    return age;
}

const PetDetails = () => {
    const [value, setValue] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [details, setDetails] = useState<petDetails>({
        name: "",
        medical: {
            treatment: "",
            date: new Date(),
        },
        members: [
            {
                _id: "",
                isAdmin: false,
            },
        ],
        tasks: [
            {
                _id: "",
                title: "",
                description: "",
                dateFrom: new Date(),
                dateTo: new Date(),
                isCompleted: false,
            },
        ],
        birthdate: new Date(),
        breed: "",
        height: "",
        weight: "",
        imgUrl: "",
    });

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        fetch(`http://localhost:4000/pets/menahem`)
            .then((res) => res.json())
            .then((data) => {
                setDetails(data);
                setLoaded(true);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (!loaded)
        return (
            <div>
                <h1> Loading... </h1>
            </div>
        );

    return (
        <Container>
            <Box padding={3} sx={{ border: 2, borderBottom: 1 }} mt={4} mx={20}>
                <Box display="flex">
                    <Avatar
                        src={details.imgUrl}
                        sx={{ width: 160, height: 160, border: 2 }}
                    />
                    <Box mx={3} mt={3}>
                        <Typography variant="h2" align="left">
                            {details.name}
                        </Typography>
                        <Typography variant="h5" align="left">
                            {details.breed}, {getAge(details.birthdate)}
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" mt={1}>
                    <Typography variant="h6" align="left" ml={3}>
                        height: {details.height}cm
                    </Typography>
                    <Typography variant="h6" align="left" ml={5}>
                        weight: {details.weight}kg
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ border: 2, borderTop: 0 }} mx={20}>
                <Box sx={{ borderBottom: 1 }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="fullWidth"
                    >
                        <Tab label="Tasks" sx={{ borderRight: 1 }} />
                        <Tab label="Carers" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <PetTasks tasks={details.tasks} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <PetCarers carers={details.members} />
                </TabPanel>
            </Box>
        </Container>
    );
};

export default PetDetails;
