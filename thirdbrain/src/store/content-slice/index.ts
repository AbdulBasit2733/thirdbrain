import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BACKEND_URL from "../../../config";

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

export const AllContents = createAsyncThunk(
  "/contents/all-content",
  async () => {
    const response = await axios.get(
      `${BACKEND_URL}/api/v1/content/all-content`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);
export const UserContents = createAsyncThunk(
  "/content/user-content",
  async () => {
    const response = await axios.get(
      `${BACKEND_URL}/api/v1/content/user-content`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);
export const CreateContent = createAsyncThunk('/content/create-content', async(formData) =>{
    const response = await axios.post(`${BACKEND_URL}/api/v1/content/create-content`, formData, {
        withCredentials:true
    })
    return response.data;
} )

export const editContent = createAsyncThunk('/content/edit-content', async (formData) => {
    const response  =await axios.put(`${BACKEND_URL}/api/v1/content/edit`, formData, {
        withCredentials:true
    })
    return response.data
})

const deleteContent = createAsyncThunk('/content/delete', async (contentId) => {
    const response = await axios.delete(`${BACKEND_URL}/api/v1/content/delete`, {
        data:contentId
    });
    return response.data
})

const ContentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(AllContents.pending, (state) => {
        state.isLoading  = true;

    }).addCase(AllContents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contents = action.payload.success ? action.payload.contents : null;
    }).addCase(AllContents.rejected, (state) => {
        state.isLoading = false;
        state.contents = null;
    }).addCase(UserContents.pending, (state) => {
        state.isLoading  = true;

    }).addCase(UserContents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contents = action.payload.success ? action.payload.contents : null;
    }).addCase(UserContents.rejected, (state) => {
        state.isLoading = false;
        state.contents = null;
    }).addCase(CreateContent.pending, (state) => {
        state.isLoading  = true;

    }).addCase(CreateContent.fulfilled, (state, action) => {
        state.isLoading = false
        state.contents = action.payload.success ? action.payload.contents : null;
    }).addCase(CreateContent.rejected, (state ) => {
        state.isLoading = false;
        state.contents = null;
    }).addCase(editContent.pending, (state) => {
        state.isLoading  = true;

    }).addCase(editContent.fulfilled, (state, action) => {
        state.isLoading = false
        state.contents = action.payload.success ? action.payload.contents : null;
    }).addCase(editContent.rejected, (state ) => {
        state.isLoading = false;
        state.contents = null;
    }).addCase(deleteContent.pending, (state) => {
        state.isLoading  = true;

    }).addCase(deleteContent.fulfilled, (state, action) => {
        state.isLoading = false
        state.contents = state.contents;
    }).addCase(deleteContent.rejected, (state ) => {
        state.isLoading = false;
        state.contents = null;
    })
  },
});

export default ContentSlice.reducer;
