import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import usersReducer from "../features/Users/usersSlice";
import { apiSlice } from "../features/Api/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        users: usersReducer
    },
    middleware : getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})