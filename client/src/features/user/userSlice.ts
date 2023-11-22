import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "../../store";

export interface ExistingUserState {
  user: {
    id: string;
    username: string;
    picture: string;
    firstName: string;
    lastName: string;
  };
  isLoading: boolean;
}

type UserState = ExistingUserState | null;

const initialState: UserState = Cookies.get("user")
  ? { user: JSON.parse(Cookies.get("user") as string), isLoading: false }
  : null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      if (state) {
        state.user = action.payload;
        state.isLoading = false;
      }
    },
    logout() {
      return initialState;
    },
    loading(state, action) {
      if (state) state.isLoading = action.payload;
    },
  },
});

export const { login, logout, loading } = userSlice.actions;

export default userSlice.reducer;

export const getUser = (state: RootState) => state.user?.user;

export const getLoading = (state: RootState) => state.user?.isLoading;
