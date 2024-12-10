import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  Content,
  CreateContentData,
  DeleteContentResponse,
  InitialStateProps,
} from "../../types/types";

const initialState: InitialStateProps = {
  isLoading: false,
  contents: [],
  isAuthenticated: false,
  user: null
};

// Fetch all contents
export const allContents = createAsyncThunk(
  "contents/all-contents",
  async (_, { signal }) => {
    const controller = new AbortController();
    signal.addEventListener("abort", () => controller.abort());
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASEURL || "http://localhost:3000"}/api/v1/content/all-contents`,
        {
          withCredentials: true,
          signal: controller.signal,
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled");
      } else {
        throw error;
      }
    }
  }
);

// Fetch user-specific contents
export const userContents = createAsyncThunk(
  "content/user-contents",
  async (_, { signal }) => {
    const controller = new AbortController();
    signal.addEventListener("abort", () => controller.abort());
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASEURL || "http://localhost:3000"}/api/v1/content/user-contents`,
        {
          withCredentials: true,
          signal: controller.signal,
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled");
      } else {
        throw error;
      }
    }
  }
);

// Create a new content
export const createContent = createAsyncThunk(
  "content/create-content",
  async (formData: CreateContentData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_BASEURL || "http://localhost:3000"}/api/v1/content/create-content`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

// Edit an existing content
export const editContent = createAsyncThunk(
  "content/edit-content",
  async (formData: Content) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_BASEURL || "http://localhost:3000"}/api/v1/content/edit`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

// Delete a content
export const deleteContent = createAsyncThunk<
  DeleteContentResponse, // Return type
  string // Argument type
>(
  "content/delete",
  async (contentId) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_BASEURL || "http://localhost:3000"}/api/v1/content/delete`,
      {
        data: { contentId },
        withCredentials: true,
      }
    );
    return response.data;
  }
);

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allContents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allContents.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.contents = action.payload.success
          ? action.payload.contents
          : null;
      })
      .addCase(allContents.rejected, (state) => {
        state.isLoading = false;
        state.contents = null;
      })
      .addCase(userContents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userContents.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.contents = action.payload.success
          ? action.payload.contents
          : null;
      })
      .addCase(userContents.rejected, (state) => {
        state.isLoading = false;
        state.contents = null;
      })
      .addCase(createContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContent.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.contents = action.payload.success
          ? action.payload.contents
          : null;
      })
      .addCase(createContent.rejected, (state) => {
        state.isLoading = false;
        state.contents = null;
      })
      .addCase(editContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editContent.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.contents = action.payload.success
          ? action.payload.contents
          : null;
      })
      .addCase(editContent.rejected, (state) => {
        state.isLoading = false;
        state.contents = null;
      })
      .addCase(deleteContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContent.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.contents =
          state.contents?.filter(
            (content) => content._id !== action.payload.contentId
          ) || null;
      })
      .addCase(deleteContent.rejected, (state) => {
        state.isLoading = false;
        state.contents = null;
      });
  },
});

export default contentSlice.reducer;
