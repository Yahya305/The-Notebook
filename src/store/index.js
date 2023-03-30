import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./slices/BlogsSlice";
import blogProps from "./slices/BlogProps";

const store = configureStore({
    reducer:{
        blogs:blogSlice,
        blogProps:blogProps,
    }
})

export default store