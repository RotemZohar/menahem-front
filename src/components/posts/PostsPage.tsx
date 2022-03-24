import { Alert, AlertTitle, Box, Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";

import PostCard from "./PostCard";

interface Post {
  _id: string;
  tag: string;
  title: string;
  text: string;
  imgUrl: string;
}

function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingCompleted, setIsLoadingCompleted] = useState<boolean>(false);
  const tag = useSelector((state: RootState) => state.userReducer.hobbyId);
  const navigate = useNavigate();

  useEffect(() => {
    if (tag) {
      fetch(`http://localhost:4000/posts/byTag/${tag}`, {
        method: "GET",
      }).then((res) => {
        res.json().then((data) => setPosts(data));
        setIsLoadingCompleted(true);
      });
    }
  }, [tag]);

  const handleCallback = () => {};

  const navToEditDetails = () => {
    navigate("../editDetails");
  };
  const list = useMemo(() => {
    let content = null;
    if (!tag) {
      content = (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Hobby not found.
        </Alert>
      );
    } else if (isLoadingCompleted && !posts?.length) {
      content = (
        <Alert severity="info">
          <AlertTitle>Error</AlertTitle>
          No posts found for selected hobby.
        </Alert>
      );
    } else {
      content = posts?.map((post) => (
        <PostCard
          parentCallback={handleCallback}
          id={post._id}
          imgUrl={post.imgUrl}
          title={post.title}
          text={post.text}
          tag={post.tag}
        />
      ));
    }
    return content;
  }, [tag, posts]);

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={navToEditDetails}>
          Edit details
        </Button>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "repeat(1, 1fr)",
          p: 1,
          columnGap: 3,
          rowGap: 1,
          justifyContent: "center",
        }}
      >
        <div>{list}</div>
      </Box>
    </Box>
  );
}

export default PostsPage;
