import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./slices/BlogsSlice";

const store = configureStore({
    reducer:{
        blogs:blogSlice
    }
})

export default store