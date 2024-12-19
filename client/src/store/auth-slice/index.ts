import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthResponse, initialStateProps } from "./authTypes";
import axios from "axios";
import { VITE_BACKEND_URL } from "../../config/config";

const initialState: initialStateProps = {
  isLoading: false,
  isAuthenticated: false,
  username: null,
};

export interface formProps {
  username: string;
  password: string;
}

export const registerUser = createAsyncThunk<AuthResponse, formProps>(
  "/user/register",
  async (userData: formProps, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>(
        `${VITE_BACKEND_URL}/api/v1/users/auth/register`,
        userData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Registration failed",
        }
      );
    }
  }
);
export const loginUser = createAsyncThunk<AuthResponse, formProps>(
  "/user/login",
  async (userData: formProps, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>(
        `${VITE_BACKEND_URL}/api/v1/users/auth/login`,
        userData,
        {
          withCredentials: true,
        }
      );

      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Login failed",
        }
      );
    }
  }
);
export const logoutUser = createAsyncThunk<AuthResponse>(
  "/user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${VITE_BACKEND_URL}/api/v1/users/auth/logout`,
        {
          withCredentials: true,
        }
      );
      return response.data; // Assumes the response conforms to the AuthResponse type
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Login failed",
        }
      );
    }
  }
);

export const checkAuthentication = createAsyncThunk<AuthResponse>(
  "user/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${VITE_BACKEND_URL}/api/v1/users/auth/check-auth`,
        {
          withCredentials: true, // Include credentials (cookies)
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Authentication Failed",
        }
      );
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.username =
          action.payload.success === true
            ? action.payload.username ?? null
            : null;
        state.isAuthenticated = action.payload.success ? true : false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        (state.isAuthenticated = false), (state.username = null);
      })
      .addCase(checkAuthentication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthentication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success === true ? true : false;
        state.username =
          action.payload.success === true
            ? action.payload.username ?? null
            : null;
      })
      .addCase(checkAuthentication.rejected, (state) => {
        state.isLoading = false;
        state.username = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.username = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
