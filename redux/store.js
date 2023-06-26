import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from './slices/navbarSlice'
import cartReducer from './slices/cartSlice'
import userReducer from './slices/userSlice'

export const store=configureStore({
    reducer:{
        navbarReducer:navbarReducer,
        cartReducer:cartReducer,
        userReducer:userReducer
    }
})