import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';




const googleAuth = createAsyncThunk('googleAuth',async(access_token,thunkAPI)=>{
    try{
        const userInfo = await axios.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            { headers: { Authorization: `Bearer ${access_token}`} },
        );
        return userInfo.data;
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.response?.data?.error || error.message);
    }
})

export default googleAuth;