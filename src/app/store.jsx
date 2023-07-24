import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postSclice";
import usersReducer from "../features/Users/usersSlice";

export const store = configureStore({
    reducer: {
        posts : postsReducer,
        users: usersReducer
    }
})