import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export interface UserState {
  user: {
    id: string;
    username: string;
    picture: string;
    firstName: string;
    lastName: string;
  };
  isLoading: boolean;
}

const initialState: UserState | null = Cookies.get("user")
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
