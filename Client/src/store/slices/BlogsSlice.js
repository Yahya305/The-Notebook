import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: "blogs",
    initialState:[],
    reducers:{
        addBlog(state,action){
            const blogIndex = state.findIndex(blog => blog._id === action.payload._id);
            if (blogIndex === -1) {
                state.push(action.payload)
            }
            // console.log(Array.from(action.payload).forEach((a)=>state.push(a)))

        },
        removeBlog(state,action){
            return state.filter((blogs)=> blogs._id !== action.payload)
            // console.log(arr)
            // console.log(arr[0].title,"Array")
            // console.log("_________________________")
            // arr.forEach((a)=>console.log(a._id))
            // console.log("_________________________")   
        },
        editBlog(state, action) {
            const index = state.findIndex(blog => blog._id === action.payload._id)
            if (index !== -1) {
              state[index] = action.payload
            }
          }
    }
})

export default blogSlice.reducer;       
export const {addBlog,removeBlog,editBlog}=blogSlice.actions;