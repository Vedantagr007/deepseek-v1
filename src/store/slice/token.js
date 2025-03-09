import { createSlice } from '@reduxjs/toolkit'


const initialState = {
   access_token: null,
   expires_in: null,
   error: null,
}

const tokenSlice = createSlice({
    name:'token',
    initialState,
    reducers: {
        storeToken: (state,action)=>{
            state.access_token = action.payload.access_token;
            state.expires_in = action.payload.expires_in;
            localStorage.setItem("access_token", JSON.stringify({access_token: state.access_token, expires_in: Date.now() + (state.expires_in*1000) }));
        },
        removeToken:(state)=>{
            state.access_token = null;
            state.expires_in = null;
        },
        ifErrorToken: (state,action)=>{
            state.error = action.payload;
        }
    },
})

export const {ifErrorToken,storeToken,removeToken} = tokenSlice.actions
export default tokenSlice.reducer;