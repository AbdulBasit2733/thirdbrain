import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BACKEND_URL from "../../../config";

interface initialStateProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: {
    _id: string;
    username: string;
  } | null;
}

const initialState: initialStateProps = {
  isLoading: false,
  user: null,
  isAuthenticated: false,
};

export const RegisterUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/users/register",
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const LoginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(
    "http://localhost:3000/api/v1/users/login",
    formData,
    {
      withCredentials: true,
    }
  );
  return response.data;
});
export const LogoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(`${BACKEND_URL}/api/v1/users/logout`, {
    withCredentials: true,
  });
  return response.data;
});
export const CheckAuthentication = createAsyncThunk(
  "/auth/check-auth",
  async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/users/check-auth`, {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
    return response.data;
  }
);

const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUser: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.user = null;
      })
      .addCase(RegisterUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success ? true : false;
      })
      .addCase(LoginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(CheckAuthentication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CheckAuthentication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success ? true : false;
      })
      .addCase(CheckAuthentication.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(LogoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LogoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(LogoutUser.rejected, (state) => {
        state.isLoading = false;
        state.user = state.user;
        state.isAuthenticated = true;
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
