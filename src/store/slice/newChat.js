import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    newChat: null,
    title:null
}

const newChatSlice = createSlice({
    name:'newChat',
    initialState,
    reducers:{
        setNewChat: (state,action)=>{
            state.newChat = action.payload;
        },
        setTitle: (state,action)=>{
            state.title = action.payload;
        }
    }
})

export const { setNewChat , setTitle }  = newChatSlice.actions;
export default newChatSlice.reducer;