import { Label } from "@mui/icons-material";
import { Button, InputLabel, TextField, Typography } from "@mui/material";
import React, { FormEvent, useState } from "react";
import useFetch from "use-http";
import AddUsers from "../add-users/AddUsers";

function CreateGroupPage() {
  const [name, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [stage, setStage] = useState(0);
  const { post } = useFetch("/group");

  const onSubmit = () => {
    post("/", { name, description, users });
  };

  return (
    <main>
      <Typography variant="h4" marginBottom={2}>
        Create a new group
      </Typography>
      {stage === 0 && (
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <label htmlFor="group">Group name:</label>
            <TextField
              style={{ display: "inline" }}
              id="group"
              variant="standard"
              value={name}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <TextField
            value={description}
            multiline
            minRows={3}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
          />
          <Button
            onClick={() => {
              setStage(1);
            }}
            style={{ width: "50%", alignSelf: "end" }}
          >
            Next
          </Button>
        </div>
      )}
      {stage === 1 && (
        <div style={{ display: "inline-flex", flexDirection: "column" }}>
          <AddUsers
            selectedUsers={users}
            onAddUser={(userId) => {
              setUsers((prevUsers) => {
                if (!prevUsers.includes(userId)) {
                  return [...prevUsers, userId];
                }
                return prevUsers;
              });
            }}
          />
          <div style={{ justifyContent: "space-between", display: "flex" }}>
            <Button
              onClick={() => {
                setStage(0);
              }}
            >
              Back
            </Button>
            <Button onClick={onSubmit}>Create</Button>
          </div>
        </div>
      )}
    </main>
  );
}

export default CreateGroupPage;
