import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Tag {
  _id: string;
  userId: string;
  title: string;
}

interface User {
  _id: string;
  username: string;
}

interface Content {
  _id: string;
  title: string;
  link: string;
  type: string;
  tags: Tag[];
  userId: User;
}

interface InitialStateProps {
  isLoading: boolean;
  contents: Content[] | null;
}

const initialState: InitialStateProps = {
  isLoading: false,
  contents: null,
};

export const allContents = createAsyncThunk(
  "/contents/all-contents",
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
export const UserContents = createAsyncThunk(
  "/content/user-contents",
  async (_, { signal }) => {
    const controller = new AbortController();
    signal.addEventListener("abort", () => controller.abort());

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASEURL || "http://localhost:3000"}/api/v1/content/user-contents`,
        {
          withCredentials: true,
          signal: controller.signal, // Pass the AbortController signal
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
export const CreateContent = createAsyncThunk(
  "/content/create-content",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_BASEURL || "http://localhost:3000"}/api/v1/content/create-content`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const editContent = createAsyncThunk(
  "/content/edit-content",
  async (formData) => {
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

export const deleteContent = createAsyncThunk(
  "/content/delete",
  async (contentId) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_BASEURL || "http://localhost:3000"}/api/v1/content/delete`,
      {
        data: {contentId},
        withCredentials: true,
      }
    );
    return response.data;
  }
);

const ContentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(allContents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allContents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contents = action.payload.success
          ? action.payload.contents
          : null;
      })
      .addCase(allContents.rejected, (state) => {
        state.isLoading = false;
        state.contents = null;
      })
      .addCase(UserContents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UserContents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contents = action.payload.success
          ? action.payload.contents
          : null;
      })
      .addCase(UserContents.rejected, (state) => {
        state.isLoading = false;
        state.contents = null;
      })
      .addCase(CreateContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contents = action.payload.success
          ? action.payload.contents
          : null;
      })
      .addCase(CreateContent.rejected, (state) => {
        state.isLoading = false;
        state.contents = null;
      })
      .addCase(editContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editContent.fulfilled, (state, action) => {
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
      .addCase(deleteContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contents = state.contents;
      })
      .addCase(deleteContent.rejected, (state) => {
        state.isLoading = false;
        state.contents = null;
      });
  },
});

export default ContentSlice.reducer;
