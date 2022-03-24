import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  _id: string;
  name: string;
  email: string;
  hobbyId: string;
}

const initialState: UserState = {
  _id: "",
  name: "",
  email: "",
  hobbyId: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setHobbyId: (state, action: PayloadAction<string>) => {
      state.hobbyId = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUser: (state, action: PayloadAction<UserState>) => ({
      _id: action.payload._id,
      name: action.payload.name,
      email: action.payload.email,
      hobbyId: action.payload.hobbyId,
    }),
  },
});

export const { setUserEmail, setHobbyId, setUser, setUserId, setUsername } =
  userSlice.actions;

export default userSlice.reducer;
