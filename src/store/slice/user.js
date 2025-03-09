import { createSlice } from '@reduxjs/toolkit'
import googleAuth from '../api/authReducer';


const initialState = {
    data: null,
    error: null,
    status: null,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        resetUser: (state)=>{
            state.data = null;
            state.error = null;
            state.status = null;
        },
        // for customized errors, if you like
        ifErrorUser: (state,action)=>{
            if(!state.user){
                state.error = action.payload;
                return state.error;
            }
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(googleAuth.pending,(state)=>{
                state.status = "pending";
                state.error = null;
            })
            .addCase(googleAuth.fulfilled,(state,action)=>{
                state.data = action.payload;
                state.status = 'succeeded';
            })
            .addCase(googleAuth.rejected,(state,action)=>{
                state.status = "failed";
                state.error = action.payload;
            })
    }
})

export const {ifErrorUser,resetUser} = userSlice.actions
export default userSlice.reducer;