import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "../../store";

interface User {
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
}

type UserState = ExistingUserState | null;

interface SettingsChangePayload {
  field: keyof User;
  value: string;
}

const initialState: UserState = Cookies.get("user")
  ? { user: JSON.parse(Cookies.get("user") as string), isLoading: false }
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
    loading(state, action: PayloadAction<boolean>) {
      if (state) state.isLoading = action.payload;
    },
    passwordChanged(state) {
      if (state) state.isLoading = false;
    },
    settingsChanged(state, action: PayloadAction<SettingsChangePayload>) {
      if (state) {
        state.user[action.payload.field] = action.payload.value;
        state.isLoading = false;
      }
    },
  },
});

export const { login, logout, loading, passwordChanged, settingsChanged } =
  userSlice.actions;

export default userSlice.reducer;

export const getUser = (state: RootState) => state.user?.user;

export const getLoading = (state: RootState) => state.user?.isLoading;
