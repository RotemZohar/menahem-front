import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  _id: string;
  title: string;
  text: string;
  tag: string;
  imgUrl: string;
}

interface PostsState {
  [index: number]: Post;
}

const initialState: PostsState = [];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostsState>) => ({
      state: action.payload,
    }),
  },
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;
