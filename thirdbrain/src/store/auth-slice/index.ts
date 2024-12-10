import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { InitialStateProps, User, AuthResponse, LoginUserArgs, RegisterUserArgs } from "../../types/types"; // Adjust the path as needed

const initialState: InitialStateProps = {
  isLoading: false,
  user: null,
  contents:[],
  isAuthenticated: false,
};

// Register User
export const RegisterUser = createAsyncThunk(
  "/auth/register",
  async (formData: RegisterUserArgs) => {
    const response = await axios.post<AuthResponse>(
      `${import.meta.env.VITE_BACKEND_BASEURL || "http://localhost:3000"}/api/v1/users/register`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

// Login User
export const LoginUser = createAsyncThunk(
  "/auth/login",
  async (formData: LoginUserArgs) => {
    console.log(formData);
    
    const response = await axios.post<AuthResponse>(
      `${import.meta.env.VITE_BACKEND_BASEURL || "http://localhost:3000"}/api/v1/users/login`,
      formData,
      {
        withCredentials: true,
      }
    );
    console.log(response);
    
    return response.data;
  }
);

// Logout User
export const LogoutUser = createAsyncThunk<AuthResponse>(
  "/auth/logout",
  async () => {
    const response = await axios.post<AuthResponse>(
      `${import.meta.env.VITE_BACKEND_BASEURL || "http://localhost:3000"}/api/v1/users/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

// Check Authentication
export const CheckAuthentication = createAsyncThunk(
  "/auth/check-auth",
  async () => {
    const response = await axios.get<AuthResponse>(
      `${import.meta.env.VITE_BACKEND_BASEURL || "http://localhost:3000"}/api/v1/users/check-auth`,
      {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RegisterUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(RegisterUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(LoginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(CheckAuthentication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CheckAuthentication.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = action.payload.success;
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
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
