import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface Post {
  content: string;
  images?: string[];
  user: unknown;
}

interface ExistingPostState {
  post: Post;
  isLoading: boolean;
  error: boolean;
}

type PostState = ExistingPostState;

const initialState: PostState = {
  post: {
    content: "",
    images: [],
    user: null,
  },
  isLoading: false,
  error: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<Post>) {
      if (state) {
        state.post = action.payload;
        state.isLoading = false;
        state.error = false;
      }
    },
    loading(state, action: PayloadAction<boolean>) {
      if (state) state.isLoading = action.payload;
    },
    error(state, action: PayloadAction<boolean>) {
      if (state) {
        state.error = action.payload;
        state.isLoading = false;
      }
    },
  },
});

export const { addPost, loading, error } = postSlice.actions;

export default postSlice.reducer;

export const getPosts = (state: RootState) => state.user?.user;

export const getLoading = (state: RootState) => state.post?.isLoading;

export const getError = (state: RootState) => state.post?.error;
