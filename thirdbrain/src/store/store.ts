import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice';
import contentReducer from './content-slice';

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
  },
});

// Exporting RootState and AppDispatch to use in components for strong typing
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
