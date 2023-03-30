import { createSlice } from "@reduxjs/toolkit";

const blogProps = createSlice({
    name: "blogProps",
    initialState:[],
    reducers:{
        addProps(state,action){
            state.pop();
            state.push(action.payload)
            console.log("PUSHED")
        },
    }
})

export default blogProps.reducer;       
export const {addProps}=blogProps.actions;