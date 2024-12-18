import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { VITE_BACKEND_URL } from "../../config/config";
import { ContentProps } from "./contentTypes";
import { data } from "react-router-dom";

// Define the type for the initial state
interface ContentState {
  isLoading: boolean;
  contents: ContentProps[];
}

// Define the initial state with correct typing
const initialState: ContentState = {
  isLoading: false,
  contents: [],
};

// Fetch user's contents
export const myContents = createAsyncThunk<
  ContentProps[],
  void,
  { rejectValue: any }
>("contents/my-contents", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${VITE_BACKEND_URL}/api/v1/contents/my-contents`,
      {
        withCredentials: true,
      }
    );
    return response.data.data; // Assuming the data is in `data.data`
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(
      error.response?.data || {
        success: false,
        message: "Something Went Wrong",
      }
    );
  }
});

// Create new content
export const createContent = createAsyncThunk<
  ContentProps[],
  ContentProps,
  { rejectValue: any }
>("contents/create-content", async (contentData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${VITE_BACKEND_URL}/api/v1/contents/create-content`,
      contentData,
      {
        withCredentials: true,
      }
    );
    return response.data.data; // Assuming the data is in `data.data`
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(
      error.response?.data || {
        success: false,
        message: "Something Went Wrong",
      }
    );
  }
});

export const deleteContent = createAsyncThunk(
  "content/deleteContent",
  async (contentId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${VITE_BACKEND_URL}/api/v1/contents/delete-content/${contentId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);

      return response.data;
    } catch (error: any) {
      console.log(error);
      rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Something went wrong",
        }
      );
    }
  }
);

export const createShareLink = createAsyncThunk(
  "brain/shareLink",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${VITE_BACKEND_URL}/api/v1/contents/brain/sharelink/create`,
        { share: true },
        { withCredentials: true }
      );

      // Return the response data
      return response.data;
    } catch (error: any) {
      // Properly return error using rejectWithValue
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Something went wrong.",
        }
      );
    }
  }
);


// Create the content slice
const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle myContents actions
      .addCase(myContents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(myContents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contents = action.payload || []; // Use payload or empty array
      })
      .addCase(myContents.rejected, (state) => {
        state.isLoading = false;
        state.contents = []; // Reset contents on failure
      })

      // Handle createContent actions
      .addCase(createContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContent.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.contents = action.payload || []; // Use payload or empty array
      })
      .addCase(createContent.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Export the reducer
export default contentSlice.reducer;
