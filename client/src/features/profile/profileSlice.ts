import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProfile as getProfileApi } from "../../services/apiProfile";
import { RootState } from "../../store";
import { PostRes } from "../post/postSlice";

type Relationship =
  | "Single"
  | "Married"
  | "Divorced"
  | "In a relationship"
  | "Engaged"
  | "Separated"
  | "Widowed";

export interface Details {
  bio?: string;
  workplace?: string;
  highschool?: string;
  college?: string;
  currentCity?: string;
  hometown?: string;
  relationship?: Relationship;
}

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
  friendRequests: string[];
  sentFriendRequests: string[];
  search: string[];
  details: Details;
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
    friendRequests: [],
    sentFriendRequests: [],
    search: [],
    details: {
      bio: "",
      workplace: "",
      highschool: "",
      college: "",
      currentCity: "",
      hometown: "",
      relationship: undefined,
    },
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
    updateProfile(state, action: PayloadAction<Partial<ProfileRes>>) {
      state.profile = { ...state.profile, ...action.payload };
      state.isLoading = false;
      state.error = false;
    },
    loading(state) {
      state.isLoading = true;
    },
    error(state) {
      state.error = true;
    },
    deleteCover(state) {
      state.profile.cover = "";
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
      state.isLoading = false;
      state.error = false;
    });
    builder.addCase(getProfile.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const { updateProfile, error, loading, deleteCover } =
  profileSlice.actions;

export default profileSlice.reducer;

export const getUserProfile = (state: RootState) => state.profile.profile;

export const getProfilePicture = (state: RootState) =>
  state.profile.profile.picture;

export const getProfileDetails = (state: RootState) =>
  state.profile.profile.details;

export const getLoading = (state: RootState) => state.profile?.isLoading;

export const getError = (state: RootState) => state.profile?.error;
