import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ImagesData,
  getImages as getImagesApi,
} from "../../services/apiImages";
import { RootState } from "../../store";

interface ImagesState {
  images: string[];
  isLoading: boolean;
  error: boolean;
}

const initialState: ImagesState = {
  images: [],
  isLoading: false,
  error: false,
};

export const fetchImages = createAsyncThunk<string[], ImagesData>(
  "images/fetchImages",
  async (body: ImagesData) => {
    const data = await getImagesApi(body);

    const images = data.map((image: { url: string }) => image.url);

    return images;
  },
);

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, (state) => {
      if (state) {
        state.isLoading = true;
        state.error = false;
      }
    });
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      if (state) {
        state.images = action.payload;
        state.isLoading = false;
        state.error = false;
      }
    });
    builder.addCase(fetchImages.rejected, (state) => {
      if (state) {
        state.isLoading = false;
        state.error = true;
      }
    });
  },
});

export default imagesSlice.reducer;

export const getImages = (state: RootState) => state.images?.images;

export const getLoading = (state: RootState) => state.images?.isLoading;

export const getError = (state: RootState) => state.images?.error;
