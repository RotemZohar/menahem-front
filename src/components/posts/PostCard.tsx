import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, TextField } from "@mui/material";
import { UPDATE_POST, DELETE_POST } from "../../consts/actions";

function PostCard(props: {
  id: string;
  imgUrl: string;
  title: string;
  text: string;
  tag: string;
  isAdminUser?: boolean;
  isEdit?: boolean;
  parentCallback: any;
}) {
  const { id, tag, imgUrl, text, isAdminUser, title, isEdit, parentCallback } =
    props;
  const [newTitle, setNewTitle] = useState(title);
  const [newText, setNewText] = useState(text);
  const [editState, setEditState] = useState(isEdit);

  const changeEditMode = () => {
    setNewTitle(title);
    setNewText(text);
    setEditState(!editState);
  };

  const deletePost = () => {
    parentCallback(id, DELETE_POST);
  };

  const updateCard = () => {
    const postInfo = {
      _id: id,
      title: newTitle,
      Image: imgUrl,
      text: newText,
      tag,
    };
    parentCallback(postInfo, UPDATE_POST);
    changeEditMode();
  };

  let EditableFields;
  const editRules = () => {
    if (!editState) {
      EditableFields = (
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
      );
    } else {
      EditableFields = (
        <CardContent>
          <TextField
            value={newTitle}
            label="Title"
            type="string"
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <TextField
            multiline
            maxRows={4}
            sx={{ minWidth: 223, mt: 2 }}
            value={newText}
            label="Text"
            type="string"
            onChange={(e) => setNewText(e.target.value)}
          />
          <CardActions sx={{ justifyContent: "center", mt: 1 }}>
            <Button onClick={changeEditMode} variant="contained" size="small">
              Cancel
            </Button>
            <Button onClick={updateCard} variant="contained" size="small">
              Update
            </Button>
          </CardActions>
        </CardContent>
      );
    }
  };

  editRules();

  let Actions;
  const adminRules = () => {
    if (isAdminUser) {
      Actions = (
        <CardActions>
          <Tooltip title="Delete" placement="top">
            <IconButton aria-label="delete" onClick={deletePost}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" placement="top">
            <IconButton aria-label="edit" onClick={changeEditMode}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      );
    }
  };

  adminRules();

  return (
    <Card sx={{ width: 345, marginTop: 5 }}>
      <CardMedia component="img" height="140" image={imgUrl} />
      {EditableFields}
      {Actions}
    </Card>
  );
}

PostCard.defaultProps = {
  isAdminUser: false,
  isEdit: false,
};

export default PostCard;
