import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import imagesSlice from "./features/image/imagesSlice";
import postReducer from "./features/post/postSlice";
import profileSlice from "./features/profile/profileSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    profile: profileSlice,
    images: imagesSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
