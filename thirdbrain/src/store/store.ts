import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice/index'
import contentReducer from './content-slice/index';
const store = configureStore({
    reducer:{
        auth:authReducer,
        content:contentReducer
    }
})

export default store;