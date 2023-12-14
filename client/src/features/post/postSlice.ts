import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPosts as getPostsApi } from "../../services/apiPost";
import { RootState } from "../../store";
import { SingleComment, SinglePost } from "../../types/posts";

interface PostsState {
  posts: SinglePost[];
  isLoading: boolean;
  error: boolean;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: false,
};

export const getPosts = createAsyncThunk<SinglePost[], string>(
  "post/getPosts",
  async (userId: string) => {
    const { data } = await getPostsApi(userId);

    return data.posts;
  },
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<{ post: SinglePost }>) {
      state.posts = [action.payload.post, ...state.posts];
      state.isLoading = false;
      state.error = false;
    },
    deletePost(state, action: PayloadAction<SinglePost[]>) {
      state.posts = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    addComment(state, action: PayloadAction<SingleComment>) {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.comment) {
          return {
            ...post,
            comments: [...post.comments, action.payload],
          };
        }

        return post;
      });
      state.isLoading = false;
    },
    addedReaction(state) {
      state.isLoading = false;
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

export const {
  addedReaction,
  deletePost,
  addPost,
  loading,
  error,
  addComment,
} = postSlice.actions;

export default postSlice.reducer;

export const getAllPosts = (state: RootState) => state.post?.posts;

export const getLoading = (state: RootState) => state.post?.isLoading;

export const getError = (state: RootState) => state.post?.error;
