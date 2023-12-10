import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPosts as getPostsApi } from "../../services/apiPost";
import { RootState } from "../../store";

interface Comment {
  comment: string;
  image: string;
  by: string;
  commentDate: Date;
}
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  picture: string;
}

export interface PostRes {
  _id: string;
  type: "profile" | "cover" | "post" | "details";
  images: string[];
  content: string;
  user: User;
  comments: Comment[];
  createdAt: string;
  updatedAt: Date;
  key?: string;
}

interface PostsState {
  posts: PostRes[];
  isLoading: boolean;
  error: boolean;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: false,
};

export const getPosts = createAsyncThunk<PostRes[]>(
  "post/getPosts",
  async () => {
    const { data } = await getPostsApi();

    return data.posts;
  },
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<{ post: PostRes }>) {
      state.posts = [action.payload.post, ...state.posts];
      state.isLoading = false;
      state.error = false;
    },
    deletePost(state, action: PayloadAction<PostRes[]>) {
      state.posts = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    loading(state) {
      state.isLoading = true;
    },
    error(state) {
      state.error = true;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
      state.error = false;
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const { deletePost, addPost, loading, error } = postSlice.actions;

export default postSlice.reducer;

export const getAllPosts = (state: RootState) => state.post?.posts;

export const getLoading = (state: RootState) => state.post?.isLoading;

export const getError = (state: RootState) => state.post?.error;
