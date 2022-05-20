import { Button, TextField, Typography } from "@mui/material";
import React, { FormEvent, useState } from "react";

function CreateGroupPage() {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    // TODO: save group
  };

  return (
    <>
      <Typography variant="h3" marginBottom={2}>
        Create a new group
      </Typography>
      <form
        style={{
          display: "inline-flex",
          flexDirection: "column",
          gap: 10,
        }}
        onSubmit={onSubmit}
      >
        <TextField
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          label="Group name"
        />
        <TextField
          value={description}
          multiline
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
        />
        <Button type="submit">Create</Button>
      </form>
    </>
  );
}

export default CreateGroupPage;
