import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import UsersTable from "./UsersTable";
import PostsTab from "./PostsTab";
import EditDetailsPage from "../edit-details/EditDetails";

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

export default function AdminPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Posts" />
          <Tab label="Users" />
          <Tab label="Edit details" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <PostsTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UsersTable />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <EditDetailsPage />
        </TabPanel>
      </Box>
    </Box>
  );
}
