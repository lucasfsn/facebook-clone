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

interface ExistingUserState {
  user: User;
  isLoading: boolean;
  error: boolean;
}

type UserState = ExistingUserState | null;

interface SettingsChangePayload {
  field: keyof User;
  value: string;
}

const initialState: UserState = Cookies.get("user")
  ? {
      user: JSON.parse(Cookies.get("user") as string),
      isLoading: false,
      error: false,
    }
  : null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      if (state) {
        state.user = action.payload;
        state.isLoading = false;
      }
    },
    logout() {
      return initialState;
    },
    deleteUser() {
      return initialState;
    },
    loading(state) {
      if (state) state.isLoading = true;
    },
    changedPassword(state) {
      if (state) state.isLoading = false;
    },
    changedSetting(state, action: PayloadAction<SettingsChangePayload>) {
      if (state) {
        state.user[action.payload.field] = action.payload.value;
        state.isLoading = false;
      }
    },
    error(state) {
      if (state) {
        state.error = true;
        state.isLoading = false;
      }
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
  error,
} = userSlice.actions;

export default userSlice.reducer;

export const getUser = (state: RootState) => state.user?.user;

export const getUserId = (state: RootState) => state.user?.user.id;

export const getLoading = (state: RootState) => state.user?.isLoading;
