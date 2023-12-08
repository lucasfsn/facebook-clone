import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProfile as getProfileApi } from "../../services/apiProfile";
import { RootState } from "../../store";
import { PostRes } from "../post/postSlice";

export interface ProfileRes {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  picture: string;
  cover?: string;
  gender: string;
  birdthDay: number;
  birdthMonth: number;
  birdthYear: number;
  friends: string[];
  following: string[];
  followers: string[];
  friendRequests: string[];
  search: string[];
  savedPosts: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
  userPosts: PostRes[];
  images: string[];
}

interface ProfileState {
  profile: ProfileRes;
  isLoading: boolean;
  error: boolean;
}

const initialState: ProfileState = {
  profile: {
    _id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    picture: "",
    gender: "",
    birdthDay: 0,
    birdthMonth: 0,
    birdthYear: 0,
    friends: [],
    following: [],
    followers: [],
    friendRequests: [],
    search: [],
    savedPosts: [],
    createdAt: "",
    updatedAt: "",
    userPosts: [],
    images: [],
  },
  isLoading: false,
  error: false,
};

export const getProfile = createAsyncThunk<ProfileRes, string>(
  "profile/getProfile",
  async (username: string) => {
    const data = await getProfileApi(username);

    return data;
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    error(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
      state.error = false;
    });
    builder.addCase(getProfile.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const { error } = profileSlice.actions;

export default profileSlice.reducer;

export const getUserProfile = (state: RootState) => state.profile?.profile;

export const getProfilePicture = (state: RootState) =>
  state.profile?.profile?.picture;

export const getLoading = (state: RootState) => state.profile?.isLoading;

export const getError = (state: RootState) => state.profile?.error;
