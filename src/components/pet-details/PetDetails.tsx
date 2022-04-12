import React from "react";
import Avatar from "@mui/material/Avatar";
import { Box, Tab, Tabs, Typography } from "@mui/material";

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

const PetDetails = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const defaultImageUrl =
    "https://cdn.vox-cdn.com/thumbor/oDHhWJpBBC6t6_qtnPy5yyd2xBM=/0x0:1920x1080/1200x800/filters:focal(807x387:1113x693)/cdn.vox-cdn.com/uploads/chorus_image/image/56140119/Fallout4_NukaWorld_E3_02_1465776998.0.0.jpg";

  return (
    <Box>
      <Box padding={3} sx={{ border: 2, borderBottom: 1 }} mt={4} mx={20}>
        <Box display="flex">
          <Avatar
            alt="Test"
            src={defaultImageUrl}
            sx={{ width: 160, height: 160, border: 2 }}
          />
          <Box ml={3} mt={3}>
            <Typography variant="h2" align="left">
              Gil
            </Typography>
            <Typography variant="h5" align="left">
              Lavrador, 5
            </Typography>
          </Box>
        </Box>
        <Box display="flex" mt={1}>
          <Typography variant="h6" align="left" ml={3}>
            height: 70cm
          </Typography>
          <Typography variant="h6" align="left" ml={5}>
            weight: 29kg
          </Typography>
        </Box>
      </Box>
      <Box sx={{ border: 2, borderTop: 0 }} mx={20}>
        <Box sx={{ borderBottom: 1 }}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label="Hobbies" sx={{ borderRight: 1 }} />
            <Tab label="Carers" sx={{ borderRight: 1 }} />
            <Tab label="Gallery" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Hobbies
        </TabPanel>
        <TabPanel value={value} index={1}>
          Carers
        </TabPanel>
        <TabPanel value={value} index={2}>
          Gallery
        </TabPanel>
      </Box>
    </Box>
  );
};

export default PetDetails;
