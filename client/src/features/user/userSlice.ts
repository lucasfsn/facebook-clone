import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "../../store";

export interface User {
  id: string;
  username: string;
  picture: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: boolean;
}

interface SettingsChangePayload {
  field: keyof User;
  value: string;
}

const initialState: UserState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user") as string) : null,
  isLoading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoading = false;
    },
    logout() {
      return initialState;
    },
    deleteUser(state) {
      state.user = null;
    },
    loading(state) {
      state.isLoading = true;
    },
    changedPassword(state) {
      state.isLoading = false;
    },
    changedSetting(state, action: PayloadAction<SettingsChangePayload>) {
      if (state.user) {
        state.user[action.payload.field] = action.payload.value;
        state.isLoading = false;
      }
    },
    changedProfilePicture(state, action: PayloadAction<string>) {
      if (state.user) state.user.picture = action.payload;
    },
    error(state) {
      state.error = true;
      state.isLoading = false;
    },
  },
});

export const {
  login,
  logout,
  deleteUser,
  loading,
  changedPassword,
  changedSetting,
  changedProfilePicture,
  error,
} = userSlice.actions;

export default userSlice.reducer;

export const getUser = (state: RootState) => state.user?.user;

export const getUserId = (state: RootState) => state.user?.user?.id;

export const getLoading = (state: RootState) => state.user?.isLoading;
